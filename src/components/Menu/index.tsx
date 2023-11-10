import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faEraser,
  faRotateLeft,
  faRotateRight,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.css";

const Menu = () => {
  const icons = [
    faPencil,
    faEraser,
    faRotateLeft,
    faRotateRight,
    faFileArrowDown,
  ];

  return (
    <div className={styles.menuContainer}>
      {icons.map((icon, index) => (
        <div key={index} className={styles.iconWrapper}>
          <FontAwesomeIcon icon={icon} className={styles.icon} />
        </div>
      ))}
    </div>
  );
};

export default Menu;
