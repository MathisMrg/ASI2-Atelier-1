import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

interface HeaderProps {
  title : String;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const selectedUser = useSelector((state : any) => state.userReducer.selectedUser);

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
          <div>{title}</div>
        </div>
      </div>
      <div className="profile-icon">
        <img src="/compte-icone.jpg" alt="User-icon" />
        <div className="user-info">
          {selectedUser ? (
            <div>
              <p>{selectedUser.surName}</p>
              <p>{selectedUser.account.toString()}</p>
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
