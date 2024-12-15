import { React, lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

const Home = lazy(() => import('./components/Home/Home'));
const Login = lazy(() => import('./components/Login/Login'));
const Admin = lazy(() => import('./components/Admin/Admin'));

const App = () => {
  return (
    <>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App