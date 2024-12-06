import { todoApi } from "../api/todos";
import { useQuery } from "@tanstack/react-query";

export const useTodoQuery = (id) => {
  const fetchDetail = async () => {
    const { data } = await todoApi(`/todos/${id}`);
    return data;
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchDetail,
  });
  return { data, isPending, isError };
};
