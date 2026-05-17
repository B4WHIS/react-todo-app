import { useState } from "react";

import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [toDo, setTodo] = useState([]);

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

  return (
    <div>
      <h1>To do app</h1>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleAdd}>Them</button>

      {toDo.map((item, index) => (
        <p key={index}>
          {item}
          <button onClick={() => handleDelete(index)}>xoa</button>
        </p>
      ))}
    </div>
  );
}

export default App;
