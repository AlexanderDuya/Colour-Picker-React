REACT + VITE 

Color Picker Application

This project is a simple and interactive Color Picker built with React. The application allows users to select colors, view harmonious color schemes, save favorite colors, and export their color palettes in JSON or CSS format. The app also maintains a history of selected colors, offering an organized and user-friendly experience.

Features

Color Selection: Users can select any color using an HTML color input.
Color Harmonies: Automatically generates complementary, analogous, triadic, and tetradic color schemes based on the selected color.
Favorites Management: Users can save their favorite colors for easy access and remove them as needed.
Color History: Keeps track of all the colors the user has selected during the session.
Export Palette: Users can export their current color palette in JSON or CSS format.

Getting Started
Prerequisites
To run this application on your local machine, you need to have the following installed:

Node.js (v12.x or later)
npm (comes with Node.js)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/color-picker.git
Navigate to the project directory:

bash
Copy code
cd color-picker
Install the dependencies:

bash
Copy code
npm install
Running the Application
After installing the dependencies, you can run the application on your local development server.

Start the development server:

bash
Copy code
npm run dev
View the application:

Open your web browser and navigate to http://localhost:3000. You should see the Color Picker application running.

Project Structure
src/: Contains the source code for the application.

components/: Holds reusable React components (if any).

App.js: The main component that renders the entire application.

index.js: The entry point for React to render the app.

index.css: Contains global styles for the app.

ColorPicker.js: The main logic and UI of the color picker.

public/: Contains static files like index.html.

package.json: Lists dependencies and scripts for the application.

Key Components

Color Picker: The main component where users can select colors, view color schemes, and manage favorites.

Color Harmonies: Automatically generated color schemes (complementary, analogous, triadic, tetradic) displayed to the user.

Favorites: A list where users can store and manage their favorite colors.

Color History: Displays all the colors the user has selected during their session.

Export Palette: Allows users to export their selected colors in JSON or CSS format.

Customization

CSS: You can modify the index.css file to change the look and feel of the application.

Logic: You can enhance or modify the color harmony logic in ColorPicker.js using the tinycolor2 library.

Dependencies

React: A JavaScript library for building user interfaces.

tinycolor2: A small color manipulation and conversion library for generating color schemes.

Exporting Palette

The application allows users to export their color palette in two formats:

JSON: Contains the selected color, favorite colors, color history, and generated color schemes.
CSS: Provides CSS variables for the selected color and generated color schemes.
Contributing
If you find any bugs or have suggestions for improvements, feel free to submit an issue or create a pull request. Contributions are welcome!

License
This project is licensed under the MIT License. See the LICENSE file for more details.

Acknowledgments
React
tinycolor2
Enjoy using the Color Picker Application! 🎨
