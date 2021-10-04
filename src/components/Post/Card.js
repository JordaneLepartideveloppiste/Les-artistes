import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../actions/post.actions';
import FollowHandler from '../Profil/FollowHandler';
import { isEmpty, dateParser } from '../Utils';
import CardComments from './CardComments';
import DeleteCard from './DeleteCard';
import LikeButton from './LikeButton';
import { addComment, getPosts } from "../../actions/post.actions";
import { Link } from 'react-router-dom';
import { UidContext } from "../AppContext";
import { uploadPicture } from '../../actions/user.actions';
import Uploadimg from '../Profil/Uploadimg';
import Loader from '../Loader';


const Card = ({post, setBtnNewPost, actualWidth}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);
     const [text, setText] = useState("");
    const [imgComment, setImgComment] = useState('./img/icons/comments.png');
    const [imgShare, setImgShare] = useState('./img/icons/share.png');
    const [updateImg, setUpdateImg] = useState(false);
    const [imgBrushText, setImgBrushText] = useState('./img/brush_textarea_user.png');
    const [modalMedia, setModalMedia] = useState(false);

    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);

    const dispatch = useDispatch();

    const cardFooter = document.getElementsByClassName('card-footer');
    const uid = useContext(UidContext);

    const upDateItem = () => {
      if (textUpdate) {
        dispatch(updatePost(post._id, textUpdate))
      }
      setIsUpdated(false)
    }

    const handleComment = (e) => {
      e.preventDefault();

      if (text) {
        dispatch(addComment(post._id, userData._id, text, userData.pseudo))
          .then(() => dispatch(getPosts()))
          .then(() => setText(""));
      }
    };

    const handleClick = () => {
      setIsUpdated(!isUpdated) 
      setBtnNewPost(false)
    }

    const handleMedia =() => {
      setModalMedia(true);
    }
    const handleShowComments =() => {
      setShowComments(!showComments)
      setBtnNewPost(false);
    }



    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData]);

    return (
      <div className="card-complete">
        <li key={post._id}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div
                className={
                  !post.picture && !post.video
                    ? "card-container light"
                    : "card-container"
                }
              >
                <div className="card-left">
                  <img
                    src={
                      !isEmpty(usersData[0]) &&
                      usersData
                        .map((user) => {
                          if (user._id === post.posterId) return user.picture;
                          else return null;
                        })
                        .join("")
                    }
                    alt="poster-pic"
                    className="poster_pic"
                  />
                  <img
                    src="./img/cadre_brush.png"
                    alt="cadre"
                    className="cadre"
                  />

                  {userData._id === post.posterId && (
                    <div className="button-container">
                      <div onClick={handleClick}>
                        <img
                          src="./img/icons/marker.png"
                          alt="edit"
                          id="marker"
                        />
                      </div>
                      <DeleteCard id={post._id} />
                    </div>
                  )}
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>
                        {!isEmpty(usersData[0]) &&
                          usersData
                            .map((user) => {
                              if (user._id === post.posterId)
                                return user.pseudo;
                              else return null;
                            })
                            .join("")}
                      </h3>
                      {post.posterId !== userData._id && (
                        <FollowHandler
                          idToFollow={post.posterId}
                          type={"card"}
                        />
                      )}
                    </div>
                    <span>{dateParser(post.createdAt)}</span>
                  </div>
                  {isUpdated === false && (
                    <div className="message-complete">
                      <img
                        src="./img/stain_text.png"
                        alt="stain-text"
                        id="stain_text"
                      />
                      <div className="message">
                        <p>{post.message}</p>
                      </div>
                    </div>
                  )}
                  {isUpdated && (
                    <div className="update-post">
                      <img
                        src={imgBrushText}
                        alt="brush-text"
                        id="brush-text"
                      />
                      <textarea
                        defaultValue={post.message}
                        onChange={(e) => setTextUpdate(e.target.value)}
                        onFocus={(e) =>
                          setImgBrushText("./img/brush_textarea.png")
                        }
                      />
                      <div className="button-container">
                        <div className="btn" onClick={upDateItem}>
                          Modifie
                        </div>
                      </div>
                    </div>
                  )}

                  {isUpdated && post.picture ? (
                    <>
                      <div className="update-post-picture">
                        {post.picture ? (
                          <>
                            <img
                              src={post.picture}
                              alt="card-pic"
                              className="update-card-pic"
                            />
                            <img
                              onClick={() => {
                                setUpdateImg(true);
                              }}
                              src="./img/cadre_brush.png"
                              alt="cadre"
                              className="update-border"
                            />
                            {updateImg && <Uploadimg />}
                          </>
                        ) : (
                          isUpdated &&
                          !post.picture &&
                          !post.video && (
                            <>
                              <div className="add-pic">
                                <div className="plus">+</div>
                                <span>Ajoute une image</span>
                              </div>
                              <img
                                onClick={() => {
                                  setUpdateImg(true);
                                }}
                                src="./img/cadre_brush.png"
                                alt="cadre"
                                className="update-border"
                              />
                              {updateImg && <Uploadimg />}
                            </>
                          )
                        )}
                      </div>
                    </>
                  ) : post.picture ? (
                    <>
                      <div className="post-picture">
                        <img
                          src={post.picture}
                          alt="card-pic"
                          className="card-pic"
                        />
                      </div>
                      <img
                        src="./img/cadre_brush_orange.png"
                        alt="cadre"
                        className="border-post-picture"
                        onClick={handleMedia}
                      />
                    </>
                  ) : null}

                  {isUpdated && post.video ? (
                    <div className="post-video">
                      <img
                        width="226"
                        height="132"
                        src="./img/cadre_brush.png"
                        alt="cadre"
                        className="border-update-card-video"
                      />
                      <iframe
                        width="193"
                        height="116"
                        src={post.video}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={post._id}
                        className="update-video"
                      ></iframe>
                    </div>
                  ) : !isUpdated && post.video ? (
                    <div className="post-video">
                      <img
                        width="270"
                        height="150"
                        src="./img/cadre_brush_orange.png"
                        alt="cadre"
                        className="border-card-video"
                      />
                      <iframe
                        width="232"
                        height="129"
                        src={post.video}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={post._id}
                        className="post-video-iframe"
                      ></iframe>
                    </div>
                  ) : null}
                </div>
              </div>
              {uid ? (
                !isUpdated ? (
                  <>
                    <div
                      className="card-footer"
                      style={{ marginBottom: "120" }}
                    >
                      <div
                        className="comment-icon"
                        onMouseEnter={() =>
                          setImgComment("./img/icons/comments_hover.png")
                        }
                        onMouseLeave={() =>
                          setImgComment("./img/icons/comments.png")
                        }
                      >
                        <img
                          onClick={handleShowComments}
                          src={imgComment}
                          alt="comment"
                        />
                        <span>{post.comments.length}</span>
                      </div>
                      <LikeButton post={post} />
                      <Link
                        to={{
                          pathname:
                            "https://www.linkedin.com/in/jordane-lepart-071370189/",
                        }}
                        target="_blank"
                        onMouseEnter={() =>
                          setImgShare("./img/icons/share_hover.png")
                        }
                        onMouseLeave={() =>
                          setImgShare("./img/icons/share.png")
                        }
                      >
                        <img src={imgShare} alt="share" />
                      </Link>
                    </div>

                    <div className="card-comments">
                      {showComments && (
                        <CardComments post={post} actualWidth={actualWidth} />
                      )}
                      {userData._id && (
                        <form
                          action=""
                          onSubmit={handleComment}
                          className="comment-form"
                        >
                          <input
                            type="text"
                            name="text"
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                            className="post-comment"
                            placeholder="Réagir..."
                          />
                          <input
                            type="submit"
                            value="Go"
                            className="post-comment-btn"
                          />
                        </form>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="empty-space"></div>
                )
              ) : null}
            </>
          )}
        </li>
      </div>
    );
};

export default Card;