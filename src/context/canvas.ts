/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import _ from "lodash";
import { initialState } from "./store/state";
import { actions } from "./store/actions";
import { createSelectors } from "./store/createSelectors";
import { InfraCanvaAction, InfraCanvaState } from "./store/types";
import { createJSONStorage, persist } from "zustand/middleware";
import { canvasSlice } from "./canvas/actions";

const useStoreBase = create<InfraCanvaState & InfraCanvaAction>()(
  persist(
    (set, get) => ({
      ...(initialState as unknown as InfraCanvaState),
      ...actions(get, set),
      ...canvasSlice(get, set),
    }),
    {
      name: "canvas-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => {
        return _.pick(state, ["canvases", "currentCanvas"]);
      },
    }
  )
);

const useStore = createSelectors(useStoreBase);
export default useStore;
