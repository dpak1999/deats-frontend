/** @format */

import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="h-screen flex flex-col items-center justify-center">
    <Helmet>
      <title>Not found | Deats</title>
    </Helmet>
    <h2 className="font-semibold text-2xl mb-3">Page not found</h2>
    <h4 className="font-medium text-base mb-5">
      The page you are looking for does not exist or has moved.
    </h4>
    <Link className="hover:underline text-lime-600" to="/">
      Go back to home &rarr;
    </Link>
  </div>
);
