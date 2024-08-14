import React, { useState } from 'react';
import tinycolor from 'tinycolor2';
import axios from 'axios';
import './index.css';

// Replace with the actual API URL and key
const API_URL = 'https://api.color-converter.com/convert'; 
const API_KEY = 'your-api-key'; 

const convertColor = async (color, fromFormat, toFormat) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                color,
                from: fromFormat,
                to: toFormat,
                apiKey: API_KEY,
            },
        });
        console.log('API response:', response.data); // Debugging line
        return response.data.convertedColor; // Adjust according to the API response
    } catch (error) {
        console.error('Error converting color:', error);
        throw error;
    }
};

function ColorPicker() {
    const [color, setColor] = useState("#FFFFFF");
    const [favorites, setFavorites] = useState([]);
    const [colorHistory, setColorHistory] = useState([]);
    const [colorScheme, setColorScheme] = useState({});
    const [convertedColor, setConvertedColor] = useState(null);

    function handleColorChange(event) {
        const newColor = event.target.value;
        if (color !== newColor) {
            setColor(newColor);
            setColorHistory([newColor, ...colorHistory]); // Add new color to the history
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

    async function handleConvertColor(fromFormat, toFormat) {
        try {
            const result = await convertColor(color, fromFormat, toFormat);
            setConvertedColor(result);
        } catch (error) {
            console.error('Conversion failed:', error);
            setConvertedColor('Conversion failed'); // Update UI to indicate failure
        }
    }

    function exportPalette(format) {
        let exportData = {};
        switch (format) {
            case 'json':
                exportData = JSON.stringify({
                    color,
                    favorites,
                    colorHistory,
                    colorScheme
                }, null, 2);
                downloadFile(exportData, 'palette.json', 'application/json');
                break;
            case 'css':
                const cssVariables = `
                    :root {
                        --selected-color: ${color};
                        --complementary-color: ${colorScheme.complementary};
                        --analogous-colors: ${colorScheme.analogous.join(', ')};
                        --triadic-colors: ${colorScheme.triadic.join(', ')};
                        --tetradic-colors: ${colorScheme.tetradic.join(', ')};
                    }
                `;
                downloadFile(cssVariables, 'palette.css', 'text/css');
                break;
            default:
                break;
        }
    }

    function downloadFile(data, filename, type) {
        const blob = new Blob([data], { type });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }

    return (
        <div className="color-picker-container">
            <div className="color-picker-main">
                <h1>Colour Selector</h1>
                <div className="color-display" style={{ backgroundColor: color }}>
                    <p>Selected Colour: {color}</p>
                </div>
                <label>Select a Colour:</label>
                <input type="color" value={color} onChange={handleColorChange} />
                <button onClick={addFavoriteColor}>Add to Favorites</button>

                <h2>Colour Harmonies</h2>
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

                <h2>Favorite Colours</h2>
                <ul className="favorites-list">
                    {favorites.map((favColor, index) => (
                        <li key={index} className="favorite-color-item" style={{ backgroundColor: favColor }}>
                            {favColor}
                            <button onClick={() => removeFavoriteColor(favColor)}>Remove</button>
                        </li>
                    ))}
                </ul>

                {/* Export section */}
                <div className="export-section">
                    <h2>Export Your Palette</h2>
                    <p className="export-instructions">Select the format in which you want to export your colours:</p>
                    <div className="export-buttons">
                        <button onClick={() => exportPalette('json')}>Export as JSON</button>
                        <button onClick={() => exportPalette('css')}>Export as CSS</button>
                    </div>
                </div>

                {/* Color Conversion Section */}
                <div className="color-conversion-section">
                    <h2>Convert Color</h2>
                    <button onClick={() => handleConvertColor('hex', 'rgb')}>Convert HEX to RGB</button>
                    <button onClick={() => handleConvertColor('rgb', 'hex')}>Convert RGB to HEX</button>
                    {convertedColor && <p>Converted Color: {convertedColor}</p>}
                </div>
            </div>

            <div className="color-history-container">
                <h2>Colour History</h2>
                <div className="color-history-list">
                    {colorHistory.map((historyColor, index) => (
                        <div key={index} className="color-history-box" style={{ backgroundColor: historyColor }}>
                            <p>{historyColor}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ColorPicker;
