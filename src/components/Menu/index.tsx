import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faEraser,
  faRotateLeft,
  faRotateRight,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.css";
import { MENU_ITEMS } from "@/constants/constants";
import { changeMenuItem, actionItemClick } from "@/slice/menuSlice";
import { RootState } from "@/store";
const Menu = () => {
  const icons = [
    { icon: faPencil, name: MENU_ITEMS.PENCIL },
    { icon: faEraser, name: MENU_ITEMS.ERASER },
    { icon: faRotateLeft, name: MENU_ITEMS.UNDO },
    { icon: faRotateRight, name: MENU_ITEMS.REDO },
    { icon: faFileArrowDown, name: MENU_ITEMS.DOWNLOAD },
  ];
  const activeMenuItem = useSelector(
    (state: RootState) => state.menu.activeMenuItem
  );

  const dispatch = useDispatch();

  const handleMenuClick = (itemName: string) => {
    if (
      itemName === MENU_ITEMS.UNDO ||
      itemName === MENU_ITEMS.REDO ||
      itemName === MENU_ITEMS.DOWNLOAD
    ) {
      dispatch(actionItemClick(itemName));
    } else {
      dispatch(changeMenuItem(itemName));
    }
  };

  return (
    <div className={styles.menuContainer}>
      {icons.map((icon, index) => (
        <div
          key={index}
          className={cx(styles.iconWrapper, {
            [styles.active]: activeMenuItem === icon.name,
          })}
          onClick={() => handleMenuClick(icon.name)}
        >
          <FontAwesomeIcon icon={icon.icon} className={styles.icon} />
        </div>
      ))}
    </div>
  );
};

export default Menu;
