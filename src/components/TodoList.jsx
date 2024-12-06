import { useNavigate } from "react-router-dom";
import { useTodosQuery } from "../hooks/useTodosQuery";

export default function TodoList() {
  const navigate = useNavigate();
  const { data: todos } = useTodosQuery();
  console.log(todos);
  return (
    <ul style={{ listStyle: "none", width: 250 }}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{todo.title}</h3>
          <button onClick={() => navigate(`/detail/${todo.id}`)}>
            내용보기
          </button>
        </li>
      ))}
    </ul>
  );
}
