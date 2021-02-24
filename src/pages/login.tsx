/** @format */

import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import deatsLogo from "../images/deats.svg";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<ILoginForm>({ mode: "onChange" });

  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      console.log(token);
    }
  };

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, { onCompleted });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="h-screen flex items-center flex-col mt-8 lg:mt-24 ">
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={deatsLogo} alt="Deats" className="w-60 mb-5" />
        <h4 className="w-full text-left text-3xl ml-1 mb-2">Welcome back...</h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-2 mt-5 w-full mb-5"
        >
          <input
            ref={register({
              required: "Bruhhh you need to enter a valid email",
            })}
            name="email"
            type="email"
            placeholder="Email"
            className="input transition-colors"
            required
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            ref={register({
              required: "A valid password is also required",
            })}
            name="password"
            type="password"
            placeholder="Password"
            className="input transition-colors"
            required
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"Log In"}
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div>
          New Here?{" "}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};
