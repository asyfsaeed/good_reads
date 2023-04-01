import React from 'react'
import "./myBooks.styling.css"
import Navigation from "../../components/Navigation/Navigation"

const MyBooks = () => {
    const [data, setData] = React.useState([]);
    const [sortOpt, setSortOpt] = React.useState("title")
    const [checked, setChecked] = React.useState("asc")


    return (
        <>
        <Navigation></Navigation>
            <div className="cont">
            <h2>My Books</h2>
            <hr className="horizontal_rule" />
            <div className="cont__flex">
                <div className="cont__filter">
                    <p style={{ marginBottom: "10px" }}><b>Bookshelf</b></p>
                    <button value="all" className="filter_btn" onClick={e => { } }>All</button><br />
                    <button value="read" className="filter_btn" onClick={e => { } }>Read</button><br />
                    <button value="currently_reading" className="filter_btn" onClick={e => { } }>Currently Reading</button><br />
                    <button value="want_to_read" className="filter_btn" onClick={e => { } }>Want to Read</button><br />
                    <hr className="horizontal_rule" />
                    <p style={{ marginBottom: "10px" }}><b>Sort</b></p>
                    <div className="cont__sort">
                        <select name="sort" value={sortOpt} onChange={e => { } } style={{ marginBottom: "10px" }}>
                            <option value="title">Title</option>
                            <option value="averageRating">Rating</option>
                            <option value="publishedDate">Published Date</option>
                        </select>
                        <div>
                            <span>
                                <input type="radio" id="asc" name="sort" value="asc" checked={checked === "asc" ? true : false} onChange={e => () => { } } />
                                <label for="asc">Asc</label>
                            </span>
                            <span>
                                <input type="radio" id="asc" name="sort" value="dsc" checked={checked === "dsc" ? true : false} onChange={e => () => { } } />
                                <label for="asc">Dsc</label>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="cont__main">
                    {/* {
        data?.length !== 0 ? data?.map(item =>
            <MyBooksCard {...item} key={item.id}/>
        ): books.length !== 0 ? books[0].map(item =>  <MyBooksCard {...item} key={item.id}/> ): <div></div>
    }   */}
                </div>
            </div>
        </div></>
    )
}

export default MyBooks;
