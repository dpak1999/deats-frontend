/** @format */

import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory";
import { Dish } from "../../components/dish";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  myRestaurant,
  myRestaurantVariables,
} from "../../__generated__/myRestaurant";

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
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

interface IParams {
  id: string;
}

export const MyRestaurant = () => {
  const { id } = useParams<IParams>();
  const { data } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    { variables: { input: { id: +id } } }
  );
  return (
    <div>
      <div
        className="bg-gray-700 py-28 bg-center bg-cover container"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImage})`,
        }}
      ></div>
      <div className="container mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myRestaurant.restaurant?.name || "Loading..."}
        </h2>
        <Link
          to={`/restaurant/${id}/add-dish`}
          className="mr-8 text-white bg-gray-800 py-3 px-10"
        >
          Add Dish &rarr;
        </Link>
        <Link to={``} className="text-white bg-lime-700 py-3 px-10">
          Buy Promotion &rarr;
        </Link>
      </div>
      <div className="mt-10 container">
        {data?.myRestaurant.restaurant?.menu.length === 0 ? (
          <h4 className="text-xl mb-5">You have no Dishes. Please add one</h4>
        ) : (
          <div className="grid mt-16 gap-x-5 gap-y-10 md:grid-cols-3">
            {data?.myRestaurant.restaurant?.menu.map((dish) => (
              <Dish
                name={dish.name}
                description={dish.description}
                photo={dish.photo}
                price={dish.price}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mt-20 mb-20">
        <h4 className="text-center text-2xl font-medium">Sales</h4>
        <div className="max-w-lg w-full mx-auto">
          <VictoryChart domainPadding={30}>
            <VictoryAxis
              dependentAxis
              label="Amount"
              tickValues={[20, 30, 40, 50, 60]}
            />
            <VictoryAxis label="Days" />
            <VictoryBar
              data={[
                { x: 10, y: 20 },
                { x: 30, y: 40 },
                { x: 20, y: 50 },
                { x: 50, y: 20 },
                { x: 40, y: 90 },
              ]}
            />
          </VictoryChart>
        </div>
      </div>
    </div>
  );
};
