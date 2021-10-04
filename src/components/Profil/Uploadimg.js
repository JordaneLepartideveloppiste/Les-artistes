import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";


const Uploadimg = ({label, handlePicture, setFile}) => {
 

  

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">{label}</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br/>
      <input type="submit" value="OK"/>
    </form>
  );
};

export default Uploadimg;
