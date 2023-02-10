import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Bookshelves extends Component {
  state = {
    bookShelvesData: [],
    bookShelfName: bookshelvesList[0].value,
  }

  componentDidMount() {
    this.getBookshelvesBooksDetails()
  }

  getBookshelvesBooksDetails = async () => {
    const {bookShelfName} = this.state
    console.log(bookShelfName)
    const bookshelfUrl = `https://apis.ccbp.in/book-hub/books?shelf=${bookShelfName}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(bookshelfUrl, options)

    const data = await response.json()

    const booksData = data.books.map(item => ({
      id: item.id,
      authorName: item.author_name,
      coverPic: item.cover_pic,
      rating: item.rating,
      readStatus: item.read_status,
      title: item.title,
    }))

    this.setState({bookShelvesData: booksData})

    console.log(booksData)
  }

  onSwitchTab = label => {
    this.setState({bookShelfName: label}, this.getBookshelvesBooksDetails)
  }

  render() {
    const {bookShelvesData, bookShelfName} = this.state
    return (
      <>
        <Header />
        <div className="bookshelves-container">
          <div className="search-input-container">
            <input
              placeholder="Search"
              type="search"
              className="search-input"
            />
            <button className="search-button">
              <AiOutlineSearch />
            </button>
          </div>
          <h1 className="bookshleves-heading">Bookshelves</h1>
          <ul className="tabs-list-container">
            {bookshelvesList.map(tab => {
              const {id, label, value} = tab

              const onChangeShelf = () => {
                this.onSwitchTab(value)
              }

              return (
                <li key={label}>
                  <button
                    onClick={onChangeShelf}
                    className={
                      bookShelfName === value
                        ? 'tab-button active-tab-button'
                        : 'tab-button'
                    }
                  >
                    {label}
                  </button>
                </li>
              )
            })}
          </ul>
          <ul className="book-shelves-list-container">
            {bookShelvesData.map(item => (
              <li className="book-shelve-item-container">
                <img src={item.coverPic} className="book-shelve-book-image" />
                <div className="book-shelve-book-details-container">
                  <h1 className="bookshelf-book-title">{item.title}</h1>
                  <p className="bookshelf-book-author">{item.authorName}</p>
                  <div className="rating-container">
                    <p className="avg-rating-text">Avg Rating</p>
                    <BsFillStarFill className="rating-star-icon" />
                    <p className="avg-rating-text">{item.rating}</p>
                  </div>
                  <p className="read-status-text">
                    Status:
                    <span className="status-text">{item.readStatus}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default Bookshelves
