import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Profile from "./Profile";
import Footer from "./Footer";
import AddItemModal from "./AddItemModal/AddItemModal";
import ItemModal from "./ItemModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

import { getForecastWeather, parseWeatherData } from "../utils/weatherApi";
import { getItems, addItem, deleteItem } from "../utils/api";

import "../App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch weather data and clothing items on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        // Fetch clothing items from the server
        const items = await getItems();
        setClothingItems(items);
      } catch (error) {
        console.error("Error loading clothing items:", error);
        setClothingItems([]);
      }

      try {
        // Try to fetch weather data
        const data = await getForecastWeather();
        const weather = parseWeatherData(data);
        setWeatherData(weather);
      } catch (error) {
        console.error("Error loading weather data:", error);
        // Set fallback weather data
        setWeatherData({
          city: "New York",
          temperature: { F: 68, C: 20 },
          condition: "Partly Cloudy",
          weatherType: "warm",
        });
      }
      setIsLoading(false);
    };

    loadInitialData();
  }, []);

  const handleOpenAddClothesModal = () => {
    setActiveModal("add-clothes");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setSelectedItem(null);
    setItemToDelete(null);
  };

  const handleAddItem = async (newItem, resetForm) => {
    try {
      // Add the new item to the server
      const createdItem = await addItem(newItem);

      // Add the new item to the beginning of clothing items array
      setClothingItems((prevItems) => [createdItem, ...prevItems]);

      // Reset the form after successful submission
      resetForm();

      // Close the modal
      handleCloseModal();
    } catch (error) {
      console.error("Error adding item:", error);
      // You could add error handling UI here if needed
    }
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setActiveModal("item-details");
  };

  const openConfirmationModal = (item) => {
    setItemToDelete(item);
    setActiveModal("delete-confirmation");
  };

  const handleCardDelete = async (item) => {
    try {
      const itemId = item._id;

      // Delete the item from the server by its Mongo-style _id
      await deleteItem(itemId);

      // Optimistically remove the item from local state
      setClothingItems((prevItems) =>
        prevItems.filter((clothingItem) => clothingItem._id !== itemId)
      );

      // Close all modals and reset state
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting item:", error);
      // You could add error handling UI here if needed
    }
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    if (activeModal) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [activeModal]);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Router>
          <Header
            onAddClothesClick={handleOpenAddClothesModal}
            weatherData={weatherData}
          />

          <Routes>
            <Route
              path="/"
              element={
                isLoading ? (
                  <div>Loading...</div>
                ) : (
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                  />
                )
              }
            />
            <Route
              path="/profile"
              element={
                isLoading ? (
                  <div>Loading...</div>
                ) : (
                  <Profile
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    onAddClothesClick={handleOpenAddClothesModal}
                    onDeleteItem={openConfirmationModal}
                  />
                )
              }
            />
          </Routes>

          <Footer />

          <AddItemModal
            isOpen={activeModal === "add-clothes"}
            onAddItem={handleAddItem}
            onCloseModal={handleCloseModal}
          />

          <ItemModal
            isOpen={activeModal === "item-details"}
            onClose={handleCloseModal}
            card={selectedItem}
            onDeleteItem={openConfirmationModal}
          />

          <DeleteConfirmationModal
            isOpen={activeModal === "delete-confirmation"}
            onClose={handleCloseModal}
            onConfirmDelete={handleCardDelete}
            itemToDelete={itemToDelete}
          />
        </Router>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
