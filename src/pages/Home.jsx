import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useTodosQuery } from "../hooks/useTodosQuery";

export default function Home() {
  // TODO: 필수: useQuery 로 리팩터링 하세요.
  // TODO: 선택: useQuery 로 리팩터링 후, 커스텀훅 useTodosQuery 로 정리해 보세요.
  const { fetchData, data, isPending, isError } = useTodosQuery();
  if (isPending) {
    return <div style={{ fontSize: 36 }}>로딩중...</div>;
  }

  if (isError) {
    console.error(isError);
    return (
      <div style={{ fontSize: 24 }}>에러가 발생했습니다: {isError.message}</div>
    );
  }
  return (
    <>
      <h2>서버통신 투두리스트 by useState</h2>
      <TodoForm fetchData={fetchData} />
      <TodoList todos={data} />
    </>
  );
}
