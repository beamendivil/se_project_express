# WTWR (What to Wear?)

## About the project

The idea of the application is pretty simple - we make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user.

## Technologies Used

- **React 18.3.1** - Frontend library for building user interfaces
- **Vite 7.1.9** - Build tool and development server
- **OpenWeatherMap API** - Weather data provider
- **CSS3** - Styling with CSS Grid and Flexbox
- **JavaScript ES6+** - Modern JavaScript features
- **Geolocation API** - User location detection
- **Cabinet Grotesk** - Custom typography

## Features

- **Real-time Weather Data** - Fetches current weather based on user location
- **Location-based Recommendations** - Shows appropriate clothing for current weather
- **Interactive UI** - Add new clothing items through modal forms
- **Responsive Design** - Works on desktop and mobile devices
- **Weather Filtering** - Displays clothing items based on weather conditions (hot, warm, cold)
- **Like Functionality** - Heart icons on clothing cards
- **User Avatar** - Displays user profile with custom avatar
- **Geolocation Fallback** - Defaults to New York if location access denied

## Installation

1. Clone the repository:

```bash
git clone https://github.com/beamendivil/se_project_react.git
```

2. Navigate to the project directory:

```bash
cd se_project_react
```

3. Install dependencies:

```bash
npm install
```

4. Start the backend API (Express + MongoDB) on port 3001:

```bash
npm run start
# or with hot reload
npm run dev
```

5. In a separate terminal, start the frontend (Vite). It will pick a free port (commonly 5173+):

```bash
npm run dev:client
```

6. Open the Local URL printed by Vite (for example, `http://localhost:5173/` or `http://localhost:5175/`). The frontend is configured to call the backend at `http://localhost:3001` by default. If you need a custom API URL, set `VITE_API_URL` in your environment before running Vite.

## Available Scripts

- `npm run start` - Start backend API on port 3001
- `npm run dev` - Start backend API on port 3001 with hot reload (nodemon)
- `npm run dev:client` - Start Vite frontend with hot reload
- `npm run dev:server` - Alias for backend hot reload
- `npm run build` - Build frontend for production
- `npm run lint` - Run ESLint code quality checks
- `npm run lint:basic` - Basic ESLint run
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages

## Project Structure

```
src/
├── components/              # React components
│   ├── App.jsx             # Main application component
│   ├── Header.jsx          # Header with navigation and user info
│   ├── Main.jsx            # Main content area
│   ├── Profile.jsx         # Profile and wardrobe view
│   ├── WeatherCard.jsx     # Weather display component
│   ├── ItemCard.jsx        # Individual clothing item cards
│   ├── ClothesSection.jsx  # Clothing list for profile
│   ├── ModalWithForm.jsx   # Reusable base modal
│   ├── ItemModal.jsx       # Modal for viewing item details
│   ├── DeleteConfirmationModal.jsx # Confirmation dialog
│   └── Footer.jsx          # Footer component
├── contexts/               # React context definitions
│   └── CurrentTemperatureUnitContext.js
├── hooks/                  # Custom React hooks
│   └── useForm.js
├── utils/                  # Utility and API modules
│   ├── api.js              # Clothing items API client
│   ├── weatherApi.js       # Weather API integration
│   └── constants.js        # API keys and configuration
├── assets/                 # Images and static files
└── vendor/                 # Third-party CSS (normalize.css)
```

## API Configuration

The app uses the OpenWeatherMap API. The API key is stored in `src/utils/constants.js`:

```javascript
const APIkey = "your-api-key-here";
const latitude = 40.7128; // Default NYC coordinates
const longitude = -74.006;
```

## Weather Conditions

The app categorizes weather into three types:

- **Hot** - 86°F and above
- **Warm** - 66°F to 85°F
- **Cold** - Below 66°F

## Deployment

The application is deployed on GitHub Pages. To deploy:

```bash
npm run deploy
```

## Links

- [Live Demo](https://youtu.be/_2kesm-Sifw?si=qFTBzOhWWJ_4JOXf)
- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)

## Author

**Bea Mendivil**

- GitHub: [@beamendivil](https://github.com/beamendivil)
