🌦️The Weather App🌦️
A modern React-based weather application with interactive maps, live forecasts, and geolocation support.

🌟Features
- 📍Detects your current location using browser geolocation
- 🌎Interactive map (Leaflet): click anywhere to get weather by coordinates
-🔍 Search with autocomplete powered by Geoapify
-⛅ 3-day weather forecast from WeatherAPI
-🔄 Switch between °C and °F
-⭐ Save favorite cities
-🎨 Loading spinners & skeletons for smooth UX
-❌ Graceful error handling for failed requests

🧰 Tech Stack
- Frontend: React, Vite
-State & Hooks: React hooks + custom hooks (useWeather, useAutocomplete)
-Maps: React Leaflet, OpenStreetMap tiles
-APIs:
  -WeatherAPI(forecast data)
  -Geoapify(autocomplete, reverse geocoding)
  -OpenStreetMap(map tiles)
  -Styling: CSS 

👈Getting started
1. clone the repo:
    git clone https://github.com/saanavalkama/The-Weather-App.git
    cd The-Weather-App

2. install dependencies:
    npm install

3. set up environmental variables
    - create .env file in the project root with keys like this: VITE_APP_API_KEY_WEATHER=your_weatherapi_key

4. run the app locally
    npm run dev

Author:
- Built by Saana Valkama

Licence
- MIT Licence - feel free to use and modify for learning or projects

