function TodoItem({
  item,
  index,
  editIndex,
  editValue,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  onEditChange,
}) {
  return (
    <>
      {editIndex === index ? (
        <div key={index}>
          <input
            type="text"
            value={editValue}
            onChange={(e) => onEditChange(e.target.value)}
          />
          <button onClick={onSave}>Lưu</button>
          <button onClick={onCancel}>Hủy</button>
        </div>
      ) : (
        <>
          <p key={index}>
            {item}
            <button onClick={onEdit}>Sửa</button>
            <button onClick={onDelete}>Xóa</button>
          </p>
        </>
      )}
    </>
  );
}

export default TodoItem;
