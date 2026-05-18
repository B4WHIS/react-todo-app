function TodoInput({ value, setValue, onAdd }) {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={onAdd}>Thêm</button>
    </div>
  );
}

export default TodoInput;
