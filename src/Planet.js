import React from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from './hooks'

export default () => {
  let { planet } = useParams()

  if (!['tatooine', 'alderaan', 'yavin'].includes(planet)) {
    // should return 404 with link back to planets
    return null
  }

  const [data] = useHttp(`/planets/${planet}`, [])

  if (!data) {
    return <p data-testid='loading'>Loading..</p>
  }

  return (
    <div data-testid='planet'>
      <div>
        <p>Name: {planet}</p>
        <p>Population: {data.Population}</p>
        <p>Climate: {data.Climate}</p>
        <br />
        <p>Films:</p>
        {
          data.Films.map((film, i) => (
            <div key={i} style={{ marginBottom: '30px' }}>
              <p>Title: {film.Title}</p>
              <p>Director: {film.Director}</p>
              <p>Release Date: {new Date(film.ReleaseDate).toDateString()}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}