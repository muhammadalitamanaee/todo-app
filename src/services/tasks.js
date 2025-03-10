import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  setCompletedTasks,
  setIncompleteTasks,
} from "../redux/slices/taskSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://dummyjson.com",
});

export const userTasksApi = createApi({
  reducerPath: "userTasksApi",
  baseQuery,
  refetchOnReconnect: true,
  tagTypes: ["tasksList"],
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: () => ({
        url: `/todos?limit=20`,
      }),
      providesTags: ["tasksList"],
      keepUnusedDataFor: 0,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { todos },
          } = await queryFulfilled;
          if (!todos || !Array.isArray(todos)) {
            return;
          }
          console.log(todos);
          dispatch(
            setIncompleteTasks(
              todos.slice(0, 10).filter((task) => !task.completed)
            )
          );
          dispatch(
            setCompletedTasks(
              todos.slice(0, 10).filter((task) => task.completed)
            )
          );
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      },
    }),
    addCustomTask: builder.mutation({
      query: (data) => ({
        url: `/todos/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tasksList"],
    }),
    editTask: builder.mutation({
      query: ({ data, id }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tasksList"],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useAddCustomTaskMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
} = userTasksApi;
