"use-client";
import React, { useRef, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./index.module.css";
import { RootState } from "@/store";
import { MENU_ITEMS } from "@/constants/constants";
import { actionItemClick } from "@/slice/menuSlice";
import { socketInstance } from "@/socket";

const Board = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const shouldDrawRef = useRef(false);
  const drawHistoryRef = useRef<ImageData[]>([]);
  const historyPointerRef = useRef(0);

  const { activeMenuItem, actionMenuItem } = useSelector(
    (state: RootState) => state.menu
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
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistoryRef.current.push(imageData);
      historyPointerRef.current = drawHistoryRef.current.length - 1;
    };
    const mouseDownHandler = (e: MouseEvent) => {
      shouldDrawRef.current = true;
      beginPath(e.clientX, e.clientY);
      socketInstance.emit("beginPath", { x: e.clientX, y: e.clientY });
    };
    const mouseMoveHandler = (e: MouseEvent) => {
      if (!shouldDrawRef.current) return;
      drawLine(e.clientX, e.clientY);
      socketInstance.emit("drawPath", { x: e.clientX, y: e.clientY });
    };

    canvas.addEventListener("mousedown", mouseDownHandler);
    canvas.addEventListener("mousemove", mouseMoveHandler);
    canvas.addEventListener("mouseup", mouseUpHandler);

    const handleBeginPath = (path: { x: number; y: number }) => {
      beginPath(path.x, path.y);
    };
    const handleDrawPath = (path: { x: number; y: number }) => {
      drawLine(path.x, path.y);
    };

    socketInstance.on("beginPath", handleBeginPath);
    socketInstance.on("drawPath", handleDrawPath);

    //remove listener on component unmount
    return () => {
      canvas.removeEventListener("mousedown", mouseDownHandler);
      canvas.removeEventListener("mousemove", mouseMoveHandler);
      canvas.removeEventListener("mouseup", mouseUpHandler);
      socketInstance.off("beginPath", handleBeginPath);
      socketInstance.off("drawPath", handleDrawPath);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d")!;

    const changeCanvasConfig = (color: string, size: number) => {
      color && (context.strokeStyle = color);
      size && (context.lineWidth = size);
    };

    color && changeCanvasConfig(color, size);

    const handleChangeConfig = (config: { color: string; size: number }) => {
      changeCanvasConfig(config.color, config.size);
    };

    socketInstance.on("config", handleChangeConfig);

    return () => {
      socketInstance.off("config", handleChangeConfig);
    };
  }, [color, size]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d")!;

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "sketch.jpeg";
      anchor.click();
    } else if (
      actionMenuItem === MENU_ITEMS.UNDO ||
      actionMenuItem === MENU_ITEMS.REDO
    ) {
      if (historyPointerRef.current > 0 && actionMenuItem === MENU_ITEMS.UNDO)
        historyPointerRef.current -= 1;
      if (
        historyPointerRef.current < drawHistoryRef.current.length - 1 &&
        actionMenuItem === MENU_ITEMS.REDO
      )
        historyPointerRef.current += 1;
      if (drawHistoryRef.current.length > 0) {
        const imageData = drawHistoryRef.current[historyPointerRef.current];
        context.putImageData(imageData, 0, 0);
      }
    }
    dispatch(actionItemClick(null));

    return () => {};
  }, [actionMenuItem, dispatch]);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default Board;
