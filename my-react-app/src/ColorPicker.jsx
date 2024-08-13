import React, { useState } from 'react';
import tinycolor from 'tinycolor2';

function ColorPicker() {
    const [color, setColor] = useState("#FFFFFF");
    const [favorites, setFavorites] = useState([]);
    const [colorScheme, setColorScheme] = useState({});

    function handleColorChange(event) {
        const newColor = event.target.value;
        if (color !== newColor) {
            setColor(newColor);
            generateColorScheme(newColor);
        }
    }

    function addFavoriteColor() {
        if (!favorites.includes(color)) {
            setFavorites([...favorites, color]);
        }
    }

    function removeFavoriteColor(colorToRemove) {
        setFavorites(favorites.filter(fav => fav !== colorToRemove));
    }

    function generateColorScheme(baseColor) {
        const tc = tinycolor(baseColor);
        setColorScheme({
            complementary: tc.complement().toHexString(),
            analogous: tc.analogous().map(t => t.toHexString()),
            triadic: tc.triad().map(t => t.toHexString()),
            tetradic: tc.tetrad().map(t => t.toHexString())
        });
    }

    return (
        <div className="color-picker-container">
            <div className="color-picker-main">
                <h1>Color Picker</h1>
                <div className="color-display" style={{ backgroundColor: color }}>
                    <p>Selected Color: {color}</p>
                </div>
                <label>Select a Color:</label>
                <input type="color" value={color} onChange={handleColorChange} />
                <button onClick={addFavoriteColor}>Add to Favorites</button>

                <h2>Color Harmonies</h2>
                <div className="color-schemes">
                    <h3 className="color-title">Complementary</h3>
                    <div className="color-swatch" style={{ backgroundColor: colorScheme.complementary }}>
                        {colorScheme.complementary}
                    </div>
                    <h3 className="color-title">Analogous</h3>
                    <div className="color-row">
                        {colorScheme.analogous && colorScheme.analogous.map((color, index) => (
                            <div key={index} className="color-swatch" style={{ backgroundColor: color }}>
                                {color}
                            </div>
                        ))}
                    </div>
                    <h3 className="color-title">Triadic</h3>
                    <div className="color-row">
                        {colorScheme.triadic && colorScheme.triadic.map((color, index) => (
                            <div key={index} className="color-swatch" style={{ backgroundColor: color }}>
                                {color}
                            </div>
                        ))}
                    </div>
                    <h3 className="color-title">Tetradic</h3>
                    <div className="color-row">
                        {colorScheme.tetradic && colorScheme.tetradic.map((color, index) => (
                            <div key={index} className="color-swatch" style={{ backgroundColor: color }}>
                                {color}
                            </div>
                        ))}
                    </div>
                </div>

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

            <div className="color-history-container">
                <h2>Color History</h2>
                <div className="color-history-box" style={{ backgroundColor: color }}>
                    <p>{color}</p>
                </div>
            </div>
        </div>
    );
}

export default ColorPicker;
