import { createSlice } from "@reduxjs/toolkit";

export interface taskstate {
  taskModalState: {
    show?: boolean;
    mode: any;
    data: any;
  };
}

const initialState: taskstate = {
  taskModalState: {
    show: false,
    mode: "ADD",
    data: null,
  },
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    showsModal: (state, action) => {
      state.taskModalState.show = action.payload.show;
      state.taskModalState.mode = action.payload.mode;
      state.taskModalState.data = action.payload.data;
    },
  },
});

export const { showsModal } = taskSlice.actions;
export default taskSlice.reducer;
