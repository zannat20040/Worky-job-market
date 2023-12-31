import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./Component/Home/Home.jsx";
import Root from "./Root.jsx";
import Login from "./Authentication/Login/Login.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import Authentication from "./Authentication/Authentication.jsx";
import Signup from "./Authentication/Signup/Signup.jsx";
import PrivateRoute from "./Private Route/PrivateRoute.jsx";
import AddJobs from "./Component/Add jobs/AddJobs.jsx";
import JobDetails from "./Component/Job Details/JobDetails.jsx";
import PostedJobs from "./Component/Posted Jobs/PostedJobs.jsx";
import UpdateDetails from "./Component/Update job/UpdateDetails.jsx";
import Bid from "./Component/Bid page/Bid.jsx";
import BidReq from "./Component/Bid Request/BidReq.jsx";
import ErrorPage from "./ErrorPage.jsx";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement:<ErrorPage></ErrorPage>,
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addjobs",
        element: <PrivateRoute><AddJobs></AddJobs></PrivateRoute>
      },
      {
        path: "/addjobs/:id",
        element:<PrivateRoute><JobDetails></JobDetails></PrivateRoute>,
        loader:  ({params})=>fetch(`https://server-side-taupe.vercel.app/addjobs/${params.id}`)
      },     
      {
        path: "/postedjobs",
        element:<PrivateRoute><PostedJobs></PostedJobs></PrivateRoute>,
        loader: ()=>fetch(`https://server-side-taupe.vercel.app/addjobs`)
      },
      {
        path: "/updatejob/:id",
        element:<PrivateRoute><UpdateDetails></UpdateDetails></PrivateRoute>,
        loader: ()=>fetch(`https://server-side-taupe.vercel.app/addjobs`)
      },
      {
        path: "/mybids",
        element: <PrivateRoute><Bid></Bid></PrivateRoute>,
        loader: ()=>fetch(`https://server-side-taupe.vercel.app/bids`)
      },
      {
        path: "/bidrequest",
        element: <PrivateRoute><BidReq></BidReq></PrivateRoute>,
        loader: ()=>fetch(`https://server-side-taupe.vercel.app/bids`)
      },
      
    ],
  },
  {
    path:'/authentication',
    errorElement:<ErrorPage></ErrorPage>,
    element:<Authentication></Authentication>,
    children:[
      {
        path: "/authentication/login",
        element: <Login></Login>
      },
      {
        path: "/authentication/signup",
        element: <Signup></Signup>
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <HelmetProvider>
    <RouterProvider router={router} />
    </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>
);
