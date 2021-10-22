/* 
    This form uses a third party library to validate data input
*/
import { useContext, useEffect } from "react";
import "./form.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignInContext } from "../../../Contexts/SignInContext";
import { useHistory, Redirect } from "react-router-dom";

const schema = yup.object({
  fullName: yup.string().required(),
  age: yup
    .number("Please enter a valid age")
    .required("age is required")
    .positive()
    .integer(),
  email: yup.string().email().required(),
  phone: yup.number("Please enter a valid Number"),
  createdOn: yup.date().default(() => {
    return new Date();
  }),
});

const Formfirst = () => {
  const { isSignedIn, setIsSignedIn } = useContext(SignInContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  let history = useHistory();

  const formSubmit = (data) => {
    //   deStructure data
    const { fullName, age, email, phone, createdOn } = data;
    //   create Local

    localStorage.setItem("name", fullName);
    localStorage.setItem("age", age);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("created", createdOn);

    setIsSignedIn(true);
    history.push("/dashboared");
  };
  useEffect(() => {
    if (
      localStorage.getItem("name") ||
      localStorage.getItem("age") ||
      localStorage.getItem("email") ||
      localStorage.getItem("phone") ||
      localStorage.getItem("created")
    ) {
      setIsSignedIn(true);
      // history.push("/dashboared");
    }
  });

  return (
    <>
      {!isSignedIn ? (
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="user-box">
              <input
                type="text"
                name="fullName"
                {...register("fullName", {
                  required: "Required",
                })}
              />
              <label>Full Name</label>
            </div>
            <p className="errors">
              {errors.fullName && errors.fullName.message}
            </p>
            <div className="user-box">
              <input
                type="email"
                name="email"
                {...register("email", {
                  required: "Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
              />
              <label>Email</label>
            </div>
            <p className="errors">{errors.email && errors.email.message}</p>
            <div className="user-box">
              <input type="number" name="phone" {...register("phone")} />
              <label>Phone</label>
            </div>
            <p className="errors">{errors.phone && errors.phone.message}</p>
            <div className="user-box">
              <input
                type="number"
                name="age"
                {...register("age", {
                  required: "Required",
                })}
              />
              <label>age</label>
              <p className="errors">{errors.age && errors.age.message}</p>
            </div>
            <div className="btn">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <input type="submit" />
            </div>
          </form>
        </div>
      ) : (
        <Redirect to="/dashboared" />
      )}
    </>
  );
};

export default Formfirst;
