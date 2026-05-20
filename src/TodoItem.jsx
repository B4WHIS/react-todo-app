import { useContext } from "react";
import TodoContext from "./TodoContext";

function TodoItem({ item, index }) {
  const {
    editIndex,
    editValue,
    seteditValue,
    handleEdit,
    handleCancel,
    dispatch,
  } = useContext(TodoContext);
  return (
    <>
      {editIndex === index ? (
        <div key={index}>
          <input
            type="text"
            value={editValue}
            onChange={(e) => seteditValue(e.target.value)}
          />
          <button
            onClick={() => {
              dispatch({ type: "SAVE", payload: { editIndex, editValue } });
              handleCancel();
            }}
          >
            Lưu
          </button>
          <button onClick={handleCancel}>Hủy</button>
        </div>
      ) : (
        <>
          <p key={index}>
            {item.title}
            <button onClick={() => handleEdit(index, item)}>Sửa</button>
            <button
              onClick={() => {
                dispatch({ type: "DELETE", payload: { index } });
              }}
            >
              Xóa
            </button>
          </p>
        </>
      )}
    </>
  );
}

export default TodoItem;
