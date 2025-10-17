import axios from "axios";
import { GoogleLogin } from "./components/GoogleLogin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Menu from "./pages/Menu";

function App() {

  const handleGoogleSuccess = async (credential: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/auth/google",
        {
          credential,
        }
      );

      const { token, user } = response.data.data;

      // Store token
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      {/* <GoogleLogin 
        onSuccess={handleGoogleSuccess}
        onError={() => alert('Google sign-in failed')}
      /> */}
    </>
  );
}

export default App;
