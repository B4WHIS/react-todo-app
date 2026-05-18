import { useCallback, useEffect, useState } from "react";

import "./App.css";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";

function App() {
  const [value, setValue] = useState("");
  const [toDo, setTodo] = useState([]);
  const [editValue, seteditValue] = useState("");
  const [editIndex, seteditIndex] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded === true) localStorage.setItem("todos", JSON.stringify(toDo));
  }, [toDo]);

  useEffect(() => {
    const data = localStorage.getItem("todos");
    const dataTodo = JSON.parse(data);
    setTodo(dataTodo);
    setLoaded(true);
  }, []);

  const handleAdd = useCallback(() => {
    if (value === "") {
      alert("Khong duoc rong");
    } else {
      setTodo([...toDo, value]);
      setValue("");
    }
  }, [toDo, value]);

  const handleDelete = useCallback(
    (index) => {
      setTodo(toDo.filter((item, i) => i !== index));
    },
    [toDo],
  );

  function handleEdit(editIndex, editValue) {
    seteditIndex(editIndex);
    seteditValue(editValue);
  }

  const handleSave = useCallback(() => {
    setTodo(
      toDo.map((item, index) => {
        if (index === editIndex) {
          return editValue;
        } else {
          return item;
        }
      }),
    );
    seteditIndex(null);
    seteditValue("");
  }, [toDo, editIndex, editValue]);

  function handleCancel() {
    seteditValue("");
    seteditIndex(null);
  }

  return (
    <div>
      <h1>To do app</h1>

      <TodoInput value={value} setValue={setValue} onAdd={handleAdd} />

      {toDo.map((item, index) => (
        <TodoItem
          key={index}
          item={item}
          index={index}
          editIndex={editIndex}
          editValue={editValue}
          onCancel={handleCancel}
          onDelete={() => handleDelete(index)}
          onSave={handleSave}
          onEdit={() => handleEdit(index, item)}
          onEditChange={seteditValue}
        />
      ))}
    </div>
  );
}

export default App;
