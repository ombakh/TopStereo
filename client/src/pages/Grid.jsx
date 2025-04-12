import React, { useState } from 'react';
import './Grid.css';

const Grid = () => {
    const gridSize = 5; //5x5 grid
    const totalCells = gridSize * gridSize;
    const [gridData, setGridData] = useState(Array(totalCells).fill(null));

    return (
        <div className="grid">
            {gridData.map((album, i) => (
                <div key={i} className="grid-cell">
                    {album ? (
                        <img src={album} alt="album cover" />
                    ) : (
                        <span className="placeholder">+</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Grid;