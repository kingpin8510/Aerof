import React from "react";
// import GoogleLogin from 'react-google-login';
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode'; // to decode the credential response


import { client } from "../client";

// const Login = () => {
//   const navigate = useNavigate();
//   const responseGoogle = (response) => {
//     localStorage.setItem('user', JSON.stringify(response.profileObj));
//     const { name, googleId, imageUrl } = response.profileObj;
//     const doc = {
//       _id: googleId,
//       _type: 'user',
//       userName: name,
//       image: imageUrl,
//     };
//     client.createIfNotExists(doc).then(() => {
//       navigate('/', { replace: true });
//     });
//   };

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (credentialResponse) => {
    // Decode jwtDecode token to get user information
    const decoded = jwtDecode(credentialResponse.credential);
    localStorage.setItem("user", JSON.stringify(decoded));

    const { name, sub: googleId, picture: imageUrl } = decoded;

    // Create a user document for Sanity (or another backend)
    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };

    // Store the user in Sanity or your database
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl">
            <GoogleOAuthProvider
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
            >
              <div className="login-container">
                <GoogleLogin
                  onSuccess={responseGoogle}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  render={(renderProps) => (
                    <button
                      type="button"
                      className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <FcGoogle className="mr-4" /> Sign in with Google
                    </button>
                  )}
                />
              </div>
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
