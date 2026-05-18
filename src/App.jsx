import { useCallback, useMemo, useState } from "react";

import "./App.css";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import useLocalStorage from "./useLocalStorage";

function App() {
  const [value, setValue] = useState("");
  const [toDo, setTodo] = useLocalStorage("todos", []);
  const [editValue, seteditValue] = useState("");
  const [editIndex, seteditIndex] = useState(null);
  // const [loaded, setLoaded] = useState(false);

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

  const countTodo = useMemo(() => {
    return toDo.length;
  }, [toDo]);

  return (
    <div>
      <h1>To do app</h1>
      <p>Số todo: {countTodo}</p>
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
