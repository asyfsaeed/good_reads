import React, {useState, useEffect, useContext} from 'react';
import styles from './search.module.css';
import {FaSearch} from 'react-icons/fa';
import { SearchResultCard } from '../SearchResultCard/SearchResultCard';
import { useLazyQuery } from '@apollo/client';
import { GET_BOOKS_SEARCH } from '../../graphql/queries';
import { UserContext } from "../../store/userStorage";

const Search = () => {

    const {
        data,
    } = useContext(UserContext);

    const [query, setQuery] = React.useState("");
    const [searchResults, setSearchResults] = useState([]);
    
    const handleQuery = (e) => {
        const {value} = e.target;
        setQuery(value)
    }

    const handleResultsPage = () => {
        setQuery("");
    }

    const [getSearchResults] = useLazyQuery(GET_BOOKS_SEARCH, {
        context: {
            headers: {
              authorization: `${
                data.userData.token
              }`,
            },
        },
        onCompleted: (res) => {
            setSearchResults(res?.searchBooks || []);
        },
        onError: (err) => {
          console.log('Error while fetching books', err.message);
        },
      });

    useEffect( () => {
        if(query.length % 2 === 0) {
            getSearchResults({ variables: {search: query} });
        }
    }, [query]); 

    return (
        <div className = {styles.container}>
            <span className = {styles.inputLabel}>
                <input
                    type = "text"
                    value = {query}
                    onChange = {(e) => handleQuery(e)}
                    placeholder = "Search books"
                ></input>
                <FaSearch className = {styles.icon}/>
            </span>
            {
                query === "" 
                ? null
                : searchResults.length === 0
                ? <div className = {styles.results}>
                    <h5>No search results</h5>
                </div>
                : <div className = {styles.results}>
                    {
                        searchResults?.map((item, i) => {
                            console.log(1, item);
                            const {title, id, cover_image, author} = item
                            const src = cover_image === undefined ? "https://via.placeholder.com/60x55.png?text=No+image" : cover_image
                            if(i < 5){
                                return(
                                    <SearchResultCard
                                        key = {item.id}
                                        id = {item.id}
                                        src = {src}
                                        title = {title}
                                        authors = {author}
                                        handleQuery = {setQuery}
                                    ></SearchResultCard>
                                )
                            }
                            else{
                                return null
                            }
                        })
                    }
                    <div 
                        className = {styles.bottom}
                        onClick = {handleResultsPage}
                    >
                        See all results for "{query}"
                    </div>
                </div>
            }
        </div>
    )
}

export {Search}
