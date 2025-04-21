import React, { useState, useEffect, useRef } from 'react';
import './Grid.css';
import topStereoLogo from "./topstereo.png";
import html2canvas from "html2canvas";
 // roll back version
const Grid = () => {
    const gridSize = 5; //5x5 grid
    const totalCells = gridSize * gridSize;
    const [gridData, setGridData] = useState(Array(totalCells).fill(null));
    const [searchResults, setSearchResults] = useState([]);
    const [searchText, setSearchText] = useState("");
    const gridRef = useRef(null); // for html2canvas

    useEffect(() => {
        if (searchText.trim() !== "") {
            handleSearch(searchText);
        } else {
            setSearchResults([]);
        }
    }, [searchText]);

    //handles api content
    const handleSearch = async (query) => {
        try {
            const response = await fetch('http://localhost:3001/api/search?q=' + encodeURIComponent(query));
            const data = await response.json();
            const albumImages = data.map(album => album.image[2]['#text']).filter(url => url); // filter empty URLs
            setSearchResults(albumImages);
        } catch (err) {
            console.error("Search failed", err);
        }
        if (searchText === "") {
        }
    };

    const handleDragStart = (e, album) => {
        e.dataTransfer.setData("albumUrl", album);
    };

    const handleDrop = (e, index) => {
        const albumUrl = e.dataTransfer.getData("albumUrl");
        const newGrid = [...gridData];
        newGrid[index] = albumUrl;
        setGridData(newGrid);
    };

    const handleAlbumClick = (albumUrl) => {
        const firstEmptyIndex = gridData.findIndex(cell => cell === null);
        if (firstEmptyIndex !== -1) {
            const newGrid = [...gridData];
            newGrid[firstEmptyIndex] = albumUrl;
            setGridData(newGrid);
        }
    };
    const handleHover = () => {
        // on hover over album in grid, i want a small x to appear in the corner of the album.
        // when clicked. it should remove the album from the grid
    }

    const clearData = () => {
        setGridData(Array(totalCells).fill(null));
    }

    const saveGridAsPNG = () => {
        if (!gridRef.current) return;

        const images = gridRef.current.querySelectorAll('img');
        const loadPromises = Array.from(images).map(img =>
            new Promise(resolve => {
                if (img.complete) resolve();
                else img.onload = img.onerror = resolve;
            })
        );

        Promise.all(loadPromises).then(() => {
            html2canvas(gridRef.current, {
                useCORS: true,
                allowTaint: false
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = 'topstereo-grid.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        });
    };

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
                <input
                    placeholder="Search for music..."
                    style={{
                        marginTop: '10px',
                        transform: 'translateX(50%)',
                    }}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />

                <div className="result-field">
                    {searchResults.map((album, index) => (
                        <img className="result-cell"
                             key={index}
                             src={album}
                             alt={`album ${index + 1}`}
                             draggable
                             onDragStart={(e) => handleDragStart(e, album)}
                             onClick={() => handleAlbumClick(album)}
                        />
                    ))}
                </div>
            </div>
            <div className="grid-background">
            </div>

            <div className="grid"
                 ref={gridRef}
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
                            <img src={album} alt="Album" />
                        ) : null}
                    </div>
                ))}
            </div>

            <div className="clear">
                <button onClick={clearData}>CLEAR</button>
                <button onClick={saveGridAsPNG}>SAVE AS PNG</button>
            </div>
            <p className={"disclaimer"}>
            All album covers are copyright of their respective artists/labels and are used for
                identification/reference purposes only.
            </p>
        </div>

    );
};

export default Grid;