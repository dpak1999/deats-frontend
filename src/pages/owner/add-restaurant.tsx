/** @format */

import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { createRestaurant } from "../../__generated__/createRestaurant";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
}

export const AddRestaurant = () => {
  const [
    createRestaurantMutation,
    { loading, data },
  ] = useMutation<createRestaurant>(CREATE_RESTAURANT_MUTATION);

  const {
    register,
    getValues,
    formState,
    errors,
    handleSubmit,
  } = useForm<IFormProps>({ mode: "onChange" });

  const onSubmit = () => {
    console.log(getValues());
  };
  return (
    <div className="container">
      <Helmet>
        <title>Create Restaurant | Deats</title>
      </Helmet>
      <h1>Add Restaurant</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input"
          name="name"
          placeholder="Name"
          type="text"
          ref={register({ required: "Name is required." })}
        />
        <input
          className="input"
          name="address"
          placeholder="Address"
          type="text"
          ref={register({ required: "Address is required." })}
        />
        <input
          className="input"
          name="categoryName"
          placeholder="Category"
          type="text"
          ref={register({ required: "Category is required." })}
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Create Restaurant"
        ></Button>
      </form>
    </div>
  );
};
