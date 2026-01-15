import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "./Profile.css";

function Profile({ clothingItems, onCardClick, onAddClothesClick, onDeleteItem }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onAddClothesClick={onAddClothesClick}
          onDeleteItem={onDeleteItem}
        />
      </section>
    </div>
  );
}

export default Profile;
