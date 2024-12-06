import { useTodoMutation } from "../hooks/useTodoMutation";
export default function TodoForm() {
  // TODO: 선택: useMutation을 useTodoMutation 커스텀훅으로 정리해 보세요.
  const { handleAddTodo, title, setTitle, contents, setContents } =
    useTodoMutation();

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="title">제목:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="contents">내용:</label>
      <input
        id="contents"
        name="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        required
      />
      <button type="submit">추가하기</button>
    </form>
  );
}
