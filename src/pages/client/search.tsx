/** @format */
import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  searchRestaurant,
  searchRestaurantVariables,
} from "../../__generated__/searchRestaurant";

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const [queryReadyToStart, { loading, data }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, query] = location.search.split("?term=");
    if (!query) {
      return history.replace("/");
    }
    queryReadyToStart({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, [history, location.search, queryReadyToStart]);
  return (
    <h1>
      <Helmet>
        <title>Search | Deats</title>
      </Helmet>
      Search page
    </h1>
  );
};
