/** @format */

import { gql, useMutation, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory";
import { Dish } from "../../components/dish";
import {
  DISH_FRAGMENT,
  ORDERS_FRAGMENT,
  RESTAURANT_FRAGMENT,
} from "../../fragments";
import { useMe } from "../../hooks/useMe";
import {
  createPayment,
  createPaymentVariables,
} from "../../__generated__/createPayment";
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
        orders {
          ...OrderParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
  ${ORDERS_FRAGMENT}
`;

const CREATE_PAYMENT_MUTATION = gql`
  mutation createPayment($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      ok
      error
    }
  }
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

  const onCompleted = (data: createPayment) => {
    if (data.createPayment.ok) {
      alert("Your restaurant is being promoted");
    }
  };
  const [createPaymentMutation, { loading }] = useMutation<
    createPayment,
    createPaymentVariables
  >(CREATE_PAYMENT_MUTATION, { onCompleted });

  const { data: userData } = useMe();
  const triggerPaddle = () => {
    if (userData?.me.email) {
      // @ts-ignore
      window.Paddle.Setup({ vendor: 130757 });
      // @ts-ignore
      window.Paddle.Checkout.open({
        product: 653741,
        email: userData.me.email,
        successCallback: (data: any) => {
          createPaymentMutation({
            variables: {
              input: {
                restaurantId: +id,
                transactionId: data.checkout.id,
              },
            },
          });
        },
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>
          {data?.myRestaurant.restaurant?.name || "Loading..."} | Deats
        </title>
        <script src="https://cdn.paddle.com/paddle/paddle.js"></script>
      </Helmet>
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
        <span
          onClick={triggerPaddle}
          className="cursor-pointer text-white bg-lime-700 py-3 px-10"
        >
          Buy Promotion &rarr;
        </span>
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
        <div className="container mx-auto">
          <VictoryChart
            domainPadding={50}
            width={window.innerWidth}
            height={500}
            containerComponent={<VictoryVoronoiContainer />}
            theme={VictoryTheme.material}
          >
            <VictoryLine
              labels={({ datum }) => `$ ${datum.y}`}
              labelComponent={
                <VictoryLabel
                  renderInPortal
                  style={{ fontSize: 18 }}
                  dy={-20}
                />
              }
              data={data?.myRestaurant.restaurant?.orders.map((order) => ({
                x: order.createdAt,
                y: order.total,
              }))}
              interpolation="natural"
              style={{ data: { strokeWidth: 5 } }}
            />
            <VictoryAxis
              tickLabelComponent={<VictoryLabel renderInPortal />}
              style={{ tickLabels: { fontSize: 18, fill: "#4D7C0F" } as any }}
              tickFormat={(tick) => new Date(tick).toLocaleDateString()}
            />
          </VictoryChart>
        </div>
      </div>
    </div>
  );
};
