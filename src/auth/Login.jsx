import { useContext, useState } from "react";
import UserContext from "../storage/UserContext";
import { logIn } from "../services/userService";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const { logInUser } = useContext(UserContext);
    const navigate = useNavigate();
  
    const [user, setUser] = useState({
      email: "",
      password: "",
    });
  
    const [error, setError] = useState(null);
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      logIn(user.email, user.password)
        .then(({ data }) => {
          logInUser(data.user);
          localStorage.setItem("access_token", data.authorisation.token);
          localStorage.setItem("email", user.email);
          localStorage.setItem("password", user.password);
  
          setError("");
          navigate("/");
        })
        .catch(() => {
          setError("Invalid email or password. Please try again.");
        });
  
      setUser({
        email: "",
        password: "",
      });
    };
  
    const handelInputChange = (event) => {
      const { name, value } = event.target;
      setUser((prevState) => {
        return { ...prevState, [name]: value };
      });
    };
  
    return (
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Login</h2>
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="login-input">
              <input 
                type="email" 
                placeholder="Email" 
                name="email" 
                onChange={handelInputChange} 
                value={user.email} 
                required 
              />
            </div>
            <div className="login-input">
              <input 
                type="password" 
                placeholder="Password" 
                name="password" 
                onChange={handelInputChange} 
                value={user.password} 
                required 
              />
            </div>
            <button 
              className="login-button" 
              type="submit"
              disabled={!user.email || !user.password}
            >
              Login
            </button>
          </form>
          <div className="login-social">
            <a href="#!"><i className="fab fa-facebook-f fa-lg"></i></a>
            <a href="#!"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
            <a href="#!"><i className="fab fa-google fa-lg"></i></a>
          </div>
          <p className="login-signup">Don't have an account? <a href="/register">Sign Up</a></p>
        </div>
      </div>
    );
  };
  
  export default Login;