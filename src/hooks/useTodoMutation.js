import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { todoApi } from "../api/todos";

export const useTodoMutation = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const handleAddTodo = async (e) => {
    e.preventDefault();
    setTitle("");
    setContents("");
    const newTodo = {
      id: Date.now().toString(),
      title,
      contents,
      isCompleted: false,
      createdAt: Date.now(),
    };
    addTodo(newTodo);
  };

  const { mutate: addTodo } = useMutation({
    mutationFn: async (newTodo) => {
      await todoApi.post("/todos", newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  return { handleAddTodo, title, setTitle, contents, setContents };
};
