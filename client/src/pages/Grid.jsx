import React, { useState } from 'react';
import './Grid.css';
import topStereoLogo from "./topstereo.png";
import plusLogo from "./plus.png";

const Grid = () => {
    const gridSize = 5; //5x5 grid
    const totalCells = gridSize * gridSize;
    const [gridData, setGridData] = useState(Array(totalCells).fill(null));
    const [searchResults] = useState([
        "https://via.placeholder.com/100?text=Album+1",
        "https://via.placeholder.com/100?text=Album+2",
        "https://via.placeholder.com/100?text=Album+3",
        "https://via.placeholder.com/100?text=Album+4",
        "https://via.placeholder.com/100?text=Album+5",
        "https://via.placeholder.com/100?text=Album+6",
        "https://via.placeholder.com/100?text=Album+7",
        "https://via.placeholder.com/100?text=Album+8",
        "https://via.placeholder.com/100?text=Album+9",
        "https://via.placeholder.com/100?text=Album+10",
        "https://via.placeholder.com/100?text=Album+11",
        "https://via.placeholder.com/100?text=Album+12"
    ]);

    const handleDragStart = (e, album) => {
        e.dataTransfer.setData("albumUrl", album);
    };

    const handleDrop = (e, index) => {
        const albumUrl = e.dataTransfer.getData("albumUrl");
        const newGrid = [...gridData];
        newGrid[index] = albumUrl;
        setGridData(newGrid);
    };
    const clearData = () => {
        setGridData(Array(totalCells).fill(null));
    }

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

            <div className="search-box">
                <input placeholder="Enter Album Title..." style={{
                    marginTop: '10px',
                    transform: 'translateX(50%)',
                }}/>

                <div style={{
                    marginTop: '20px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    justifyContent: 'center'
                }}>
                    {searchResults.map((album, index) => (
                        <img className="result-cell"
                             key={index}
                             src={album}
                             alt={`album ${index + 1}`}
                             draggable
                             onDragStart={(e) => handleDragStart(e, album)}
                        />
                    ))}
                </div>
            </div>
            <div className="grid"
                 style={{
                     position: 'absolute',
                     left: '50%',
                     transform: 'translateX(-50%)',
                     top: '150px'
                 }}>

                {gridData.map((album, i) => (
                    <div
                        key={i}
                        className="grid-cell"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, i)}
                    >
                        {album ? (
                            <img src={album} alt="album cover"/>
                        ) : (
                            <span className="placeholder">
                                <img src={plusLogo} alt="plus.png" style={{width: '50px', height: '50px'}}/>
                            </span>
                        )}
                    </div>
                ))}
            </div>
            <div className="clear">
                <button onClick={clearData}>CLEAR</button>
            </div>
        </div>
    );
};

export default Grid;