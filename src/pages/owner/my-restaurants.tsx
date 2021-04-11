/** @format */
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { myRestaurants } from "../../__generated__/myRestaurants";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const MY_RESTAURANTS_QUERY = gql`
  query myRestaurants {
    myRestaurants {
      ok
      error
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const MyRestaurants = () => {
  const { data } = useQuery<myRestaurants>(MY_RESTAURANTS_QUERY);
  return (
    <div>
      <Helmet>
        <title>My Restaurants | Deats</title>
      </Helmet>
      <div className="container mt-32">
        <h2 className="text-4xl font-medium mb-10">My Restaurants</h2>
        {data?.myRestaurants.ok && data.myRestaurants.restaurants.length === 0 && (
          <>
            <h4 className="text-xl mb-5">You have no Restaurants</h4>
            <Link className="link" to="/add-restaurant">
              Create One &rarr;
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
