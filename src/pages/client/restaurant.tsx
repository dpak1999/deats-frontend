/** @format */

import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  restaurant,
  restaurantVariables,
} from "../../__generated__/restaurant";
import { Dish } from "../../components/dish";

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

interface IRestaurantParams {
  id: string;
}

export const Restaurant = () => {
  const params = useParams<IRestaurantParams>();
  const { loading, data } = useQuery<restaurant, restaurantVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: +params.id,
        },
      },
    }
  );
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImage})`,
        }}
        className="bg-gray-800 py-48 bg-cover bg-center"
      >
        <div className="bg-white w-3/12 py-6 pl-44">
          <h4 className="text-4xl mb-2">{data?.restaurant.restaurant?.name}</h4>
          <h5 className="capitalize text-sm font-light mb-2">
            {data?.restaurant.restaurant?.category?.name}
          </h5>
          <h6 className="capitalize text-sm font-light">
            {data?.restaurant.restaurant?.address}
          </h6>
        </div>
      </div>

      <div className="container grid mt-16 gap-x-5 gap-y-10 md:grid-cols-3 mb-14">
        {data?.restaurant.restaurant?.menu.map((dish, index) => (
          <Dish
            key={index}
            name={dish.name}
            description={dish.description}
            price={dish.price}
            photo={dish.photo}
            isCustomer={true}
            options={dish.options}
          />
        ))}
      </div>
    </div>
  );
};
