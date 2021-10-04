import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { addPost, getPosts } from '../../actions/post.actions';
import { isEmpty, timestampParser } from '../Utils';
import tof from "../../styles/assets/img/photo_btn.png";
import pen from "../../styles/assets/img/pen_thumb_orange.png";
import border from "../../styles/assets/img/cadre_brush.png";
import Loader from '../Loader';


const NewPostForm = ({actualWidth, setModalNewPost}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);
    const[postPicture, setPostPicture] = useState(null);
    const [video, setVideo] = useState('');
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);
    const error = useSelector((state) => state.errorReducer.postError);
    const dispatch = useDispatch();

    const handlePost = async (e) => {
      e.preventDefault();
        if (message || postPicture || video) {
            const data = new FormData();
            data.append('posterId', userData._id);
            data.append('message', message);
            if (file) data.append("file", file);
            data.append('video', video);

            await dispatch(addPost(data));
            dispatch(getPosts());
            cancelPost();
            setModalNewPost(false);

        } else {
            setErrorMessage(true);
        }
    };

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        setErrorMessage(false);
        setVideo('');
    };

    const handleChange = (e) => {
      setErrorMessage(false);
      setMessage(e.target.value);
    }
    
    

    const cancelPost = () => {
        setMessage('');
        setPostPicture('');
        setVideo('');
        setFile('');
        setErrorMessage(false);
    };

    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false);
       

        const handleVideo = () => {
          let findLink = message.split(" ");
          for (let i = 0; i < findLink.length; i++) {
            if (
              findLink[i].includes("https://www.yout") ||
              findLink[i].includes("https://yout")
            ) {
              let embed = findLink[i].replace("watch?v=", "embed/");
              setVideo(embed.split("&")[0]);
              findLink.splice(i, 1);
              setMessage(findLink.join(" "));
              setPostPicture("");
            }
          }
        };

         handleVideo(); 

    }, [userData, message, video])

    

    return (
      <div className="post-container">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <NavLink exact to="/profil">
              <div className="user-info">
                <img src={userData.picture} alt="" />
                <img
                  src="./img/cadre_brush_orange.png"
                  alt="cadre"
                  className="profil-post-border"
                />
              </div>
            </NavLink>
            <div className="border-post">
              <div className="new-post">
                <div className="right-part-post"></div>
                <div className="left-part-post">
                  <div className="follow-counters">
                    <p>
                      <span>
                        {userData.following ? userData.following.length : "0"}
                      </span>{" "}
                      Abonnement
                      {userData.following && userData.following.length > 1
                        ? "s"
                        : null}
                    </p>
                    <p>
                      <span>
                        {userData.followers ? userData.followers.length : "0"}
                      </span>{" "}
                      Abonné
                      {userData.followers && userData.followers.length > 1
                        ? "s"
                        : null}
                    </p>
                  </div>
                  <div className="post-title">
                    {actualWidth < 481 ? (
                      <h3>
                        Vas-y{" "}
                        <NavLink exact to="/profil">
                          <span id="pseudo">{userData.pseudo}</span>
                        </NavLink>
                        , exprime-toi !
                      </h3>
                    ) : (
                      <h3>
                        Vas-y <span id="pseudo">{userData.pseudo}</span>, prends
                        ton pinceau et exprime-toi !
                      </h3>
                    )}
                  </div>
                  <div className="new-post-area">
                    <div className="post-form">
                      <img src={pen} alt="icon" id="pen-new-post" />
                      <textarea
                        name="message"
                        id="message"
                        placeholder="Tache d'être explicite..."
                        onChange={handleChange}
                        value={message}
                      />
                      <div className="icon">
                        {isEmpty(video) && (
                          <>
                            <label htmlFor="file">
                              <img src={tof} alt="img" />
                            </label>
                            <input
                              type="file"
                              id="file-upload"
                              name="file"
                              accept=".jpg, .jpeg, .png"
                              onChange={(e) => handlePicture(e)}
                            />
                          </>
                        )}
                        {video && (
                          <button className="sup-video-btn" onClick={() => setVideo("")}>
                            Supprimer video
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-new-post">
                <div className="card-container">
                  <div className="card-content">
                    {postPicture && (
                      <>
                        <img
                          width="180"
                          height="180"
                          src={postPicture}
                          alt=""
                          id="thumb-post-picture"
                        />
                        <img
                          width="210"
                          height="210"
                          src={border}
                          alt="border-paint"
                          id="border-picture"
                        />
                      </>
                    )}
                    {video && (
                      <>
                        <img
                          width="340"
                          height="212"
                          src={border}
                          alt="border-paint"
                          id="border-video"
                        />
                        <iframe
                          width="300"
                          height="180"
                          src={video}
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={video}
                          id="thumb-post-video"
                        ></iframe>
                      </>
                    )}
                  </div>
                </div>
                <div className="error-messages">
                  {errorMessage ? (
                    <p>ça va être compliqué comme ça</p>
                  ) : (
                    <p> </p>
                  )}
                  {!isEmpty(error.format) && <p>{error.format}</p>}
                  {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
                </div>
              </div>

              <div className="btn-send">
                {message || postPicture || video.length > 20 ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
};

export default NewPostForm;