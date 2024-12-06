import { useQuery } from "@tanstack/react-query";
import { todoApi } from "../api/todos";

export const useTodosQuery = () => {
  const {
    data: todos,
    error,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await todoApi.get("/todos");
      return response.data;
    },
  });
  return { todos, error, isPending, refetch };
};
