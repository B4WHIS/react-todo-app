import { useEffect, useMemo, useReducer, useState } from "react";

import "./App.css";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import toDoReducer from "./TodoReducer";
import TodoContext from "./TodoContext";
import axios from "axios";
import API from "./Api";

function App() {
  const [value, setValue] = useState("");
  const [toDo, dispatch] = useReducer(
    toDoReducer,
    JSON.parse(localStorage.getItem("todos")) || [],
  );
  const [editValue, seteditValue] = useState("");
  const [editIndex, seteditIndex] = useState(null);

  useEffect(() => {
    axios.get(API).then((res) => dispatch({ type: "SET", payload: res.data }));
  }, []);

  function handleEdit(index, item) {
    seteditIndex(index);
    seteditValue(item.title);
  }

  function handleCancel() {
    seteditValue("");
    seteditIndex(null);
  }

  const countTodo = useMemo(() => {
    return toDo.length;
  }, [toDo]);

  return (
    <TodoContext.Provider
      value={{
        editIndex,
        editValue,
        seteditValue,
        handleEdit,
        handleCancel,
        dispatch,
      }}
    >
      <div>
        <h1>To do app</h1>
        <p>Số todo: {countTodo}</p>
        <TodoInput
          value={value}
          setValue={setValue}
          onAdd={() => {
            if (value === "") return alert("Không được rỗng");
            axios
              .post(API, { title: value, completed: false })
              .then((res) => dispatch({ type: "ADD", payload: res.data }));

            setValue("");
          }}
        />

        {toDo.map((item, index) => (
          <TodoItem key={index} item={item} index={index} />
        ))}
      </div>
    </TodoContext.Provider>
  );
}

export default App;
