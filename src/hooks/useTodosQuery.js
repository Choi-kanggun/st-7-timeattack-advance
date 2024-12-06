import { useQuery } from "@tanstack/react-query";
import { todoApi } from "../api/todos";

export const useTodosQuery = () => {
  const fetchData = async () => {
    const { data } = await todoApi.get("/todos");
    return data;
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchData,
  });

  return { fetchData, data, isPending, isError };
};
