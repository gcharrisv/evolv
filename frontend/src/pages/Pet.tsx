import { useEffect, useState } from "react";
import { EggSelection } from "../components/EggSelection";
import { useAuth } from "../auth/AuthContext";
import { loadPetData, savePetData } from "../services/api"; // ← updated
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
    const [xp, setXp] = useState(0);
    const [showSelectionText, setShowSelectionText] = useState(true);
    const [habits, setHabits] = useState<Habit[]>([
        { name: "Drink Water", xp: 10, id: 1, completed: false }
    ]);
    const [showForm, setShowForm] = useState(false);
    const [formName, setFormName] = useState("");
    const [formXp, setFormXp] = useState(10);
    const [isEvolving, setIsEvolving] = useState(false);
    const [celebrating, setCelebrating] = useState(false);

    // Load pet and xp from backend
    useEffect(() => {
        async function load() {
            if (!token) return;
            try {
                const { pet, xp } = await loadPetData(token);
                if (pet && pet.type) {
                    setPet(pet);
                    setXp(xp);
                    setShowSelectionText(false); // ← don't show animation for returning users
                } else {
                    setPet(null);
                }
            } catch (err) {
                console.error("Failed to load pet data:", err);
            }
        }
        load();
    }, [token]);


    // Handle stage evolution
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
                    savePetData(evolvedPet, overflow, token); // save new state
                }

                if (evolvedPet.stage === 3) {
                    setCelebrating(true);
                    setTimeout(() => setCelebrating(false), 2000);
                }
            }, 1500);
        }
    }, [xp, pet, token]);

    async function handleEggSelect(eggId: string) {
        const selectedPet = { type: eggId, stage: 0 };
        setPet(selectedPet);
        setXp(0);
        setShowSelectionText(true);

        setTimeout(() => {
            setShowSelectionText(false);
        }, 2000);

        try {
            if (token) {
                await savePetData(selectedPet, 0, token);
            }
        } catch (err) {
            console.error("Failed to save selected pet:", err);
        }
    }


    // Handle task completion
    function handleToggleComplete(id: number) {
        setHabits((prev) =>
            prev.map((h) =>
                h.id === id ? { ...h, completed: true } : h
            )
        );
        const earnedXp = habits.find((h) => h.id === id)?.xp || 0;
        const newXp = xp + earnedXp;
        setXp(newXp);
        if (token && pet) {
            savePetData(pet, newXp, token);
        }
    }

    // Add new habit
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

    // If no pet selected, show egg selection
    if (!pet) return <EggSelection onSelect={handleEggSelect} />;

    let petImage = `${base}assets/${pet.type}_egg.png`;
    if (pet.stage > 0) {
        const stageName = pet.stage === 1 ? "first" : "second";
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

