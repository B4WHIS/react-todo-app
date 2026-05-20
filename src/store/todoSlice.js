import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      return [...state, action.payload];
    },
    saveTodo: (state, action) => {
      return state.map((item, index) => {
        return index === action.payload.editIndex
          ? { ...item, title: action.payload.editValue }
          : item;
      });
    },
    deleteTodo: (state, action) => {
      return state.filter((item, i) => i !== action.payload.index);
    },
    setTodo: (state, action) => {
      return action.payload;
    },
  },
});

export const { addTodo, deleteTodo, saveTodo, setTodo } = todoSlice.actions;
export default todoSlice.reducer;
