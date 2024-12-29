import React from "react";

const CardInventory = ({ img,kameraName,time ,status}) => {
  return (
    <div className="container">
      <div className="product-details">
        <h1>{kameraName}</h1>
        <p>status:{status}</p>
        <p>Waktu Selesai:{time.length > 2? time : `${time} jam`}</p>
        <p className="information">
        
        </p>

        <div className="control">
         
        </div>
      </div>
      <div className="product-image">
        <img src={img} alt="Omar Dsoky" />
      </div>
    </div>
  );
};

export default CardInventory;
