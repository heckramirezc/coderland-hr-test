import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TasksState } from '../types/task';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Task = {
        id: uuidv4(),
        description: action.payload,
      };
      state.tasks.push(newTask);
    },
  },
});

export const { addTask } = tasksSlice.actions;

export default tasksSlice.reducer;