import { useState } from "react";

import "./properties-dropdown.styles.scss";

const PropertiesDropdown = (props) => {
  const [isActive, setIsActive] = useState("");

  const toggleList = () => {
    setIsActive(!isActive);
  };

  const handleClick = () => {
    toggleList();
  };

  return (
    <div className="properties-dropdown">
      <button className="properties-dropdown__button" onClick={handleClick}>
        <span>{props.title}</span>
        {!isActive ? <span>&#65088;</span> : <span>&#65087;</span>}
      </button>
      {isActive ? (
        <div className="properties-dropdown__container">{props.children}</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PropertiesDropdown;
