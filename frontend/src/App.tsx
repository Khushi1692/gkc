import axios from "axios";
import { GoogleLogin } from "./components/GoogleLogin";

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
      <GoogleLogin 
        onSuccess={handleGoogleSuccess}
        onError={() => alert('Google sign-in failed')}
      />
    </>
  );
}

export default App;
