import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getTrends } from '../actions/post.actions';
import { isEmpty } from './Utils';

const Trends = () => {
  const posts = useSelector((state) => state.allpostReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const trendList = useSelector((state) => state.trendingReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(posts[0])) {
      const postsArr = Object.keys(posts).map((i) => posts[i]);
      let sortedArray = postsArr.sort((a, b) => {
        return b.likers.length - a.likers.length;
      });
      sortedArray.length = 1;
      dispatch(getTrends(sortedArray));
    }
  }, [posts, dispatch]);

  return (
    <div className="trending-container">
      <h4>L'œuvre du moment</h4>
      <NavLink exact to="/trending">
        <ul>
          {trendList.length &&
            trendList.map((post) => {
              return (
                <li key={post._id}>
                  <img
                    src="./img/cadre_brush.png"
                    alt="cadre"
                    className="cadre"
                  />
                  <div>
                    {post.picture && (
                      <img
                        src={post.picture}
                        alt="post-pic"
                        className="trends_img"
                      />
                    )}
                    {post.video && (
                      <iframe
                        width="500"
                        height="300"
                        src={post.video}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={post._id}
                        className="trends_img"
                      ></iframe>
                    )}
                    {isEmpty(post.picture) && isEmpty(post.video) && (
                      <img
                        src={
                          usersData[0] &&
                          usersData
                            .map((user) => {
                              if (user._id === post.posterId) {
                                return user.picture;
                              } else return null;
                            })
                            .join("")
                        }
                        alt="profil-pic"
                        className="trends_img"
                      />
                    )}
                  </div>
                  <div className="trend-content">
                    <p>{post.message}</p>
                    {/*    const [img, setImg] = useState("./img/read.png");
                                      const [span, setSpan] = useState("Lire");
                                      <div className="read-stain"
                                  onMouseEnter={() => {setImg("./img/play_hover.png"); setSpan('');}}
                                  onMouseLeave={() => {setImg("./img/read.png"); setSpan('Lire');}}>
                                    <img
                                      src={img}
                                      alt="play-stain"
                                      id="play_stain"
                                    />
                                    <span>{span}</span>
                                  </div> */}
                  </div>
                </li>
              );
            })}
        </ul>
      </NavLink>
    </div>
  );
};

export default Trends;