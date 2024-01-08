import { StoreApi } from "zustand";
import { InfraCanvaStore } from "../store/actions";
import { axiosInstance } from "../../client/axios";
import { InfraCanvaState } from "../store/types";
import { generateNewCanvas } from "../../utils/generateNewCanvas";

export const canvasSlice = (
  get: StoreApi<InfraCanvaStore>["getState"],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  set: StoreApi<InfraCanvaStore>["setState"]
) => ({
  setCurrentCanvas: (canvasId: string) => {
    set({ currentCanvas: canvasId });
  },
  createCanvas: () => {
    const newCanvas = generateNewCanvas();

    set((state) => ({
      canvases: [...state.canvases, newCanvas] as InfraCanvaState["canvases"],
      currentCanvas: newCanvas.id,
    }));
  },
  getCurrentCanvas: () => {
    const currentCanvasId = get().currentCanvas;
    const currentCanvas = get()!.canvases.find(
      (canvas) => canvas.id === currentCanvasId
    );
    return currentCanvas;
  },
  saveCanvas: async () => {
    const canvases = get().canvases;
    return await axiosInstance.post("/persist", JSON.stringify(canvases));
  },
  deleteCanvas: async (canvasId: string) => {
    const currentCanvas = get().getCurrentCanvas();
    if (!currentCanvas) return;
    const canvases = get().canvases.filter((canvas) => canvas.id !== canvasId);
    if (canvases.length === 0) {
      return;
    }
    set({
      canvases,
      currentCanvas: canvases[0].id,
    });
    // todo save to server ?
    // return await axiosInstance.post("/persist", JSON.stringify(canvases));
  },
});
