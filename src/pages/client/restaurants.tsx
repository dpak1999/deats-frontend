/** @format */

import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";
import { Restaurant } from "../../components/restaurant";

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImage
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImage
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, { variables: { input: { page } } });

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPreviousPageClick = () => setPage((current) => current - 1);

  return (
    <div>
      <form className="bg-gray-800 w-full py-32 flex items-center justify-center">
        <input
          className="input w-3/12 border-0"
          type="search"
          placeholder="Search restaurants..."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl mb-20 mx-auto mt-8">
          <div className="flex justify-around max-w-sm mx-auto">
            {data?.allCategories.categories?.map((category) => (
              <div className="flex flex-col items-center cursor-pointer">
                <div
                  className="w-14 h-14 bg-cover rounded-full hover:bg-gray-200"
                  style={{ backgroundImage: `url(${category.coverImage})` }}
                ></div>
                <span className="text-sm text-center font-medium capitalize mt-2">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-x-5 gap-y-10 mt-10">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant
                id={restaurant.id + ""}
                coverImage={restaurant.coverImage}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          <div className="flex justify-center items-center mt-10">
            {page > 1 && (
              <button
                onClick={onPreviousPageClick}
                className="font-medium text-2xl mb-2 focus:outline-none"
              >
                &larr;
              </button>
            )}
            <span className="mx-2">
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages && (
              <button
                onClick={onNextPageClick}
                className="font-medium text-2xl mb-2 focus:outline-none"
              >
                &rarr;
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
