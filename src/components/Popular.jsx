import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "./Header";
import Footer from "./Footer";
import BeatLoader from "react-spinners/BeatLoader";

const API_STATUS = {
  INITIAL: 'INITIAL',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  IN_PROGRESS: 'IN_PROGRESS',
};

function Popular() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [status, setStatus] = useState(API_STATUS.INITIAL);

  const fetchPopularMoviesData = async () => {
    try {
      setStatus(API_STATUS.IN_PROGRESS);
      const jwt_token = Cookies.get("jwt_token");
      const url = "https://apis.ccbp.in/movies-app/popular-movies";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        const formattedData = data.results.map((each) => ({
          backDropPath: each.backdrop_path,
          id: each.id,
          overView: each.overview,
          posterPath: each.poster_path,
          title: each.title,
        }));
        setPopularMovies(formattedData);
        setStatus(API_STATUS.SUCCESS);
      } else {
        setStatus(API_STATUS.FAILURE);
      }
    } catch (error) {
      console.error("Failed to fetch popular movies:", error);
      setStatus(API_STATUS.FAILURE);
    }
  };

  useEffect(() => {
    fetchPopularMoviesData();
  }, []);

  const renderContent = () => {
    if (status === API_STATUS.IN_PROGRESS) {
      return (
        <div className="flex justify-center items-center h-60">
          <BeatLoader color="#ffffff" />
        </div>
      );
    }

    if (status === API_STATUS.FAILURE) {
      return (
        <div className="text-center text-white py-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">Popular Movies</h1>
          <img
            src="https://res.cloudinary.com/deukqrxtt/image/upload/v1752144191/Group_whef8b.png"
            alt="failure view"
            className="w-70 mx-auto mb-4"
          />
          <p>Something went wrong. Please try again.</p>
          <button
            onClick={fetchPopularMoviesData}
            className="mt-2 px-4 py-2 bg-white text-black rounded"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (status === API_STATUS.SUCCESS) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularMovies.map((each) => (
            <div key={each.id} className="w-full">
              <Link to={`/movie/${each.id}`}>
                <img
                  src={each.backDropPath}
                  alt={each.title}
                  className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-contain rounded-md shadow-md hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <div className="p-4 sm:p-6 md:p-10">
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
}

export default Popular;
