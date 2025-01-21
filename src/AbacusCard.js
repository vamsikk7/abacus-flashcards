import React from "react";
import "./AbacusCard.css";

function AbacusCard({ number }) {
  const getAbacusRepresentation = (num) => {
    const beads = Array(10).fill(0).map((_, i) => Math.floor(num / Math.pow(10, i)) % 10);
    return beads.reverse(); // Reverse to match the visual representation
  };

  const abacus = getAbacusRepresentation(number);

  return (
    <div className="abacus-card">
      <div className="number-display">{number}</div>
      <div className="abacus">
        {abacus.map((beadCount, index) => (
          <div key={index} className="rod">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className={`bead ${i < beadCount ? "active" : ""}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AbacusCard;
