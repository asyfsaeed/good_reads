import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './search-result-card.module.css';

const SearchResultCard = ({src, title, authors, id, handleQuery}) => {
    const navigate = useNavigate();

    const handlePage = () => {
        navigate(`/book/show/${id}`)
        handleQuery("")
    }
    
    return (
        <div 
            className = {styles.card}
            onClick = {handlePage}
        >
            <div className = {styles.left}>
                <img width="50" src = {src} alt = "img"></img>
            </div>
            <div className = {styles.right}>
                <h5>{title}</h5>
                <div>
                    by {authors}
                </div>
            </div>
        </div>
    )
}

export {SearchResultCard}
