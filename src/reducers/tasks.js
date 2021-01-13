import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: 'task',
  initialState: { task: '', tasks: [] },
  reducers: {
    inputTask(state, action) {
      state.task = action.payload
    },
    addTask(state, action) {
      state.tasks = [...state.tasks, action.payload]
      // state.tasks.concat([action.payload])
    }
  }
});

export const { inputTask, addTask } = slice.actions

export default slice.reducer
