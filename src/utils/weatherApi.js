import { apiKey, latitude, longitude } from "./constants";
import { checkResponse } from "./api";

// Function to get user's current location
const getCurrentLocation = () => new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        // Fallback to New York if geolocation fails
        resolve({
          latitude,
          longitude,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });

export const getForecastWeather = async () => {
  try {
    const location = await getCurrentLocation();
    const weatherPromise = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=${apiKey}`
    ).then(checkResponse);

    return weatherPromise;
  } catch (error) {
    // Fallback to New York coordinates if location fails
    const weatherPromise = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
    ).then(checkResponse);

    return weatherPromise;
  }
};

export const getWeatherCondition = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } if (temperature >= 66) {
    return "warm";
  } 
    return "cold";
  
};

export const parseWeatherData = (data) => {
  const { main } = data;
  const temperature = main && main.temp;
  const city = data.name;
  const condition = data.weather[0]?.main || "Clear";

  const weather = {
    temperature: {
      F: Math.round(temperature),
      C: Math.round(((temperature - 32) * 5) / 9),
    },
    city,
    condition,
    weatherType: getWeatherCondition(temperature),
  };
  return weather;
};
