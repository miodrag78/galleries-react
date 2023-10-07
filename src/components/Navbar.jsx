import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../storage/UserContext";
import { logOut } from "../services/userService";

const Navbar = () => {
  const { loggedIn, logOutUser, user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    const shouldLogOut = window.confirm("Are you sure?");
    if (shouldLogOut) {
      logOut().then(({ data }) => {
        logOutUser(data);
        localStorage.removeItem("access_token");
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        navigate("/login");
      });
    }
  };

  return (
    <header className="navbar-default navbar-fixed-top" id="nav1">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none">
            {/* Ovde možete dodati logo ili tekst */}
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="/" className="nav-link px-2">Home</a></li>
            {loggedIn ? (
              <>
                <li><a href="/add-gallery" className="nav-link px-2">Create Gallery</a></li>
                <li><a href="/my-galleries" className="nav-link px-2">My Galleries</a></li>
              </>
            ) : null}
          </ul>

          <div className="text-end">
            {loggedIn ? (
              <>
                <button className="btn btn-outline-info me-2">
                  {user?.first_name} {user?.last_name}
                </button>
                <button
                  className="btn btn-outline-warning"
                  type="button"
                  onClick={() => handleLogOut()}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <a href="/login">
                  <button type="button" className="btn btn-outline-info me-2">
                    Login
                  </button>
                </a>
                <a href="/register">
                  <button type="button" className="btn btn-warning">
                    Register
                  </button>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;