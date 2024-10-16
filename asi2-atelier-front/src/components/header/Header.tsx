import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../model/userModel";

interface HeaderProps {
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="header">
      <div className="left-side">
        <FontAwesomeIcon
          icon={faHome}
          style={{ marginTop: "0.35rem", color: "#007bff" }}
        />
        <div>
          <Link to="/" className="home-link">
            Home
          </Link>
          <div>Add a user</div>
        </div>
      </div>
      <div className="profile-icon">
        <img src="/compte-icone.jpg" alt="User-icon" />
        <div className="user-info">
          {user ? (
            <div>
              <p>{user.name}</p>
              <p>{user.balance.toString()}</p>
            </div>
          ) : (
            <span></span>
           )}
        </div>
      </div>
    </header>
  );
};

export default Header;
