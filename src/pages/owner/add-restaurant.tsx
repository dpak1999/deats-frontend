/** @format */

import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { MY_RESTAURANTS_QUERY } from "./my-restaurants";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { createRestaurant } from "../../__generated__/createRestaurant";
import { useHistory } from "react-router-dom";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
      restaurantId
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  coverImage: string;
}

export const AddRestaurant = () => {
  const client = useApolloClient();
  const history = useHistory();
  const onCompleted = (data: createRestaurant) => {
    const {
      createRestaurant: { ok, restaurantId },
    } = data;
    if (ok) {
      const { address, categoryName, name, coverImage } = getValues();
      const queryResult = client.readQuery({ query: MY_RESTAURANTS_QUERY });
      console.log(queryResult);
      client.writeQuery({
        query: MY_RESTAURANTS_QUERY,
        data: {
          myRestaurants: {
            ...queryResult?.myRestaurants,
            restaurants: [
              {
                address,
                category: {
                  name: categoryName,
                  __typename: "Category",
                },
                coverImage,
                id: restaurantId,
                isPromoted: false,
                name,
                __typename: "Restaurant",
              },
              ...queryResult.myRestaurants.restaurants,
            ],
          },
        },
      });
      history.push("/");
    }
  };

  const [
    createRestaurantMutation,
    { data, loading },
  ] = useMutation<createRestaurant>(CREATE_RESTAURANT_MUTATION, {
    onCompleted,
  });

  const { register, getValues, formState, handleSubmit } = useForm<IFormProps>({
    mode: "onChange",
  });

  const onSubmit = () => {
    try {
      const { address, categoryName, name, coverImage } = getValues();
      createRestaurantMutation({
        variables: {
          input: {
            name,
            categoryName,
            address,
            coverImage,
          },
        },
      });
    } catch (error) {}
  };
  return (
    <div className="container h-screen flex items-center flex-col mt-8 lg:mt-24 ">
      <Helmet>
        <title>Create Restaurant | Deats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <h1 className="w-full text-center text-3xl">Add Restaurant</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-2 mt-5 w-full mb-5"
        >
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
          <input
            className="input"
            name="coverImage"
            placeholder="Image URL"
            type="text"
            ref={register({ required: "Image is required." })}
          />
          <Button
            loading={loading}
            canClick={formState.isValid}
            actionText="Create Restaurant"
          ></Button>
          {data?.createRestaurant?.error && (
            <FormError errorMessage={data.createRestaurant.error} />
          )}
        </form>
      </div>
    </div>
  );
};
