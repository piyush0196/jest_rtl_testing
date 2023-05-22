import React from "react";

export const ToppingOption = ({ name, imagePath }) => {
  return (
    <div>
      <img src={`http://localhost:3030${imagePath}`} alt={`${name} topping`} />
    </div>
  );
};
