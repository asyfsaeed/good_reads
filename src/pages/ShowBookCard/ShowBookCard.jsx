import React, {useState, useEffect, useContext} from 'react';
import styles from './show-book-card.module.css';
import { useParams } from 'react-router-dom';
import {GoGraph} from 'react-icons/go'
import StarRatings from 'react-star-ratings';
import { useLazyQuery } from '@apollo/client';
import { UserContext } from "../../store/userStorage";
import { ReadButton } from '../../components/ReadButton/ReadButton';
import { GET_BOOK_BY_ID } from '../../graphql/queries';
import {Navigation} from "../../components/Navigation/Navigation"
import { useMutation } from '@apollo/client';
import { UPDATE_BOOK_COLLECTION } from '../../graphql/mutations';

const ShowBookCard = () => {
    const {bookId} = useParams();

    const {
        data,
    } = useContext(UserContext);

    const [selectedBook, setSelectedBook] = useState(null);

    const updateCollection = (id, collection) => {
        updateBookCollection({ variables: {book_id: id, collection} });
    }

    const [getBookById] = useLazyQuery(GET_BOOK_BY_ID, {
        context: {
            headers: {
              authorization: `${
                data.userData.token
              }`,
            },
        },
        onCompleted: (res) => {
            setSelectedBook(res?.book);
        },
        onError: (err) => {
          console.log('Error while fetching books', err.message);
        },
      });

    useEffect( () => {
        if(bookId) {
            getBookById({ variables: {id: bookId} });
        }
    }, []); 

    const [updateBookCollection] = useMutation(UPDATE_BOOK_COLLECTION, {
        context: {
            headers: {
              authorization: `${
                data.userData.token
              }`,
            },
        },
        onCompleted: (res) => {
            setSelectedBook(res?.updateCollection);
        },
        onError: (err) => {
          console.log('Issue with Updating collection', err.message);
        },
    });


    if(selectedBook !== null){
        const volumeInfo = selectedBook;
   
        const {title = '', author = '', date = '', pageCount = 100, rating = 0, cover_image, collection} = volumeInfo;
        const src = cover_image === undefined ? "https://via.placeholder.com/150x220.png?text=No+image" : cover_image

        return (
            <div><Navigation></Navigation><div className={styles.container}>
                <div className={styles.left}>
                    <img src={src} alt="img"></img>
                    <ReadButton selectedBook = {selectedBook} updateCollection={updateCollection}></ReadButton>
                </div>
                <div className={styles.right}>
                    <h2>{title}</h2>
                    <strong>by {author}</strong>
                    <div className={styles.rating}>
                        <StarRatings
                            rating={rating || 0}
                            starDimension="14px"
                            starSpacing="1px"
                            starRatedColor="#FA604A" />
                        {` ${rating || 0}`} ▪ <GoGraph className={styles.icon}></GoGraph>
                    </div>
        
                    <div className={styles.moreDetails}>
                        <div>{pageCount} pages</div>
                        <div>{`Published ${date}`}</div>
                    </div>
                </div>
            </div></div>
        )
    }
    return null
}

export {ShowBookCard}
