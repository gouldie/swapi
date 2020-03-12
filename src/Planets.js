import React from 'react'
import { NavLink } from 'react-router-dom'

export default () => (
  <div>
    <h1>Planets</h1>
    <ul>
      {
        ['tatooine', 'alderaan', 'yavin'].map((p, i) => (
          <li key={i}>
            <NavLink to={`/planet/${p}`}>{p}</NavLink>
          </li>
        ))
      }
    </ul>
  </div>
)