import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../AppContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../actions/post.actions';


const LikeButton = ({post}) => {
    const [liked, setLiked] = useState(false);
    const [imgLike, setImgLike] = useState('./img/icons/like.png')
    const [imgLiked, setImgLiked] = useState('./img/icons/liked.png')
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const like = () => {
        dispatch(likePost(post._id, uid))
        setLiked(true);
    };
    const unlike = () => {
        dispatch(unlikePost(post._id, uid))
        setLiked(false);
    };

    useEffect(() => {
        if (post.likers.includes(uid)) setLiked(true);
        else setLiked(false);
    }, [uid, post.likers, liked]);

    return (
      <div className="like-container">
        {uid === null && (
          <Popup
            trigger={<img src="./img/icons/like.png" alt="like" />}
            position={["bottom center", "bottom right", "bottom left"]}
            closeOnDocumentClick
          >
            <div>connecte-toi tu pourras</div>
          </Popup>
        )}
        {uid && liked === false && (
          <div
            className="like_icon"
            onMouseEnter={() => setImgLike("./img/icons/like_hover.png")}
            onMouseLeave={() => setImgLike("./img/icons/like.png")}
          >
            <img src={imgLike} onClick={like} alt="like" />
          </div>
        )}
        {uid && liked && (
          <div
            className="like_icon"
            onMouseEnter={() => setImgLiked("./img/icons/like.png")}
            onMouseLeave={() => setImgLiked("./img/icons/liked.png")}
          >
            <img src={imgLiked} onClick={unlike} alt="unlike" />
          </div>
        )}
        <span>{post.likers.length}</span>
      </div>
    );
};

export default LikeButton;