import React, { useState, useContext, useEffect, props } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

export const Register = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { register, error, clearErrors, isAuthenticed } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticed) {
      props.history.push("/");
    }
    if (error === "User already exists") {
      setAlert("User already exists, please login. ", "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticed]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordAgain: "",
  });

  const { name, email, password, passwordAgain } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields. ", "danger");
    } else if (password !== passwordAgain) {
      setAlert("Password do not match. ", "danger");
    } else {
      register({
        name,
        email,
        password,
      });
      console.log("register successfull.");
      setAlert("Registered new user, welcome. ", "success");
    }
  };
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            name="passwordAgain"
            value={passwordAgain}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
