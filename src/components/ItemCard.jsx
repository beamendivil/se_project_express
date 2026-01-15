import "./ItemCard.css";

function ItemCard({ item, onCardClick, onDeleteItem, showControls }) {
  const handleClick = () => {
    if (onCardClick) {
      onCardClick(item);
    }
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    if (onDeleteItem) {
      onDeleteItem(item);
    }
  };

  // Add defensive checks to prevent null/undefined errors
  if (!item) {
    return null;
  }

  return (
    <div className="item-card" onClick={handleClick}>
      <img
        src={item.imageUrl || item.link || ""}
        alt={item.name || "Clothing item"}
        className="item-card-image"
      />
      {showControls && (
        <>
          <div className="item-card__weather-badge">
            {item.weather || "Unknown"}
          </div>
          <button
            className="item-card__delete-button"
            onClick={handleDeleteClick}
            type="button"
            aria-label={`Delete ${item.name || "item"}`}
          >
            Delete
          </button>
        </>
      )}
      <div className="item-card-label">
        <span className="item-card-name">{item.name || "Unknown item"}</span>
      </div>
    </div>
  );
}

export default ItemCard;
