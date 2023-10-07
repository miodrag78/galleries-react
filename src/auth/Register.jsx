import { useContext, useState } from "react";
import UserContext from "../storage/UserContext";
import { registerUser } from "../services/userService";

import { useNavigate } from "react-router-dom";


const Register = () => {
    const navigate = useNavigate();
    const { logInUser } = useContext(UserContext);
  
    const [user, setUser] = useState({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
  
    const [isAccepted, setIsAccepted] = useState(false);
    const [error, setError] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (isAccepted === true) {
        const { password, password_confirmation } = user;
  
        if (password.length < 8) {
          setError("Password must be at least 8 characters long.");
          return;
        }
  
        if (!/\d/.test(password)) {
          setError("Password must contain at least 1 number.");
          return;
        }
  
        if (password !== password_confirmation) {
          setError("Passwords do not match.");
          return;
        }
  
        registerUser(
          user.first_name,
          user.last_name,
          user.email,
          user.password,
          user.password_confirmation
        )
          .then(({ data }) => {
            logInUser(data);
            localStorage.setItem("access_token", data.authorisation.token);
            setError("");
            setUser({
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              password_confirmation: "",
            });
            alert("Registration successful, welcome!");
            navigate("/login");
          })
          .catch(() => {
            setError("Email already exists. Please choose another email.");
          });
      }
    };
  
    const handelInputChange = (event) => {
      const { name, value } = event.target;
      setUser((prevState) => {
        return { ...prevState, [name]: value };
      });
    };
  
    const handleChecked = () => {
      setIsAccepted(!isAccepted);
    };
  
    return (
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Create an account</h2>
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="login-input">
              <input 
                type="text" 
                placeholder="First Name" 
                name="first_name" 
                onChange={handelInputChange} 
                value={user.first_name} 
                required 
              />
            </div>
            <div className="login-input">
              <input 
                type="text" 
                placeholder="Last Name" 
                name="last_name" 
                onChange={handelInputChange} 
                value={user.last_name} 
                required 
              />
            </div>
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
            <div className="login-input">
              <input 
                type="password" 
                placeholder="Repeat Password" 
                name="password_confirmation" 
                onChange={handelInputChange} 
                value={user.password_confirmation} 
                required 
              />
            </div>
            <div className="login-input">
              <label>
                <input 
                  type="checkbox" 
                  checked={isAccepted}
                  onChange={handleChecked} 
                  name="isAccepted" 
                  value={isAccepted} 
                  required 
                />
                I accept all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
              </label>
            </div>
            <button 
              className="login-button" 
              type="submit"
              disabled={!isAccepted || !user.email || !user.password}
            >
              Register
            </button>
          </form>
          <p className="login-signup">Already have an account? <a href="/login">Login here</a></p>
        </div>
      </div>
    );
  };
  
  export default Register;