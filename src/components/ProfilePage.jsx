import Header from "./Header"
import Footer from "./Footer"
import { useNavigate } from "react-router-dom"
import { UserDetailsContainer } from "../context/UserDetailsContext"
import Cookies from "js-cookie"
import { useContext } from "react"

function ProfilePage() {
  const { userName, password ,setUserName ,setPassword } = useContext(UserDetailsContainer)
  const Password = password.length
  const stars = "*".repeat(Password)
  const navigate = useNavigate()
  const logout =()=>{
    Cookies.remove("jwt_token"); 
    setUserName("");
    setPassword("");
    navigate("/login");
  }

  return (
    <>
      <div className="bg-black min-h-screen flex flex-col">
        <Header />
        <div className="bg-white p-6 sm:p-10 flex-grow w-full">
          <h1 className="font-bold text-3xl sm:text-5xl p-2">Account</h1>
          <hr className="my-4" />
          <div className="flex flex-col sm:flex-row justify-between gap-4 py-6">
            <p className="text-lg font-semibold">
              Membership: <span className="font-normal text-gray-700 break-all"> {`${userName}@gmail.com`} </span>
              <br />
              <span className="text-gray-600 ml-28">{stars}</span>
            </p>
          </div>
          <hr className="my-4" />
          <div className="py-6">
            <p className="text-lg ">
              Plan Details: <span className="p-2 border rounded bg-gray-100 text-sm font-medium"> Premium - Ultra HD </span>
            </p>
          </div>
          <hr />
          <div className="flex justify-center">
            <button className="p-2 bg-red-600 text-white mt-10 cursor-pointer rounded-md" onClick={logout}>Logout</button>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  )
}

export default ProfilePage
