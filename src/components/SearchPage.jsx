import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserDetailsContainer } from "../context/UserDetailsContext";
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

function SearchPage() {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [status, setStatus] = useState(API_STATUS.INITIAL);
  const { searchValue } = useContext(UserDetailsContainer);

  const fetchTopRatedMovies = async () => {
    try {
      setStatus(API_STATUS.IN_PROGRESS);
      const jwt_token = Cookies.get("jwt_token");
      const url = "https://apis.ccbp.in/movies-app/top-rated-movies";
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
        setAllMovies(formattedData);
        setStatus(API_STATUS.SUCCESS);
      } else {
        setStatus(API_STATUS.FAILURE);
      }
    } catch (error) {
      console.error("Error fetching top-rated movies:", error);
      setStatus(API_STATUS.FAILURE);
    }
  };

  useEffect(() => {
    fetchTopRatedMovies();
  }, []);

  useEffect(() => {
    const result = searchValue
      ? allMovies.filter((movie) =>
          movie.title.toLowerCase().includes(searchValue)
        )
      : allMovies;

    setFilteredMovies(result);
  }, [searchValue, allMovies]);

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
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
            className="w-32 mx-auto mb-4"
          />
          <p>Something went wrong. Please try again.</p>
          <button
            onClick={fetchTopRatedMovies}
            className="mt-2 px-4 py-2 bg-white text-black rounded"
          >
            Try Again
          </button>
        </div>
      );
    }

    return (
      <>
        {searchValue && (
          <h2 className="text-xl mb-4">
            Search results for "<span className="text-red-400">{searchValue}</span>"
          </h2>
        )}

        {filteredMovies.length === 0 ? (
          <p className="text-center text-gray-400 flex justify-center">
            {searchValue
              ?<div className="flex justify-center flex-col">
                <img src= "https://res.cloudinary.com/deukqrxtt/image/upload/v1752144376/Group_7394_tphubg.png" className="h-[300px] w-[300px] "/>
                <h2>No results found for "${searchValue}"</h2>
              </div>  
              : <div>
                <img src= "https://res.cloudinary.com/deukqrxtt/image/upload/v1752144376/Group_7394_tphubg.png"/>
                <h2>No movies found.</h2>
              </div>}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((each) => (
              <div key={each.id} className="w-full">
                <Link to={`/movie/${each.id}`}>
                  <img
                    src={each.backDropPath}
                    alt={each.title}
                    className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-contain rounded-md shadow-md hover:scale-110 transition-transform duration-300"
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </>
    );
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

export default SearchPage;
