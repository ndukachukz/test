import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { SignInContext } from "../../Contexts/SignInContext.js";

import "./dashboared.css";

const Dashboared = () => {
  const { isSignedIn, setIsSignedIn } = useContext(SignInContext);
  const [clear, setclear] = useState(false);

  useEffect(() => {
    return () => {
      localStorage.clear();
      setIsSignedIn(false);
    };
  }, [clear]);

  return (
    <>
      {/* if isSignedIn and bio is true render. else redirect to login */}
      {isSignedIn ? (
        <div className="dashbox">
          <h1>profile</h1>
          <b>Name: </b>
          {localStorage.getItem("name")}
          <br />
          <b> Age:</b> {localStorage.getItem("age")}
          <b> Email:</b> {localStorage.getItem("email")}
          <br />
          <b> Phone:</b>
          {localStorage.getItem("phone")}
          <br />
          <b> Date Created: </b>
          {localStorage.getItem("created")}
          <button onClick={() => setclear(true)}>clear</button>
          {/* the localStorage is a way to store data in the web browser */}
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Dashboared;
