import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import FootStains from "../components/Stains/FootStains";
import HeadStains from "../components/Stains/HeadStains";


const NotFound = () => {
    return (
      <>
        <HeadStains />
        <div className="not-found-page">
          <div className="not-found-main">
            <h1>Et ton histoire s'arrête là</h1>
            <h4 className="error">Page introuvable</h4>
            <Link to="/" id="back-home">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </>
    );
};

export default NotFound;