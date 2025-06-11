import { useState } from "react";
import { EggSelection } from "../components/EggSelection";

type PetType = { type: string } | null;

function Pet() {
  const [pet, setPet] = useState<PetType>(null);

  function handleEggSelect(eggId: string) {
    setPet({ type: eggId });
  }

  if (!pet) {
    return <EggSelection onSelect={handleEggSelect} />;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>Your Pet</h1>
      <p>
        You selected the <strong>{pet.type}</strong> egg!
      </p>
      <img
        src={`/eggs/${pet.type}.png`}
        alt="Your egg"
        style={{ width: 150 }}
      />
    </div>
  );
}

export default Pet;
