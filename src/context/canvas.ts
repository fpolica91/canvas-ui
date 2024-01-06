import { create } from "zustand";

import { initialState } from "./store/state";
import { actions } from "./store/actions";

import { createSelectors } from "./store/createSelectors";
import { InfraCanvaState } from "./store/types";
import { createJSONStorage, persist } from "zustand/middleware";

const useStoreBase = create<InfraCanvaState>()(
  persist(
    (set, get) => ({
      ...initialState,
      ...actions(get, set),
    }),
    {
      name: "canvas-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

const useStore = createSelectors(useStoreBase);
export default useStore;
