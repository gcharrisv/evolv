import "../EggSelection.css";

interface EggSelectionProps {
  onSelect: (eggId: string) => void;
}

const base = import.meta.env.BASE_URL;

const eggs = [
  { id: "green", image: `${base}assets/green_egg.png`, label: "Green Egg" },
  { id: "red", image: `${base}assets/red_egg.png`, label: "Red Egg" },
  { id: "blue", image: `${base}assets/blue_egg.png`, label: "Blue Egg" },
];

export function EggSelection({ onSelect }: EggSelectionProps) {
  return (
    <div className="egg-selection">
      <h2>Choose your first companion</h2>
      <div className="egg-grid">
        {eggs.map((egg, index) => (
          <div
            key={egg.id}
            className="egg-card fade-in"
            style={{ animationDelay: `${index * 0.3}s` }}
            onClick={() => onSelect(egg.id)}
          >
            <img src={egg.image} alt={egg.label} className="egg-img" />
            <p>{egg.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
