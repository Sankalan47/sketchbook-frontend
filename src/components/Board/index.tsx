import React, { useRef, useEffect } from "react";
import styles from "./index.module.css";

const Board = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    return () => {};
  }, []);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default Board;
