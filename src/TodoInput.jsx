import { useRef } from "react";

function TodoInput({ value, setValue, onAdd }) {
  const inputRef = useRef(null);
  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={() => {
          onAdd();
          inputRef.current.focus();
        }}
      >
        Thêm
      </button>
    </div>
  );
}

export default TodoInput;
