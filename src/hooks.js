import React, { useState, useEffect } from 'react'
import fetch from "isomorphic-fetch"

export const useHttp = (url, dependencies) => {
  const [ data, setData ] = useState(null)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(res => setData(res))
  }, dependencies)

  return [data]
}