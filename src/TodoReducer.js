function toDoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((item, i) => i !== action.payload.index);
    case "SAVE":
      console.log(action.payload);
      return state.map((item, index) => {
        return index === action.payload.editIndex
          ? action.payload.editValue
          : item;
      });
  }
}

export default toDoReducer;
