import { useContext } from "react";
import "./WeatherCard.css";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

// Import weather assets
import dayFog from "../assets/day/fog.png";
import dayRainy from "../assets/day/rainy.png";
import daySnow from "../assets/day/snow.png";
import dayStorm from "../assets/day/storm.png";
import dayCloudy from "../assets/day/cloudy.png";
import dayClear from "../assets/day/clear.png";

import nightFog from "../assets/night/fog.png";
import nightRain from "../assets/night/rain.png";
import nightSnow from "../assets/night/snow.png";
import nightStorm from "../assets/night/storm.png";
import nightCloudy from "../assets/night/cloudy.png";
import nightClear from "../assets/night/clear.png";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Access the weather data using the context value
  const temperature =
    weatherData?.temperature?.[currentTemperatureUnit] ??
    (currentTemperatureUnit === "F" ? 75 : 24);
  const condition = weatherData?.condition || "Clear";

  // Determine if it's day or night (simplified - you can enhance this with sunrise/sunset data)
  const currentHour = new Date().getHours();
  const isDay = currentHour >= 6 && currentHour < 20; // 6 AM to 8 PM is considered day

  // Map weather conditions to image files
  const getWeatherImage = () => {
    const conditionLower = condition.toLowerCase();

    if (isDay) {
      if (conditionLower.includes("rain") || conditionLower.includes("drizzle"))
        return dayRainy;
      if (conditionLower.includes("snow")) return daySnow;
      if (
        conditionLower.includes("thunder") ||
        conditionLower.includes("storm")
      )
        return dayStorm;
      if (conditionLower.includes("fog") || conditionLower.includes("mist"))
        return dayFog;
      if (
        conditionLower.includes("cloud") ||
        conditionLower.includes("overcast")
      )
        return dayCloudy;
      return dayClear; // Default for clear/sunny
    }

    if (conditionLower.includes("rain") || conditionLower.includes("drizzle"))
      return nightRain;
    if (conditionLower.includes("snow")) return nightSnow;
    if (
      conditionLower.includes("thunder") ||
      conditionLower.includes("storm")
    )
      return nightStorm;
    if (conditionLower.includes("fog") || conditionLower.includes("mist"))
      return nightFog;
    if (
      conditionLower.includes("cloud") ||
      conditionLower.includes("overcast")
    )
      return nightCloudy;
    return nightClear; // Default for clear night
  };

  const weatherImage = getWeatherImage();
  const timeOfDay = isDay ? "day" : "night";

  return (
    <div
      className={`weather-card weather-card_type_${timeOfDay}`}
      style={{ backgroundImage: `url(${weatherImage})` }}
    >
      <div className="weather-card__content">
        <div className="weather-temperature font-bold">
          {temperature}°{currentTemperatureUnit}
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
