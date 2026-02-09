// import React from 'react'
// import {Link} from "react-router"
// const Home = ({ user, error }) => {
//   return (
//     <div>
//       {error && <p>{error}</p>}
//       <div>
//         {user ? <div>

//           <h1>{`Welcome ${user.username}`}</h1>
//           <p>Email :{`${user.email}`}</p>
//         </div> : <div>
//           <p>  Welcome! Please Login or Register if you dont have Account </p>
//           <Link to="/login"></Link>
//           <Link to ="/register"></Link>
//                 </div>


//         }

//       </div>
//     </div>
//   )
// }

// export default Home


import React from "react";
import { Link } from "react-router";

const Home = ({ user, error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 text-center">
        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-100 px-3 py-2 rounded">
            {error}
          </p>
        )}

        {user ? (
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Welcome, {user.username}
            </h1>
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {user.email}
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-3">
              Welcome!
            </h1>
            <p className="text-gray-600 mb-6">
              Please login or register if you don’t have an account.
            </p>

            <div className="flex gap-4 justify-center">
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
