/** @format */

import React from "react";
import { useForm } from "react-hook-form";

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, getValues, errors, handleSubmit } = useForm<ILoginForm>();

  const onSubmit = () => {
    console.log(getValues());
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-8 pb-7 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-2 mt-5 px-5"
        >
          <input
            ref={register({
              required: "Bruhhh you need to enter a valid email",
            })}
            name="email"
            type="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && (
            <span className="font-medium text-red-500">
              {errors.email.message}
            </span>
          )}
          <input
            ref={register({
              required: "A valid password is also required",
              minLength: 8,
            })}
            name="password"
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <span className="font-medium text-red-500">
              {errors.password.message}
            </span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="font-medium text-red-500">
              Cmon type in something longer than 8 characters
            </span>
          )}
          <button className="btn mt-3">Log In</button>
        </form>
      </div>
    </div>
  );
};
