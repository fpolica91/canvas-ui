import { create } from "zustand";

import { initialState } from "./store/state";
import { actions } from "./store/actions";

import { createSelectors } from "./store/createSelectors";
import { InfraCanvaState } from "./store/types";

const useStoreBase = create<InfraCanvaState>()((set, get) => ({
  ...initialState,
  ...actions(get, set),
}));

const useStore = createSelectors(useStoreBase);
export default useStore;
