import { Routes, Route } from "react-router"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navber from "./components/Navbar"
import { useState, useEffect } from "react"
import axios from "axios"




function App() {

  let [user, setUser] = useState(null)
  let [error, setError] = useState("")

  useEffect(() => {
    let fetchuser = async () => {
      let token = localStorage.getItem("token")
      if (token) {
        try {
          let userdata = await axios.get(`spi/users/me`, {
            Authorization: `Bearer ${token}`
          });
          setUser(userdata.data)
        }
        catch (error) {
          setError("Failed to fetch the user data");
          localStorage.removeItem("token");
        }
      }
    }
    fetchuser()
  }, [])



  return (
    <>
      <Navber user={user} setuser={setUser} />
      <Routes>

        <Route path="/" element={<Home user={user} error={error} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register setUser={setUser} />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />

      </Routes>
    </>
  )
}

export default App
