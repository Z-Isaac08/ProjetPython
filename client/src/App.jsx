import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router";
import useUserStore from "./store/userStore";

const Home = lazy(() => import('./components/Home/Home'));
const Login = lazy(() => import('./components/Login/Login'));
const Admin = lazy(() => import('./components/Admin/Admin'));
const Borrow = lazy(() => import('./components/Borrow/Borrow'));

const App = () => {
  const user = useUserStore((state) => state.user); 

  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        {/* Login accessible même sans utilisateur */}
        <Route path="/login" element={<Login />} />

        {/* Protéger toutes les autres routes */}
        <Route
          path="*"
          element={user ? <AuthenticatedRoutes /> : <Navigate to="/login" />}
        />
      </Routes>
    </Suspense>
  );
};

const AuthenticatedRoutes = () => {
  return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/borrow" element={<Borrow />} />
      </Routes>
  );
};

export default App;
