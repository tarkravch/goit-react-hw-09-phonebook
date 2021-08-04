import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSelectors, authOperations } from "../redux/auth";
import defaultAvatar from "../img/default-avatar.svg";
import Button from "@material-ui/core/Button";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: 4,
  },
  name: {
    fontWeight: 700,
    marginRight: 12,
  },
  btn: {
    display: "inline-block",
    width: 60,
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
  },
};

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUsername);
  // const onLogout = () => dispatch(authOperations.logOut());
  const onLogout = useCallback(
    () => dispatch(authOperations.logOut()),
    [dispatch]
  );
  return (
    <div style={styles.container}>
      <img src={defaultAvatar} alt={name} width="32" style={styles.avatar} />
      <span style={styles.name}>Welcome, {name}</span>
      <Button
        type="button"
        onClick={onLogout}
        variant="contained"
        color="primary"
      >
        Logout
      </Button>
    </div>
  );
}
