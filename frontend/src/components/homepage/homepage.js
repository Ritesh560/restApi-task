import React, { useState, useEffect } from "react"
import axios from "axios"
import "./homepage.css"

const Homepage = () => {
  const [response, setResponse] = useState([])

  //fetching the data from server
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=c39bf8b47376418c84fa87f6c6deae72")
      setResponse(res.data.articles)
    }

    fetchEvents()
  }, [])

  return (
    <div>
      <DisplayNews response={response} />
    </div>
  )
}

function DisplayNews(response) {
  return (
    <div>
      {response.response.map((news, i) => {
        return (
          <div key={i}>
            <h2>{news.title}</h2>
            <br />
          </div>
        )
      })}
    </div>
  )
}

export default Homepage
