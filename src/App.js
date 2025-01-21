import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

// Function to simulate an abacus counting system
function abacusFillArray(limit) {
    const abacusArray = [];

    function getAbacusState(number) {
        const abacus = [];

        let current = number;
        let column = 0;

        while (current > 0) {
            const lowerBeads = current % 5; // Beads below the horizontal bar
            const upperBeads = Math.floor((current % 10) / 5); // Beads above the horizontal bar

            abacus[column] = {
                lower: lowerBeads,
                upper: upperBeads
            };

            current = Math.floor(current / 10); // Move to the next place value
            column++;
        }

        while (abacus.length < Math.ceil(Math.log10(limit))) {
            abacus.push({ lower: 0, upper: 0 });
        }

        return abacus.reverse();
    }

    for (let i = 0; i <= limit; i++) {
        abacusArray.push(getAbacusState(i));
    }

    return abacusArray;
}

// Component to render a single abacus column
const AbacusColumn = ({ column }) => (
    <div className="abacus-column">
        <div className={`upper-beads ${column.upper > 0 ? 'filled' : ''}`}></div>
        <div className="lower-segment">
            {[...Array(5)].map((_, index) => (
                <div
                    key={index}
                    className={`lower-bead ${index < column.lower ? 'filled' : ''}`}
                ></div>
            ))}
        </div>
    </div>
);

// Component to render an abacus state
const AbacusState = ({ number, state }) => (
    <div className="abacus-card">
        <h3>Number: {number}</h3>
        <div className="abacus-body">
            {state.map((column, index) => (
                <AbacusColumn key={index} column={column} />
            ))}
        </div>
    </div>
);

// Main App component
const App = () => {
    const limit = 100;
    const [randomAbacusStates, setRandomAbacusStates] = useState(generateRandomStates(limit, 15));

    function generateRandomStates(limit, count) {
        const randomNumbers = Array.from({ length: count }, () => Math.floor(Math.random() * (limit + 1)));
        return randomNumbers.map(number => ({
            number,
            state: abacusFillArray(limit)[number]
        }));
    }

    const refreshStates = () => {
        setRandomAbacusStates(generateRandomStates(limit, 15));
    };

    return (
        <div>
            <button onClick={refreshStates} className="refresh-button">Refresh</button>
            <div className="abacus-container">
                {randomAbacusStates.map(({ number, state }, index) => (
                    <AbacusState key={index} number={number} state={state} />
                ))}
            </div>
        </div>
    );
};

export default App;
