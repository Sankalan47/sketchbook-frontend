import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.css";
import { RootState } from "@/store";

const Board = () => {
  const canvasRef = useRef(null);
  const activeMenuItem = useSelector(
    (state: RootState) => state.menu.activeMenuItem
  );
  const { color, size } = useSelector(
    (state: RootState) => state.toolbox[activeMenuItem]
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    return () => {};
  }, []);

  console.log(color, size);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default Board;
