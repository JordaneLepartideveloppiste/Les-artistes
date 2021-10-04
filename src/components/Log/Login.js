import React, { useState } from 'react';

const Login = () => {
    const [img, setImg] = useState("./img/login.png");

  return (
    <div
      className="login_nav"
      onMouseEnter={() => setImg("./img/login_hover.png")}
      onMouseLeave={() => setImg("./img/login.png")}
    >
      <span>Login</span>
      <img src={img} alt="login-pic" className="arrow_log" />
    </div>
  );
};

export default Login;