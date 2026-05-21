import { useEffect, useMemo, useState } from "react";

import "./App.css";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import TodoContext from "./TodoContext";
import axios from "axios";
import API from "./Api";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setTodo } from "./store/todoSlice";

// 
function App() {
  const [value, setValue] = useState("");
  const toDo = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editValue, seteditValue] = useState("");
  const [editIndex, seteditIndex] = useState(null);

  useEffect(() => {
    axios.get(API).then((res) => dispatch(setTodo(res.data)));
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
              .then((res) => dispatch(addTodo(res.data)));

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
