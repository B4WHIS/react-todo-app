import { useContext } from "react";
import TodoContext from "./TodoContext";
import API from "./Api";
import axios from "axios";

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
              axios.put(`${API}/${item.id}`, { title: editValue }).then(() => {
                dispatch({ type: "SAVE", payload: { editIndex, editValue } });
                handleCancel();
              });
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
                axios
                  .delete(`${API}/${item.id}`)
                  .then(() => dispatch({ type: "DELETE", payload: { index } }));
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
