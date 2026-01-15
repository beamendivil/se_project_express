import { useContext } from "react";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import "./Main.css";

function Main({ weatherData, clothingItems, onCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Get the weather type from the weatherData
  const currentWeatherType = weatherData?.weatherType || "warm";

  // Filter items based on weather type with defensive checks
  const filteredItems = (clothingItems || []).filter((item) => {
    if (!item || !item.weather) return false;
    // Case-insensitive comparison to handle "Hot" vs "hot"
    return item.weather.toLowerCase() === currentWeatherType.toLowerCase();
  });

  // Get temperature in the current unit using context
  const currentTemp =
    weatherData?.temperature?.[currentTemperatureUnit] ??
    (currentTemperatureUnit === "F" ? 75 : 24);

  return (
    <main className="main">
      <div className="main__inner">
        <WeatherCard weatherData={weatherData} />
        <section className="main__items">
          <p className="main__clothing-text">
            Today is {currentTemp}°{currentTemperatureUnit} / You may want to
            wear:
          </p>
          <ul className="main__items-list">
            {filteredItems.map((item) => (
              <li key={item._id} className="main__item">
                <ItemCard item={item} onCardClick={onCardClick} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default Main;
