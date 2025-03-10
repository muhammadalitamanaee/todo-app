import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  completedTasks: [],
  inCompletedTasks: [],
};

const userTasksSlice = createSlice({
  name: "userTask",
  initialState,
  reducers: {
    setCompletedTasks: (state, action) => {
      state.completedTasks = action.payload;
    },
    setIncompleteTasks: (state, action) => {
      state.inCompletedTasks = action.payload;
    },
  },
});

export const { setCompletedTasks, setIncompleteTasks } = userTasksSlice.actions;

export default userTasksSlice.reducer;
