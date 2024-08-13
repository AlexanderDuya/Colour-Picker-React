import React, { useState } from 'react';

function ColorPicker() {
    const [color, setColor] = useState("#FFFFFF");
    const [favorites, setFavorites] = useState([]);
    const [history, setHistory] = useState([]); // State to track color history

    function handleColorChange(event) {
        const newColor = event.target.value;
        setHistory([color, ...history]); // Add the current color to the history before changing it
        setColor(newColor);
    }

    function addFavoriteColor() {
        if (!favorites.includes(color)) {
            setFavorites([...favorites, color]);
        }
    }

    function removeFavoriteColor(colorToRemove) {
        setFavorites(favorites.filter(fav => fav !== colorToRemove));
    }

    function undoLastChange() {
        if (history.length > 0) {
            const [lastColor, ...restHistory] = history;
            setColor(lastColor);
            setHistory(restHistory); // Update history by removing the reverted color
        }
    }

    return (
        <div className="color-picker-container">
            <h1>Color Picker</h1>
            <div className="color-display" style={{ backgroundColor: color }}>
                <p>Selected Color: {color}</p>
            </div>
            <label>Select a Color:</label>
            <input type="color" value={color} onChange={handleColorChange} />

            <button onClick={addFavoriteColor}>Add to Favorites</button>
            <button onClick={undoLastChange} disabled={history.length === 0}>Undo</button> {/* Undo button */}

            <h2>Color History</h2>
            <ul>
                {history.map((histColor, index) => (
                    <li key={index} style={{ backgroundColor: histColor, padding: "10px", margin: "5px", color: "#fff" }}>
                        {histColor}
                    </li>
                ))}
            </ul>

            <h2>Favorite Colors</h2>
            <ul>
                {favorites.map((favColor, index) => (
                    <li key={index} style={{ backgroundColor: favColor, padding: "10px", margin: "5px", color: "#fff" }}>
                        {favColor} 
                        <button onClick={() => removeFavoriteColor(favColor)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ColorPicker;
