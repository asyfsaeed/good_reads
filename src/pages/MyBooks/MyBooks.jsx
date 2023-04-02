import React, {useState, useEffect, useContext} from 'react';
import "./myBooks.styling.css";
import {Navigation} from "../../components/Navigation/Navigation";
import { useLazyQuery } from '@apollo/client';
import { GET_BOOKS_BY_COLLECTIONS } from '../../graphql/queries';
import { UserContext } from "../../store/userStorage";
import { MyBooksCard } from "../../components/MyBooksCard/MyBooksCard";
import { ADD_BOOK_RATING } from '../../graphql/mutations';
import { useMutation } from '@apollo/client';

const MyBooks = () => {

    const {
        data,
    } = useContext(UserContext);

    const [books, setBooks] = useState([]);
    const [sortOpt, setSortOpt] = useState("title");
    const [checked, setChecked] = useState("asc");
    const [allCount, setAllCount] = useState(0);
    const [readCount, setReadCount] = useState(0);
    const [readingCount, setReadingCount] = useState(0);
    const [wantToReadCount, setWantToReadCount] = useState(0);

    const [updateRatingOrFinished] = useMutation(ADD_BOOK_RATING, {
        context: {
            headers: {
              authorization: `${
                data.userData.token
              }`,
            },
        },
        onCompleted: (res) => {
            getBooksByCollectionResults({ variables: { collection: collectionState === 'all' ? '' : collectionState, sort: sortOpt, sort_by: checked === 'DSC' ? 'DESC': checked.toUpperCase() } });
        },
        onError: (err) => {
          console.log('Issue with Updating collection', err.message);
        },
    });


    const updateRatingFinished = (type, val, book_id) => {
        if(type && val) 
            updateRatingOrFinished({ variables: {book_id: book_id, rating: type === 1 ? val: '', finished: type === 2 ? val.toString() : ''} });
    }

    const [collectionState, setCollectionState] = useState('all');
    
    const [getBooksByCollectionResults] = useLazyQuery(GET_BOOKS_BY_COLLECTIONS, {
        context: {
            headers: {
              authorization: `${
                data.userData.token
              }`,
            },
        },
        onCompleted: (res) => {
            setBooks(res?.bookByCollection?.books || []);
            setAllCount(res?.bookByCollection?.all_count || 0);
            setReadCount(res?.bookByCollection?.read_count || 0);
            setReadingCount(res?.bookByCollection?.reading_count || 0);
            setWantToReadCount(res?.bookByCollection?.want_to_read_count || 0);
        },
        onError: (err) => {
          console.log('Error while fetching books', err.message);
        },
    });

    useEffect(() => {
        setBooks([]);
        getBooksByCollectionResults({ variables: { collection: '', sort: 'title', sort_by: 'ASC' } });
    }, []);

    const handleChange = (value) => {
        setCollectionState(value);
        getBooksByCollectionResults({ variables: { collection: value === 'all' ? '': value, sort: 'title', sort_by: 'ASC' } });
    }

    
    const handleSort = (value) => {
       setSortOpt(value);

       getBooksByCollectionResults({ variables: { collection: collectionState === 'all' ? '' : collectionState, sort: value, sort_by: checked === 'DSC' ? 'DESC': checked.toUpperCase() } });
    }

    const handleSortDetail = (value) => {
        setChecked(value);
        console.log(value);
        getBooksByCollectionResults({ variables: { collection: collectionState === 'all' ? '' : collectionState, sort: sortOpt, sort_by: value === 'dsc' ? 'DESC': value.toUpperCase() } });
    }
    
    return (
        <>
        <Navigation></Navigation>
            <div className="cont">
            <h2>View Books</h2>
            <hr className="horizontal_rule" />
            <div className="cont__flex">
                <div className="cont__filter">
                    <p style={{ marginBottom: "10px" }}><b>Bookshelf</b></p>
                    <button value="all" className="filter_btn" ><span onClick={e => handleChange('all')} style={{fontWeight: collectionState === 'all' ? 'bold': ''}}>All {allCount ? `(${allCount})`: ''}</span></button><br />
                    <button value="read" className="filter_btn" onClick={e => handleChange('READ')}><span style={{fontWeight: collectionState === 'read' ? 'bold': ''}}>Read {readCount ? `(${readCount})`: ''}</span></button><br />
                    <button value="reading" className="filter_btn" onClick={e => handleChange('READING')}><span style={{fontWeight: collectionState === 'reading' ? 'bold': ''}}>Reading {readingCount ? `(${readingCount})`: ''}</span></button><br />
                    <button value="want_to_read" className="filter_btn" onClick={e => handleChange('WANT_TO_READ')}><span style={{fontWeight: collectionState === 'want_to_read' ? 'bold': ''}}>Want to Read {wantToReadCount ? `(${wantToReadCount})`: ''}</span></button><br />
                    <hr className="horizontal_rule" />
                    <p style={{ marginBottom: "10px" }}><b>Sort</b></p>
                    <div className="cont__sort">
                        <select name="sort" value={sortOpt} onChange={e => handleSort(e.target.value)} style={{ marginBottom: "10px" }}>
                            <option value="title">Title</option>
                            <option value="date">Published Date</option>
                        </select>
                        <div>
                            <span>
                                <input type="radio" id="asc" name="sort" value="asc" checked={checked === "asc" ? true : false} onChange={e => handleSortDetail(e.target.value)} />
                                <label for="asc">ASC</label>
                            </span>
                            <span>
                                <input type="radio" id="asc" name="sort" value="dsc" checked={checked === "dsc" ? true : false} onChange={e => handleSortDetail(e.target.value)} />
                                <label for="asc">DESC</label>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="cont__main">
                    {
                        books?.length !== 0 ? books?.map(item =>
                            <MyBooksCard dataProp={item} updateRatingFinished={updateRatingFinished} key={item.id}/>
                        ): books.length !== 0 ? books[0].map(item =>  <MyBooksCard dataProp={item}  updateRatingFinished={updateRatingFinished} key={item.id}/> ): <div></div>
                    }  
                </div>
            </div>
        </div></>
    )
}

export default MyBooks;
