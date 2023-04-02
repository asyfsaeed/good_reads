import React from 'react'
import styles from "./post.module.css"
import Rating from '@mui/material/Rating';
import {v4 as uuid} from "uuid"
import ReactReadMoreReadLess from "react-read-more-read-less";


const Post = (props) => {
    const { id, collection, finished, rating, book, user} = props;
    const {author:authors, title, description = '', cover_image, date} = book;
    const { name } = user;

    const currUserProfile = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTasBNP1Wz6ilTqpSe5av3iyqJhSqp44fkKeg&usqp=CAU"
    const currentUser = name;

    const ref = React.useRef()

    const handleFocus = () => {
        ref.current.focus()
    }

    let thumbnail = cover_image ? cover_image : 'https://via.placeholder.com/140x200';

    return (
        <div className={styles.post}>
            <div className={styles.post_profile}>
                <img src={thumbnail}/>
            </div>
            <div className={styles.post__cont}>
                <div className={styles.post__top}>
                    <p className={styles.name_action}><b>{name}</b>{
                        ` has marked the book finished`
                    }</p>
                    {
                        rating !== "" && 
                        <>
                        <p>Rating:</p>
                        <Rating name="read-only" value={rating} readOnly />
                        </>
                    }
                    <p className={styles.time_stamp}>Just Now</p>
                </div>
                <div className={styles.post__main}>
                    <div>
                        <img src={thumbnail}/>
                    </div>
                    <div className={styles.main__content}>
                        <h3 style={{marginBottom:"10px"}}>{title}</h3>
                        <p>by {authors[0]}</p>
                        {/* <ReadButton/> */}
                        <ReactReadMoreReadLess
                            charLimit={200}
                            readMoreText={"more"}
                            readLessText={"(less)"}
                            readMoreClassName="read-more-less--more"
                            readLessClassName="read-more-less--less"
                        >
                            {description}
                        </ReactReadMoreReadLess>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;
