import path from 'path'
import fs from 'fs'
import React from 'react'
import express from 'express'
import ReactDOMServer from 'react-dom/server'
import App from './App'
import https from 'https'
import axios from 'axios'
import { StaticRouter } from 'react-router-dom'

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.static('./dist'));
app.use(express.json({limit: '100mb', type: 'application/json'}))

const stubMapper = {
  'tatooine': '1',
  'alderaan': '2',
  'yavin': '3'
}

app.get('/planets/:stub', (req, res) => {
  const stub = req.params.stub

  if (!['tatooine', 'alderaan', 'yavin'].includes(stub)) return res.sendStatus(404)

  axios.get(`https://swapi.co/api/planets/${stubMapper[stub]}/`)
    .then(res2 => {
      const films = res2.data.films

      axios.all(films.map(e => axios.get(e)))
        .then(res3 => {
          const data = res3.map(e => e.data)

          return res.json({
            "Climate": res2.data.climate,
            "Population": Number(res2.data.population),
            "Films": data.sort((a, b) => {
              const dateA = new Date(a.release_date)
              const dateB = new Date(b.release_date)

              return dateA < dateB ? 1 : -1
            }).map(e => ({
              "Title": e.title,
              "Director": e.director,
              "ReleaseDate": new Date(e.release_date)
            }))
          })
        })
  })
})

app.get('/*', (req, res) => {
  const context = {}
  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}><App /></StaticRouter>
  )

  res.writeHead( 200, { "Content-Type": "text/html" } );
  res.end(htmlTemplate(app));
})

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`)
})

function htmlTemplate(app) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
          <div id="app">${ app }</div>
          <script src="/app.bundle.js"></script>
      </body>
    </html>
  `;
}