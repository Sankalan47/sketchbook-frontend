import React from "react";
import styles from "./index.module.css";
import { COLORS } from "@/constants/constants";

const Toolbox = () => {
  const brushSizeHandler = () => {
    console.log("brush size fn");
  };

  return (
    <div className={styles.toolboxContainer}>
      {/* color pallete */}
      <div className={styles.toolboxItem}>
        <h4 className={styles.toolText}>Brush Color</h4>
        <div className={styles.itemContainer}>
          {Object.values(COLORS).map((item: string, index) => (
            <div
              key={index}
              className={styles.colorBox}
              style={{ backgroundColor: item }}
            />
          ))}
        </div>
      </div>
      {/* brush size */}
      <div className={styles.toolboxItem}>
        <h4 className={styles.toolText}>Brush Size</h4>
        <div className={styles.itemContainer}>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            onChange={brushSizeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbox;
