import React, { useState } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';

const LogOut = () => {
    const removeCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, { expires: 1});
        }
    };
    const logout = async () => {
        await axios({
            method: 'get',
            url: `http://localhost:5000/api/user/logout`,
            withCredentials: true,
        })
        .then(() => removeCookie("jwt"))
        .catch((err) => console.log('Cookie-error ' + err));

        window.location = '/';

    };
    const [img, setImg] = useState("./img/logout.png");

        return (
          <div
            className="logout_nav"
            onClick={logout}
            onMouseEnter={() => setImg("./img/logout_hover.png")}
            onMouseLeave={() => setImg("./img/logout.png")}
          >
            <span>Logout</span>
            <img src={img} alt="logo_logout" className="arrow_logout" />
          </div>
        );
};

export default LogOut;