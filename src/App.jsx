import React, { useEffect, useState } from "react";

import "./App.css";

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
  function handleAdd() {
    if (value === "") {
      alert("Khong duoc rong");
    } else {
      setTodo([...toDo, value]);
      setValue("");
    }
  }

  function handleDelete(index) {
    setTodo(toDo.filter((item, i) => i !== index));
  }

  function handleEdit(editIndex, editValue) {
    seteditIndex(editIndex);
    seteditValue(editValue);
  }

  function handleSave() {
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
  }

  function handleCancel() {
    seteditValue("");
    seteditIndex(null);
  }

  return (
    <div>
      <h1>To do app</h1>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleAdd}>Them</button>

      {toDo.map((item, index) =>
        editIndex === index ? (
          <React.Fragment key={index}>
            <input
              type="text"
              value={editValue}
              onChange={(e) => seteditValue(e.target.value)}
            />
            <button onClick={() => handleCancel()}>Hủy</button>
            <button onClick={handleSave}>Lưu</button>
          </React.Fragment>
        ) : (
          <>
            <p key={index}>
              {item}
              <button onClick={() => handleEdit(index, item)}>Sửa</button>
              <button onClick={() => handleDelete(index)}>Xóa</button>
            </p>
          </>
        ),
      )}
    </div>
  );
}

export default App;
