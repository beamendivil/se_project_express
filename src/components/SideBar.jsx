import "./SideBar.css";
import avatarImage from "../assets/avatar.png";

function SideBar() {
  const userName = "Terrence Tegegne";

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img
          src={avatarImage}
          alt={userName}
          className="sidebar__user-avatar"
        />
        <p className="sidebar__user-name">{userName}</p>
      </div>
    </div>
  );
}

export default SideBar;
