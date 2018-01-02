import React from "react";
import BookOptions from "../../containers/BookOptions";

const Book = props => (
  <li>
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${props.book.imageLinks.thumbnail}")`
          }}
        />
        <BookOptions book={props.book} />
      </div>
      <div className="book-title">{props.book.title}</div>
      {props.book.authors &&
        props.book.authors.map((author, i) => (
          <div key={i} className="book-authors">
            {author}
          </div>
        ))}
    </div>
  </li>
);

export default Book;
