import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Login from './Log/Login';
import LogOut from './Log/LogOut';
import stain from "../styles/assets/img/logo_les_artistes.png";


const Navbar = ({actualWidth}) => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer)

    return (
      <nav>
        <div className="nav-container">
          <div className="logo-container">
            <NavLink exact to="/">
              <div className="logo">
                <img src={stain} alt="icone" />
                <h3>LES ARTISTES</h3>
              </div>
            </NavLink>
          </div>
          {uid ? (
            <div className="nav-content nav-content-out">
              <div className="welcome">
                <div className="welcome-message">
                  <h6>Bienvenue</h6>
                  <NavLink exact to="/profil">
                    <h5>{userData.pseudo}</h5>
                  </NavLink>
                </div>
                <LogOut />
              </div>
            </div>
          ) : (
            <div className="nav-content nav-content-in">
              <div className="welcome">
                {actualWidth < 481 && <h5>Les Artistes</h5>}
                <NavLink exact to="/profil">
                  <Login />
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
};

export default Navbar;