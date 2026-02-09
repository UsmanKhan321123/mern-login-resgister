// import React from 'react'
// import { Link, useNavigate } from 'react-router'

// const Navbar = ({user,setUser}) => {
//   let navigate = useNavigate()
//   let handleLogout = () =>{
//     setUser(null)
//     navigate("/login")
//     localStorage.removeItem("token")
//   }
//   return (
//     <nav>
//       <div>
//       <h3>Mern Auth</h3>
//       </div>
//       <div>
//         {
//           user ? <button onClick={handleLogout}>Logout</button> : <div>
//             <Link to= "/login">Login</Link>
//             <Link to="/register">Register</Link>
//           </div>
//         }
//       </div>
//     </nav>
//   )
// }

// export default Navbar
import React from "react";
import { Link, useNavigate } from "react-router";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <h3 className="text-xl font-bold text-blue-600">
          MERN Auth
        </h3>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-600 text-sm hidden sm:block">
                Hi, <span className="font-medium">{user.username}</span>
              </span>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 font-medium hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
