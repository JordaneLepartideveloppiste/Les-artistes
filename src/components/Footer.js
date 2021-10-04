import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import stain from "../styles/assets/img/logo_les_artistes.png";
import arrow from "../styles/assets/img/right_arrow.png";
import linkedin from "../styles/assets/img/linkedin.png";
import linkedinHover from "../styles/assets/img/linkedin_orange.png";
import github from "../styles/assets/img/github.png";
import githubHover from "../styles/assets/img/github_orange.png";
import FootStains from "../components/Stains/FootStains";

const Footer = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  const [icon1, setIcon1] = useState(linkedin);
  const [icon2, setIcon2] = useState(github);

  return (
    <>
      <FootStains />
      <div id="footer-nav">
        <div className="footer-container">
          <div className="footer-left-part">
            <NavLink exact to="/">
              <div className="logo">
                <img src={stain} alt="icone" />
              </div>
            </NavLink>
            <h6>Jordane Lepart</h6>
            <span>- Octobre 2021 -</span>
          </div>
          {uid ? (
            <div className="footer-center-part">
              <div className="center-part-left">
                <div className="see-you">
                  <span>Alors </span>
                  <h5>{userData.pseudo} </h5>
                  <span>, ici tu trouveras :</span>
                </div>
                <NavLink exact to="/profil" className="go-to-profil">
                  - Ton Profil -
                </NavLink>
              </div>
              <div className="center-part-right">
                <span>Et sinon </span>
                <p>
                  Si tu as la moindre suggestion, s'il y a un truc qui te
                  chagrine ou si tu as une idée ou autre solution on peut
                  échanger là
                </p>
                <img
                  className="arrow-footer"
                  src={arrow}
                  alt="arrow_to_right"
                />
              </div>
            </div>
          ) : (
            <div className="footer-center-part">
              <div className="center-part-left">
                <div className="dare-you">
                  <span>Oserez-vous ?</span>
                </div>
              </div>
              <div className="center-part-right">
                <p>
                  Me faire une suggestion ? Me soumettre vos idées? M'apporter
                  votre soutien ? Vous avez deux liens, juste là, sur la
                  droite...
                </p>
                <img
                  className="arrow-footer"
                  src={arrow}
                  alt="arrow_to_right"
                />
              </div>
            </div>
          )}
          <div className="footer-right-part">
            <Link
              to="https://www.linkedin.com/in/jordane-lepart-071370189/"
              target="_blank"
              className="linkedin link"
              onMouseEnter={() => setIcon1(linkedinHover)}
              onMouseLeave={() => setIcon1(linkedin)}
            >
              <img className="linkedin-icon" src={icon1} />
              <p>/jordane-lepart-071370189/</p>
            </Link>

            <Link
              to="https://github.com/JordaneLepartideveloppiste"
              target="_blank"
              className="github link"
              onMouseEnter={() => setIcon2(githubHover)}
              onMouseLeave={() => setIcon2(github)}
            >
              <img className="github-icon" src={icon2} />
              <p>/JordaneLepartideveloppiste</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
