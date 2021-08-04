import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { authOperations } from "../redux/auth";
import Button from "@material-ui/core/Button";

const styles = {
  form: {
    width: 320,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 15,
    color: "var(--main-font)",
  },
  btn: {
    display: "inline-block",
    minWidth: 60,
    height: "auto",
    fontFamily: "Ubuntu",
    fontSize: 16,
    lineHeight: 1.2,
    fontStyle: "normal",
    fontWeight: 700,
    color: "black",
    border: "2px solid var(--btn-color)",
    borderRadius: 10,
    backgroundColor: "var(--btn-color)",
    padding: 5,
    cursor: "pointer",
    boxShadow: "11px 10px 21px 0px rgba(34, 60, 80, 0.2)",
    "&:hover": {
      color: "var(--color-black)",
      backgroundColor: "var(--list-color)",
      border: "2px solid var(--list-color)",
    },
  },
};

export default function LoginView() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = useCallback(
    () => dispatch(authOperations.logIn({ email, password })),
    [dispatch, email, password]
  );
  // const onLogin = () => dispatch(authOperations.logIn({ email, password }));

  const handleEmail = (e) => {
    setEmail(e.currentTarget.value);
  };

  const handlePassword = (e) => {
    setPassword(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h1>Log in page</h1>
      <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
        <label style={styles.label}>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />
        </label>
        <label style={styles.label}>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
        </label>
        <Button
          /* style={styles.btn} */ type="submit"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
