import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useAddCustomTaskMutation } from "../services/tasks";
import useGeolocation from "../hooks/useGeoLocation";

export default function TaskAdder() {
  const [addTask, { isLoading }] = useAddCustomTaskMutation();
  const geolocation = useGeolocation();
  const methods = useForm({
    mode: "onChange",
    shouldFocusError: true,
    defaultValues: { tasktitle: "" },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const errorMessage = errors?.tasktitle?.message;
  const onSubmit = async (data) => {
    await addTask({
      todo: data.tasktitle,
      userId: 1,
      completed: false,
      geolocation,
    }).unwrap();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-4">
        <label htmlFor="tasktitle" />
        <input
          {...register("tasktitle", {
            minLength: 5,
            required: "this field should be full",
          })}
          placeholder="Add a task title..."
        />
        <button
          disabled={isLoading}
          className="disabled:bg-gray-300"
          type="submit"
        >
          Add
        </button>
        {errorMessage && <span className="min-w-3">{errorMessage}</span>}
      </form>
    </FormProvider>
  );
}
