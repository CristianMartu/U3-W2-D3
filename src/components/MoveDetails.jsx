import { useEffect, useState } from 'react'
import { Container, Image, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const URL = 'http://www.omdbapi.com/?apikey=956e8978&i='
const MoveDetails = () => {
  const params = useParams()

  const [film, setfilm] = useState(null)

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
      <Image src={film.Poster} alt="movie picture" />
      <h1>{film.Title}</h1>
      <p>{film.Year}</p>
      <p>{film.Plot}</p>
    </Container>
  ) : (
    <Spinner variant="primary" animation="border" role="status" aria-hidden="true">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}
export default MoveDetails
