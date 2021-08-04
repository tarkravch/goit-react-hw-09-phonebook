import React, { useEffect, Suspense, lazy } from "react";
import { Switch, Redirect } from "react-router-dom";
import AppBar from "./components/AppBar";
import Container from "./components/Container/Container";
import { authOperations } from "./redux/auth";
import { useDispatch } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
const HomeView = lazy(() => import("./views/HomeView"));
const RegisterView = lazy(() => import("./views/RegisterView"));
const LoginView = lazy(() => import("./views/LoginView"));
const ContactsView = lazy(() => import("./views/ContactsView"));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => { /* instead of componentDidMount */
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <Container>
      <AppBar />
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <PublicRoute exact path="/">
            <HomeView />
          </PublicRoute>
          <PublicRoute path="/register" restricted redirectTo="/">
            <RegisterView />
          </PublicRoute>
          <PublicRoute path="/login" restricted redirectTo="/">
            <LoginView />
          </PublicRoute>
          <PrivateRoute path="/contacts" redirectTo="/login">
            <ContactsView />
          </PrivateRoute>
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Container>
  );
}
