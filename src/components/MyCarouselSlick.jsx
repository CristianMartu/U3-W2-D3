import { useEffect, useState } from 'react'
import { Alert, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import MySpinner from './MySpinner'

const URL = 'http://www.omdbapi.com/?apiKey=956e8978&s='
const MyCarouselSlick = (props) => {
  const [search, setSearch] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSearch = (films, list) => {
    fetch(URL + films)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          if (response.status === 400) {
            throw new Error('400 Bad Request')
          }
          if (response.status === 401) {
            throw new Error('401 Unauthorized')
          }
          if (response.status === 403) {
            throw new Error('403 Forbidden')
          }
          if (response.status === 404) {
            throw new Error('404 Not Found')
          }
          throw new Error('Generic error')
        }
      })
      .then((data) => {
        const search = data.Search
        if (!search) {
          setError(true)
          setErrorMsg('No results found')
        }

        list.push(search)
        setSearch(list)
      })
      .catch((err) => {
        console.log(err)
        setError(true)
        setErrorMsg(err.name + ' ' + err.message)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const listImg = []
    for (let i = 1; i <= props.page; i++) {
      handleSearch(props.filmName + `&page=${i}&type=${props.type}`, listImg)
    }
  }, [])

  const settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 485,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
  }

  return !loading ? (
    <Slider {...settings} style={{ height: '360px' }}>
      {search.map((item) => {
        return error === true ? (
          <Alert variant="danger">{errorMsg}</Alert>
        ) : (
          item.map((film) => {
            return film.Poster !== 'N/A' ? (
              <Link to={`/movie-details/${film.imdbID}`} key={`film-${film.imdbID}`}>
                <Image
                  className="d-inline"
                  src={film.Poster}
                  alt="movie picture"
                  style={{ height: '320px', width: '200px' }}
                />
              </Link>
            ) : (
              <Link
                to={`/movie-details/${film.imdbID}`}
                className="text-center text-white mt-5 mx-0"
                key={`film-${film.imdbID}`}
              >
                <p>{film.Title}</p>
                <p>{film.Year}</p>
              </Link>
            )
          })
        )
      })}
    </Slider>
  ) : (
    <MySpinner />
  )
}

export default MyCarouselSlick
