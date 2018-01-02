import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Bookshelf from "../components/book/BookShelf";
import * as BooksAPI from "../api/BooksAPI";
import * as bookShelfActions from "../actions/bookShelfActions";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.getBookShelf();
  }

  getBookShelf() {
    // const history = createBrowserHistory();
    const dispatch = this.props.dispatch;
    // history.push(`/search?query=${query}`);
    dispatch(bookShelfActions.requestBookshelf());
    BooksAPI.getAll()
      .then(bookShelf => {
        bookShelf.error
          ? dispatch(bookShelfActions.failedBookshelf())
          : dispatch(bookShelfActions.receiveBookshelf(bookShelf));
      })
      .catch(e => {
        dispatch(bookShelfActions.failedBookshelf());
      });
  }
  render() {
    console.log(this.props);
    return <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            {this.props.shelfs.map(shelf => (
              <Bookshelf
                key={shelf.name}
                shelfTitle={shelf.title}
                books={shelf.books}
              />
            ))}
            {/* {this.props.shelfs.currentlyReading && <Bookshelf shelfTitle="Currently Reading" books={this.props.shelfs.currentlyReading} />}
            {this.props.shelfs.read && <Bookshelf shelfTitle="Readed" books={this.props.shelfs.read} />}
            {this.props.shelfs.wantToRead && <Bookshelf shelfTitle="What to Read" books={this.props.shelfs.wantToRead} />} */}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            Add a book
          </Link>
        </div>
      </div>;
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.bookShelf.isFetching,
    shelfs: state.bookShelf.shelfs
  };
};

Home.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  shelfs: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Home);
