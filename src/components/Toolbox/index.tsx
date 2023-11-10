import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { COLORS, MENU_ITEMS } from "@/constants/constants";
import { changeColor, changeBrushSize } from "@/slice/toolboxSlice";
import { RootState } from "@/store";
import cx from "classnames";
import { socketInstance } from "@/socket";
import styles from "./index.module.css";

const Toolbox = () => {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector(
    (state: RootState) => state.menu.activeMenuItem
  );
  const { color, size } = useSelector(
    (state: RootState) => state.toolbox[activeMenuItem]
  );

  const showStrokeToolOptions = activeMenuItem === MENU_ITEMS.PENCIL;
  const showBrushToolOptions =
    activeMenuItem === MENU_ITEMS.PENCIL ||
    activeMenuItem === MENU_ITEMS.ERASER;

  const brushSizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }));
    socketInstance.emit("config", { color, size: e.target.value });
  };

  const colorChangeHandler = (newColor: string) => {
    dispatch(changeColor({ item: activeMenuItem, color: newColor }));
    socketInstance.emit("config", { color: newColor, size });
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
                <React.Fragment key={index}>
                  {item !== "white" && (
                    <div
                      className={cx(styles.colorBox, {
                        [styles.active]: color === item,
                      })}
                      style={{ backgroundColor: item }}
                      onClick={() => colorChangeHandler(item)}
                    />
                  )}
                </React.Fragment>
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
                value={size}
                onChange={(e) => brushSizeHandler(e)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Toolbox;
