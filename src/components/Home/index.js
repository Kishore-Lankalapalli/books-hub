import {Component} from 'react'

import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import {
  AiOutlineGoogle,
  AiOutlineTwitter,
  AiFillInstagram,
  AiFillYoutube,
} from 'react-icons/ai'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

class Home extends Component {
  state = {
    ratedBooksList: [],
  }

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    const topRatedBookUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(topRatedBookUrl, options)

    console.log(response)

    const data = await response.json()

    const topRatedBooksList = data.books.map(item => ({
      id: item.id,
      authorName: item.author_name,
      coverPic: item.cover_pic,
      title: item.title,
    }))

    this.setState({ratedBooksList: topRatedBooksList})
  }

  render() {
    const {ratedBooksList} = this.state

    console.log(ratedBooksList)
    const settings = {
      dots: false,
      infinite: false,
      autoplay: true,
      slidesToScroll: 1,
      slidesToShow: 3,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 786,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="favourite-description-container">
            <h1 className="favourite-books-description-heading">
              Find Your Next Favourite Books?
            </h1>
            <p className="favourite-books-description-text">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <Link to="/shelf">
              <button className="find-books-button">Find Books</button>
            </Link>
          </div>
          <div className="top-rated-books-container">
            <div className="top-rated-books-heading-container">
              <h1 className="top-rated-books-heading">Top Rated Books</h1>
              <Link to="/shelf">
                <button className="find-jobs-large-device-button">
                  Find Jobs
                </button>
              </Link>
            </div>
            <div className="top-rated-books-list-container">
              <Slider {...settings}>
                {ratedBooksList.map(item => (
                  <div className="top-rated-book-item">
                    <img src={item.coverPic} className="cover-pic-image" />

                    <h1 className="top-rated-book-title">{item.title}</h1>
                    <p className="top-rated-book-author-text">
                      {item.authorName}
                    </p>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="footer-section-container">
              <div className="icons-container">
                <AiOutlineGoogle className="account-icon" />
                <AiOutlineTwitter className="account-icon" />
                <AiFillInstagram className="account-icon" />
                <AiFillYoutube className="account-icon" />
              </div>
              <p className="contact-us-text">contact us</p>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
