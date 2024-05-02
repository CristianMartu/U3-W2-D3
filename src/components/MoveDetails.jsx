import { useEffect, useState } from 'react'
import { Button, Collapse, Container, Image, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const URL = 'http://www.omdbapi.com/?apikey=956e8978&i='
const MoveDetails = () => {
  const params = useParams()

  const [film, setfilm] = useState(null)
  const [open, setOpen] = useState(false)

  const handleFilm = async (id) => {
    try {
      const resp = await fetch(URL + id)
      if (resp.ok) {
        const result = await resp.json()
        setfilm(result)
      } else {
        if (resp.status === 400) {
          throw new Error('400 Bad Request')
        }
        if (resp.status === 401) {
          throw new Error('401 Unauthorized')
        }
        if (resp.status === 403) {
          throw new Error('403 Forbidden')
        }
        if (resp.status === 404) {
          throw new Error('404 Not Found')
        }
        throw new Error('Generic error')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleFilm(params.movieId)
  }, [])

  return film ? (
    <Container className="text-white">
      <div className="d-flex">
        <Image src={film.Poster} alt="movie picture" />
        <div className="mx-4">
          <h1 className="">
            {film.Title} <span className="text-success fs-6 fw-light">{film.Rated}</span>
          </h1>

          <div className="d-flex justify-content-between w-50">
            <p>
              {film.Year}
              <span className="ms-3 fs-6 fst-italic">{film.Genre}</span>
            </p>
            <p>
              <span className="me-2">{film.Type}</span>
              {film.Runtime}
            </p>
          </div>
          <p className="fs-5 fw-light">Plot: {film.Plot}</p>
          <h3>Awards</h3>
          <p className="fs-5 fw-light">{film.Awards}</p>
        </div>
      </div>
      <div>
        <h3 className="text-center my-3">Ratings</h3>
        <div className="d-flex justify-content-between w-75 mx-auto">
          {film.Ratings.map((rate) => (
            <div>
              <h5>{rate.Source}</h5>
              <p className="fs-6 fw-light">{rate.Value}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            variant="danger"
            className="mt-2"
          >
            More Info
          </Button>
          <Collapse in={open}>
            <div id="example-collapse-text">
              <p className="fs-5 mt-4">
                Released:<span className="fw-light fst-italic"> {film.Released}</span>
              </p>
              <p className="fs-5">
                Director:<span className="fw-light fst-italic"> {film.Director}</span>
              </p>
              <p className="fs-5">
                Writer:<span className="fw-light fst-italic"> {film.Writer}</span>
              </p>
              <p className="fs-5">
                Actors: <span>{film.Actors}</span>
              </p>
              <p className="fs-5">
                Metascore: <span className="fw-light fst-italic"> {film.Metascore}</span>
              </p>
              <p className="fs-5">
                imdbRating:<span className="fw-light fst-italic"> {film.imdbRating}</span>
              </p>
              <p className="fs-5">
                imdbVotes: <span>{film.imdbVotes}</span>
              </p>
              <p className="fs-5">
                Language:<span className="fw-light fst-italic"> {film.Language}</span>
              </p>
              <p className="fs-5">
                BoxOffice: <span className="fw-light fst-italic"> {film.BoxOffice}</span>
              </p>
              <p className="fs-5">
                Production:<span className="fw-light fst-italic"> {film.Production}</span>
              </p>
            </div>
          </Collapse>
        </div>
      </div>
    </Container>
  ) : (
    <div className="d-flex justify-content-center">
      <Spinner variant="secondary" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}
export default MoveDetails
