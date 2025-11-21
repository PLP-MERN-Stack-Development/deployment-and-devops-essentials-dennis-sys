// client/src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { PostProvider } from "./context/PostContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import DocumentList from "./components/DocumentList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { ThemeProvider } from "./context/ThemeContext";
import "./pdf-worker.js";

function RequireAuth({ children }) {
  const { token } = React.useContext(AuthContext);
  return token ? children : <Navigate to="/login" replace />;
}

function Layout({ children }) {
  const location = useLocation();
  const hideHeader = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}

      <div style={{ display: "flex", justifyContent: "center", paddingTop: hideHeader ? 0 : 120 }}>
        <div style={{ width: "100%", maxWidth: 1100, padding: 24 }}>
          {children}
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <ThemeProvider>

            <Routes>

              {/* PUBLIC ROUTES */}
              <Route
                path="/"
                element={<Navigate to="/register" replace />}
              />

              <Route
                path="/register"
                element={
                  <Layout>
                    <Register />
                  </Layout>
                }
              />

              <Route
                path="/login"
                element={
                  <Layout>
                    <Login />
                  </Layout>
                }
              />

              {/* PROTECTED */}
              <Route
                path="/home"
                element={
                  <RequireAuth>
                    <Layout>
                      <DocumentList />
                    </Layout>
                  </RequireAuth>
                }
              />

              {/* CATCH-ALL */}
              <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>

          </ThemeProvider>
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
