import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm";
import useForm from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const { values, errors, isValid, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "warm", // Default weather type
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Only submit if form is valid
    if (!isValid) {
      return;
    }

    // Create new item object
    const newItem = {
      name: values.name.trim(),
      imageUrl: values.imageUrl.trim(),
      weather: values.weather,
    };

    // Call the onAddItem handler with the new item and reset function
    onAddItem(newItem, resetForm);
  };

  // Reset form when modal closes (but not on successful submission)
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      title="New garment"
      name="add-garment"
      buttonText="Add garment"
      isFormValid={isValid}
    >
      <label className="modal__label">
        Name*
        <input
          type="text"
          className={`modal__input ${
            errors.name ? "modal__input_type_error" : ""
          }`}
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
          minLength="2"
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>

      <label className="modal__label">
        Image*
        <input
          type="url"
          className={`modal__input ${
            errors.imageUrl ? "modal__input_type_error" : ""
          }`}
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
        {errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="hot"
            className="modal__radio-input"
            checked={values.weather === "hot"}
            onChange={handleChange}
            required
          />
          Hot
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="warm"
            className="modal__radio-input"
            checked={values.weather === "warm"}
            onChange={handleChange}
            required
          />
          Warm
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="cold"
            className="modal__radio-input"
            checked={values.weather === "cold"}
            onChange={handleChange}
            required
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
