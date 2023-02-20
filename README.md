Map App
This is a React Native app that allows users to search for locations on a map and save them to a list. It uses the MapQuest Geocoding API to convert the user's search query into latitude and longitude coordinates, and displays the location on a map using the react-native-maps library.

Installation
To run this app on your local machine, you'll need to have Node.js and npm installed. Once you have those, you can follow these steps:

Clone this repository to your local machine.
Navigate to the project directory in your terminal.
Run npm install to install the project's dependencies.
Obtain an API key from the MapQuest Developer Portal.
Create a .env file in the project's root directory and add your API key to it in the following format: MAPQUEST_API_KEY=<your-api-key>.
Run npm start to start the app in development mode.
Note that this app has only been tested on iOS devices.

Usage
When the app starts, you'll see a map centered on your current location (assuming you've granted the app permission to access your location). You can search for a location by entering an address or place name in the search bar at the bottom of the screen and tapping the "Search" button. If the search is successful, a marker will appear on the map indicating the location.

To save a location to your list of saved locations, tap the "Save" button. To view your list of saved locations, tap the "List" button. From the list screen, you can view the details of a saved location or delete a location from the list.

Contributing
Contributions to this project are welcome! If you find a bug or have a feature request, please open an issue on this repository. If you'd like to contribute code, please fork the repository and create a pull request with your changes.

License
This project is licensed under the MIT License
