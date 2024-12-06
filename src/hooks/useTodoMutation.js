import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { todoApi } from "../api/todos";
export const useTodoMutation = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: (newTodo) => todoApi.post("/todos", newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
  const handleAddTodo = async (e) => {
    e.preventDefault();
    setTitle("");
    setContents("");
    addMutation.mutate({
      id: Date.now().toString(),
      title,
      contents,
      isCompleted: false,
      liked: false,
      createdAt: Date.now(),
    });
  };

  const { mutate: setTodo } = useMutation({
    mutationFn: async ({ id, currentLiked }) => {
      await todoApi.patch(`/todos/${id}`, {
        liked: !currentLiked,
      });
    },

    onMutate: ({ id }) => {
      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, liked: !todo.liked } : todo
        )
      );
      return { previousTodos };
    },

    onError: (err, newTodo, context) => {
      console.error(err);
      queryClient.setQueryData(["todos"], context.previousTodos);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const handleLike = async (id, currentLiked) => {
    setTodo({ id, currentLiked });
  };

  return { handleAddTodo, title, setTitle, contents, setContents, handleLike };
};
