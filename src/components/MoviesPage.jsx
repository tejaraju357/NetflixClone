import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "./Header";
import Footer from "./Footer";

const API_STATUS = {
  INITIAL: "INITIAL",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  IN_PROGRESS: "IN_PROGRESS",
};

function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [apiStatus, setApiStatus] = useState(API_STATUS.INITIAL);
  const [showAllSimilar, setShowAllSimilar] = useState(false);
  const { id } = useParams();

  const fetchMovies = async () => {
    setApiStatus(API_STATUS.IN_PROGRESS);
    const jwtToken = Cookies.get("jwt_token");
    const movieItemDetailsUrl = `https://apis.ccbp.in/movies-app/movies/${id}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(movieItemDetailsUrl, options);

    if (response.ok) {
      const data = await response.json();
      const movie = data.movie_details;

      const formattedData = {
        adult: movie.adult,
        backdropPath: movie.backdrop_path,
        budget: movie.budget,
        genres: movie.genres.map((genre) => ({
          id: genre.id,
          name: genre.name,
        })),
        id: movie.id,
        overview: movie.overview,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        runtime: movie.runtime,
        similarMovies: movie.similar_movies.map((movie) => ({
          backdropPath: movie.backdrop_path,
          id: movie.id,
          overview: movie.overview,
          posterPath: movie.poster_path,
          title: movie.title,
        })),
        spokenLanguages: movie.spoken_languages.map((language) => ({
          englishName: language.english_name,
          id: language.id,
        })),
        title: movie.title,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
      };
      setMovies(formattedData);
      setApiStatus(API_STATUS.SUCCESS);
    } else {
      setApiStatus(API_STATUS.FAILURE);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMovies();
  }, [id]);

  const formatRuntime = () => {
    const runtime = movies?.runtime || 0;
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  const renderLoadingView = () => (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <p>Loading...</p>
      </div>
      <Footer />
    </>
  );

  const renderFailureView = () => (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <div className="text-center">
          <p className="mb-4">Failed to fetch movie details.</p>
          <button
            onClick={fetchMovies}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
      <Footer />
    </>
  );

  if (apiStatus === API_STATUS.IN_PROGRESS) return renderLoadingView();
  if (apiStatus === API_STATUS.FAILURE) return renderFailureView();

  if (!movies) return null; // Just in case

  const adultContent = movies.adult ? "A" : "U/A";
  const releaseYear = movies.releaseDate
    ? movies.releaseDate.split("-")[0]
    : "";

  return (
    <>
      <div className={`relative text-white `}
          style={{
            backgroundImage: `url(${movies.backdropPath})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            minHeight: "100vh",
            width: "100%",
          }}>
        <div className=" bg-opacity-60 min-h-screen pb-6 pl-6 pr-6">
          <Header />
          <div className="mt-6 p-10">
            <div className="text-4xl font-bold">{movies.title}</div>
            <div className="flex flex-wrap gap-4 my-2 text-lg">
              <span>{formatRuntime()}</span>
              <span className="border px-2">{adultContent}</span>
              <span>{releaseYear}</span>
            </div>
            <p
              className={`mt-2 max-w-xl ${
                movies.overview.length > 30 ? "text-sm" : "text-md"
              }`}
            >
              {movies.overview}
            </p>
            <div className="flex gap-4 mt-4">
              <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                Play
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-black text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h2 className="font-bold text-lg mb-2">Genres</h2>
            {movies.genres?.map((genre) => (
              <p key={genre.id} className="text-sm">
                {genre.name}
              </p>
            ))}
          </div>

          <div>
            <h2 className="font-bold text-lg mb-2">Audio Available</h2>
            {movies.spokenLanguages?.map((lang) => (
              <p key={lang.id} className="text-sm">
                {lang.englishName}
              </p>
            ))}
          </div>

          <div>
            <h2 className="font-bold text-lg mb-2">Rating</h2>
            <p>Count: {movies.voteCount}</p>
            <p>Average: {movies.voteAverage}</p>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-2">Budget & Release</h2>
            <p>Budget: ${movies.budget.toLocaleString()}</p>
            <p>Release Date: {movies.releaseDate}</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">More like this</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {(showAllSimilar
              ? movies.similarMovies
              : movies.similarMovies.slice(0, 10)
            ).map((each) => (
              <Link to={`/movie/${each.id}`} key={each.id}>
                <img
                  src={each.backdropPath}
                  alt={each.title}
                  className="rounded-lg hover:scale-105 transition-transform duration-200"
                />
              </Link>
            ))}
          </div>

          {movies.similarMovies.length > 10 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowAllSimilar((prev) => !prev)}
                className="flex items-center gap-2 text-white px-4 py-2"
              >
                {showAllSimilar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-17"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-17"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MoviesPage;
