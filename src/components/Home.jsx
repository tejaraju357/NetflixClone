import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Cookies from 'js-cookie';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from './Footer';
import BeatLoader from 'react-spinners/BeatLoader';

const API_STATUS = {
  INITIAL: 'INITIAL',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  IN_PROGRESS: 'IN_PROGRESS',
};

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow next-arrow flex items-center justify-center text-white text-4xl sm:text-5xl md:text-6xl w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 md:right-6 xl:right-[-80px] z-10 cursor-pointer" onClick={onClick}>❯</div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev-arrow flex items-center justify-center text-white text-4xl sm:text-5xl md:text-6xl w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 md:left-6 xl:left-[-80px] z-10 cursor-pointer" onClick={onClick}>❮</div>
);

function Home() {
  const [originalMovies, setOriginalMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [originalStatus, setOriginalStatus] = useState(API_STATUS.INITIAL);
  const [trendingStatus, setTrendingStatus] = useState(API_STATUS.INITIAL);

const fetchOriginalMoviesData = async () => {
  try {
    setOriginalStatus(API_STATUS.IN_PROGRESS);
    const jwt_token = Cookies.get("jwt_token");
    const url = "https://apis.ccbp.in/movies-app/originals";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt_token}`
      },
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      const formatedData = data.results.map((each) => ({
        backDropPath: each.backdrop_path,
        id: each.id,
        overView: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }));
      setOriginalMovies(formatedData);
      setOriginalStatus(API_STATUS.SUCCESS);
    } else {
      setOriginalStatus(API_STATUS.FAILURE);
    }
  } catch (error) {
    console.error("Error fetching originals:", error);
    setOriginalStatus(API_STATUS.FAILURE);
  }
};


const fetchTrendingMoviesData = async () => {
  try {
    setTrendingStatus(API_STATUS.IN_PROGRESS);
    const jwt_token = Cookies.get("jwt_token");
    const url = "https://apis.ccbp.in/movies-app/trending-movies";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt_token}`
      },
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      const formatedData = data.results.map((each) => ({
        backDropPath: each.backdrop_path,
        id: each.id,
        overView: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }));
      setTrendingMovies(formatedData);
      setTrendingStatus(API_STATUS.SUCCESS);
    } else {
      setTrendingStatus(API_STATUS.FAILURE);
    }
  } catch (error) {
    console.error("Error fetching originals:", error);
    setTrendingStatus(API_STATUS.FAILURE);
  }
};

  useEffect(() => {
    fetchTrendingMoviesData();
    fetchOriginalMoviesData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  const renderCarousel = (movies, status, retryFunction) => {
    if (status === API_STATUS.IN_PROGRESS) {
      return (
        <div className="text-center py-10">
          <BeatLoader color="#ffffff" />
        </div>
      );
    }
    if (status === API_STATUS.FAILURE) {
      return (
        <div className="text-center text-white py-6">
          <img src="https://res.cloudinary.com/deukqrxtt/image/upload/v1752143885/alert-triangle_odwbnt.png" alt="failure view" className="w-20 mx-auto mb-4 bg-black text-red" />
          <p>Something went wrong. Please try again.</p>
          <button onClick={retryFunction} className="mt-2 px-4 py-2 bg-white text-black rounded">Try Again</button>
        </div>
      );
    }
    if (status === API_STATUS.SUCCESS) {
      return (
        <Slider {...settings}>
          {movies.map((each) => (
            <div key={each.id} className="px-2">
              <Link to={`/movie/${each.id}`}>
                <img
                  src={each.backDropPath}
                  alt={each.title}
                  className="h-[200px] sm:h-[250px] md:h-[300px] w-full max-w-[500px] object-contain rounded-md bg-black mx-auto"
                />
              </Link>
            </div>
          ))}
        </Slider>
      );
    }
    return null;
  };

  return (
    <>
      {/* Hero Banner */}
      <div className="relative w-full h-[500px] sm:h-[400px] md:h-[650px] bg-cover bg-center bg-[url('https://res.cloudinary.com/deukqrxtt/image/upload/v1751688108/418e5ab72e7c52e74cd14b44129a625a520a8448_em8th2.jpg')]">
        <div className="absolute top-0 left-0 w-full z-20">
          <Header />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:px-16 text-white bg-black/40 z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">Super Man</h1>
          <p className="text-sm sm:text-base md:text-lg max-w-xl mb-4">
            Superman is a fictional superhero who first appeared in American comic books published by DC Comics.
          </p>
          <button className="bg-white text-black font-semibold px-5 py-2 rounded w-fit">Play</button>
        </div>
      </div>

      {/* Movie Carousels */}
      <div className="bg-black py-10 px-2 sm:px-4 md:px-8">
        <div className="w-full max-w-7xl mx-auto mb-10">
          <h2 className="text-white text-xl sm:text-2xl font-semibold mb-4">Trending Now</h2>
          {renderCarousel(trendingMovies, trendingStatus, fetchTrendingMoviesData)}
        </div>

        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-white text-xl sm:text-2xl font-semibold mb-4">Originals</h2>
          {renderCarousel(originalMovies, originalStatus, fetchOriginalMoviesData)}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
