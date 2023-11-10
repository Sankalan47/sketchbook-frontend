import React from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from "@/constants/constants";
import { RootState } from "@/store";

const Toolbox = () => {
  const activeMenuItem = useSelector(
    (state: RootState) => state.menu.activeMenuItem
  );

  const showStrokeToolOptions = activeMenuItem === MENU_ITEMS.PENCIL;
  const showBrushToolOptions =
    activeMenuItem === MENU_ITEMS.PENCIL ||
    activeMenuItem === MENU_ITEMS.ERASER;

  const brushSizeHandler = () => {
    console.log("brush size fn");
  };

  return (
    <div className={styles.toolboxContainer}>
      {showStrokeToolOptions && (
        <>
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
        </>
      )}
      {showBrushToolOptions && (
        <>
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
        </>
      )}
    </div>
  );
};

export default Toolbox;
