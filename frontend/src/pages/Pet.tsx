import { useEffect, useState } from "react";
import { EggSelection } from "../components/EggSelection";
import { useAuth } from "../auth/AuthContext";
import { getSelectedPet, saveSelectedPet } from "../services/api";
import "../Pet.css";

const base = import.meta.env.BASE_URL;

type PetType = { type: string; stage: number } | null;
type Habit = { name: string; xp: number; id: number; completed: boolean };

const xpThresholds: { [key: number]: number } = {
    0: 100,
    1: 200,
    2: 300,
};

function getMaxXp(stage: number): number {
    return xpThresholds[stage] || Infinity;
}

function Pet() {
    const { token } = useAuth();
    const [pet, setPet] = useState<PetType>(null);
    const [showSelectionText, setShowSelectionText] = useState(true);
    const [habits, setHabits] = useState<Habit[]>([
        {
            name: "Drink Water",
            xp: 10,
            id: 1,
            completed: false,
        },
    ]);
    const [xp, setXp] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [formName, setFormName] = useState("");
    const [formXp, setFormXp] = useState(10);
    const [isEvolving, setIsEvolving] = useState(false);
    const [celebrating, setCelebrating] = useState(false);

    useEffect(() => {
        async function loadPet() {
            try {
                if (!token) return;
                const savedPet = await getSelectedPet(token);
                if (savedPet) setPet(savedPet);
            } catch (err) {
                console.error("Failed to load saved pet:", err);
            }
        }
        loadPet();
    }, [token]);

    useEffect(() => {
        if (pet) {
            const timer = setTimeout(() => setShowSelectionText(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [pet]);

    useEffect(() => {
        if (pet && xp >= getMaxXp(pet.stage) && pet.stage < 3 && !isEvolving) {
            const overflow = xp - getMaxXp(pet.stage);
            setIsEvolving(true);
            setTimeout(() => {
                const evolvedPet = { ...pet, stage: pet.stage + 1 };
                setPet(evolvedPet);
                setXp(overflow);
                setIsEvolving(false);
                if (token) {
                    saveSelectedPet(evolvedPet, token);
                }

                if (pet.stage + 1 === 3) {
                    setCelebrating(true);
                    setTimeout(() => setCelebrating(false), 2000);
                }
            }, 1500);
        }
    }, [xp, pet, token]);

    async function handleEggSelect(eggId: string) {
        const selectedPet = { type: eggId, stage: 0 };
        setPet(selectedPet);
        try {
            if (token) {
                await saveSelectedPet(selectedPet, token);
            }
        } catch (err) {
            console.error("Failed to save pet:", err);
        }
    }

    function handleToggleComplete(id: number) {
        setHabits((prev) =>
            prev.map((h) =>
                h.id === id ? { ...h, completed: true } : h
            )
        );
        const earnedXp = habits.find((h) => h.id === id)?.xp || 0;
        setXp((prev) => prev + earnedXp);
    }

    function handleAddHabit() {
        if (formName && formXp > 0) {
            setHabits((prev) => [
                ...prev,
                {
                    name: formName,
                    xp: formXp,
                    id: Date.now(),
                    completed: false,
                },
            ]);
            setFormName("");
            setFormXp(10);
            setShowForm(false);
        }
    }

    if (!pet) return <EggSelection onSelect={handleEggSelect} />;

    let petImage = `${base}assets/${pet.type}_egg.png`;
    if (pet.stage > 0) {
        const stageName = pet.stage === 1 ? "first" : pet.stage === 2 ? "second" : "second";
        petImage = `${base}assets/${pet.type}_${stageName}_evolve.png`;
    }

    return (
        <div className="pet-page">
            <div className="pet-tasks">
                <h2 onClick={() => setShowForm(!showForm)}>Add Good Habit</h2>

                {showForm && (
                    <div className="habit-form">
                        <input
                            type="text"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="Habit name"
                        />
                        <input
                            type="number"
                            value={formXp}
                            onChange={(e) => setFormXp(Number(e.target.value))}
                            placeholder="XP"
                        />
                        <button onClick={handleAddHabit}>Add</button>
                    </div>
                )}

                <ul>
                    {habits.map((habit) => (
                        <li
                            key={habit.id}
                            className={habit.completed ? "habit-completed" : ""}
                            onClick={() => !habit.completed && handleToggleComplete(habit.id)}
                        >
                            {habit.name} <span>{habit.xp} XP</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="pet-display">
                <h1>Your Pet</h1>
                {showSelectionText ? (
                    <p className="fade-out-text">
                        You selected the <strong>{pet.type}</strong> egg!
                    </p>
                ) : (
                    <div className="xp-bar-wrapper">
                        <div className="xp-bar">
                            <div
                                className="xp-bar-fill"
                                style={{
                                    width: `${(xp / getMaxXp(pet.stage)) * 100}%`,
                                }}
                            ></div>
                        </div>
                        <p className="xp-text">
                            XP: {xp} / {getMaxXp(pet.stage) === Infinity ? "∞" : getMaxXp(pet.stage)}
                        </p>
                    </div>
                )}
                <img
                    className={`pet-img ${isEvolving ? "evolving" : ""}`}
                    src={petImage}
                    alt="Your pet"
                />
                {celebrating && <div className="confetti">Yippee Yippee 🎉</div>}
            </div>
        </div>
    );
}

export default Pet;

