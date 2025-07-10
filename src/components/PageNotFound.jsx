import { useNavigate } from "react-router-dom"

function PageNotFound() {
    const navigate = useNavigate();
    const handleGoToHome = () => {
        navigate("/");
    };
  return (
    <>
    <div className="bg-[url(https://res.cloudinary.com/deukqrxtt/image/upload/v1751608939/93955cfc4c28572ced55c420bbcd234b14c68813_kii5ht.jpg)]  w-screen h-screen bg-cover bg-center flex items-center justify-center ">
      <div className="absolute inset-0 bg-gradient-to-b from-[#4368EB] to-[#A4B8FF00] opacity-75 bg-center flex items-center justify-center">
        <div>
            <h1 className="text-8xl font-bold text-white p-10">Lost Your Way ?</h1>
            <p className="text-lg flex justify-center text-white p-10">We are sorry the page you requested could not be found<br/>Please go back to Home Page</p>
            <div className="flex justify-center">
                <button className="bg-white pt-3 pb-3 pl-6 pr-6 rounded-md" onClick={handleGoToHome}>Go to Home</button>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default PageNotFound
