import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
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
    <div className="news-container">
      {response.response.map((news, i) => {
        return (
          <div key={i} className="news-module">
            <a href={news.url} rel="noreferrer" target="_blank">
              <img alt="NEWS" src={news.urlToImage ? news.urlToImage : "https://st.depositphotos.com/1006899/3776/i/950/depositphotos_37765339-stock-photo-news.jpg"} className="news-img" />
            </a>

            <p className="title">{news.title}</p>
            <p className="content">{news.content} </p>
            <br />
          </div>
        )
      })}
    </div>
  )
}

export default Homepage
