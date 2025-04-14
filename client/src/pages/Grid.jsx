import React, { useState } from 'react';
import './Grid.css';
import topStereoLogo from "./topstereo.png";
import plusLogo from "./plus.png";

const Grid = () => {
    const gridSize = 5; //5x5 grid
    const totalCells = gridSize * gridSize;
    const [gridData] = useState(Array(totalCells).fill(null));

    return (
        <div>
            <img
                src={topStereoLogo}
                alt="TopStereo Logo"
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '40px',
                    width: '200px',
                    zIndex: 1000
                }}
                />

        <div className="searchBox" style={{
            position: 'absolute',
            top: "250px",
            left: "75px",
            border: '3px solid black',
            backgroundColor: "lightpink",
            height: '500px',
            width: "300px",
            boxSizing: 'border-box'
        }}>
            <input placeholder="Enter Album Title..." style={{
                marginTop: '10px',
                transform: 'translateX(50%)',
            }}/>

        </div>
        <div className="grid"
             style={{
                 position: 'absolute',
                 left: '50%',
                 transform: 'translateX(-50%)',
                 top: '150px'
             }}>

            {gridData.map((album, i) => (
                <div key={i} className="grid-cell">

                    {album ? (
                        <img src={album} alt="album cover"/>
                    ) : (
                        <span className="placeholder"><img src={plusLogo} alt="plus.png"
                                                           style={{width: '50px', height: '50px'}}/>
                        </span>
                    )}
                </div>
            ))}
        </div>
        </div>
    );
};

export default Grid;