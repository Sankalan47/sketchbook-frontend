import React, { useRef, useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.css";
import { RootState } from "@/store";

const Board = () => {
  const canvasRef = useRef(null);
  const shouldDrawRef = useRef(false);
  const activeMenuItem = useSelector(
    (state: RootState) => state.menu.activeMenuItem
  );
  const { color, size } = useSelector(
    (state: RootState) => state.toolbox[activeMenuItem]
  );

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d")!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beginPath = (x: number, y: number) => {
      context.beginPath();
      context.moveTo(x, y);
    };
    const drawLine = (x: number, y: number) => {
      context.lineTo(x, y);
      context.stroke();
    };

    const mouseUpHandler = (e: MouseEvent) => {
      shouldDrawRef.current = false;
    };
    const mouseDownHandler = (e: MouseEvent) => {
      shouldDrawRef.current = true;
      beginPath(e.clientX, e.clientY);
    };
    const mouseMoveHandler = (e: MouseEvent) => {
      if (!shouldDrawRef.current) return;
      drawLine(e.clientX, e.clientY);
    };

    canvas.addEventListener("mousedown", mouseDownHandler);
    canvas.addEventListener("mousemove", mouseMoveHandler);
    canvas.addEventListener("mouseup", mouseUpHandler);

    //remove listener on component unmount
    return () => {
      canvas.removeEventListener("mousedown", mouseDownHandler);
      canvas.removeEventListener("mousemove", mouseMoveHandler);
      canvas.removeEventListener("mouseup", mouseUpHandler);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d")!;

    const changeCanvasConfig = () => {
      color && (context.strokeStyle = color);
      size && (context.lineWidth = size);
    };

    changeCanvasConfig();

    return () => {};
  }, [color, size]);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default Board;
