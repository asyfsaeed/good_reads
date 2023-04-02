import React, {useEffect} from 'react'
import styles from "./my-books-card.module.css"
import Rating from '@mui/material/Rating';
import {ReadButton} from "../../components/ReadButton/ReadButton";
import ReactReadMoreReadLess from "react-read-more-read-less";
import Button from '@mui/material/Button';

const MyBooksCard = ({dataProp, updateRatingFinished}) => {
    let thumbnail = dataProp?.cover_image ?  dataProp?.cover_image : 'https://via.placeholder.com/140x200;'
    const {title = '', author: authors = '', description = '', rating: averageRating, date, id , finished} = dataProp;

    const [rating, setRating] = React.useState(averageRating);

    useEffect(() => {
        updateRatingFinished(1, rating, id);
    }, [rating]);

    return (
        <div className={styles.card__cont}>
            <img width={200} height={300} src={thumbnail} alt=""/>
            <div className={styles.img__popup}>
                <h4><b>{title}</b></h4>
                <h4 className={styles.author_name}>by {authors}</h4>
                <Rating
                    name="read-only"
                    value={rating}
                    onChange={(e) => {
                        setRating(e.target.value);
                    }}
                />
                <p className={styles.rating_text}>{averageRating} avg rating -- Published {date?.slice(0, 4)}</p>
                <p>
                    <ReactReadMoreReadLess
                        charLimit={200}
                        readMoreText={"more"}
                        readLessText={"(less)"}
                        readMoreClassName="read-more-less--more"
                        readLessClassName="read-more-less--less"
                    >
                        {description!== undefined ? description : "No Description"}
                    </ReactReadMoreReadLess>
                </p>
                <ReadButton selectedBook={dataProp}/>
                <div className = {styles.button} style={{ opacity: finished ? 0.5 : 1}}>
                    <Button 
                        disabled={finished}
                    
                        aria-controls="simple-menu" 
                        aria-haspopup="true" 
                        onClick={() => { updateRatingFinished(2, true, id);}}
                        className = {styles.buttonText}
                    >
                    {
                        "Finished"
                    }
                    </Button>
                </div>
            </div>
        </div>
    )
}

export {MyBooksCard}
