import React, {useState, useContext, useEffect} from 'react'
import Post from '../../pages/Post/Post';
import styles from "./home.module.css"
import { Link } from 'react-router-dom';
import {Navigation} from "../../components/Navigation/Navigation";
import { useSubscription } from '@apollo/client';
import { POST_SUBSCRIPTION } from '../../graphql/queries';
import { UserContext } from "../../store/userStorage";

const Home = () => {

    const {
        data,
    } = useContext(UserContext);

    const [wantToReadData, setWantToReadData] = React.useState([]);
    const [currentlyReadingData, setCurrentlyReadingData] = React.useState([]);
    const [read, setRead] = useState([]);
    const [posts, setPosts] = useState([]);

     useSubscription(POST_SUBSCRIPTION, {
        context: {
            headers: {
              authorization: `${
                data.userData.token
              }`,
            },
        },
        onData: (data) => {
           setPosts(posts => [...posts, data?.data?.data?.libraryUpdated])
        },
        onError: (err) => {
            console.log(err);
        },
    });

    return (
        <><Navigation></Navigation><div className={styles.home__cont}>
            <div className={styles.home__left}>
                <Link to="/books">View Books</Link>
                <hr className={styles.horizontal_rule} />
                <div className={styles.bookshelves}>
                    <h4>BOOKSHELF</h4>
                    <div>
                        <Link to="/books">{wantToReadData.length} Want to Read</Link>
                    </div>
                    <div>
                        <Link to="/books">{currentlyReadingData.length} Currently Reading</Link>
                    </div>
                    <div>
                        <Link to="/books">{read[0] !== undefined ? read[0][0].length : "-"} Read</Link>
                    </div>
                </div>
            </div>
            <div className={styles.home__mid}>
                <h4>UPDATES</h4>
                {posts.reverse()?.map(item => <Post {...item} key={item.id} />
                )}
            </div>
            <div className={styles.home__right}>
                <div className={styles.right__cards}>
                    <h4 style={{ marginBottom: "10px" }}>NEWS AND INTERVIEWS</h4>
                    <h4 style={{ marginBottom: "10px" }}>February's Most Anticipated Young Adult Books</h4>
                    <img src="https://images.gr-assets.com/blogs/1611274039p7/2005.jpg" alt="" />
                    <p style={{ fontSize: "13px", color: "#8E8A81" }}>31 likes . 2 comments</p>
                </div>
                <hr className={styles.horizontal_rule} />
                <div className={styles.right__cards}>
                    <h4 style={{ marginBottom: "10px" }}>RECOMMENDATIONS</h4>
                    <h4 style={{ marginBottom: "10px" }}>February's Most Anticipated Young Adult Books</h4>
                    <img src="https://images.gr-assets.com/blogs/1611273545p7/2004.jpg" alt="" />
                    <p style={{ fontSize: "13px", color: "#8E8A81" }}>31 likes . 2 comments</p>
                </div>
                <hr className={styles.horizontal_rule} />
                <div className={styles.footer}>
                    <div className={styles.footer__cont}>
                        <div className={styles.cont__left}>
                            <h4 style={{ margin: "10px 0" }}>COMPANY</h4>
                            <p>About Us</p>
                            <p>Career</p>
                            <p>Terms</p>
                            <p>Privacy</p>
                            <p>Interest Based Ads</p>
                            <p>Ad Prefernces</p>
                            <p>Help</p>
                        </div>
                        <div className={styles.cont__right}>
                            <h4 style={{ margin: "10px 0" }}>WORK WITH US</h4>
                            <p>Authors</p>
                            <p>Advice</p>
                            <p>Authord and Ad Blogs</p>
                            <p>API</p>
                        </div>
                    </div>
                    <hr className={styles.horizontal_rule} />
                    <h4 style={{ margin: "10px 0" }}>CONNECT</h4>
                    <div className={styles.socials}>
                        <i class="fab fa-facebook-square"></i>
                        <i class="fab fa-twitter-square"></i>
                        <i class="fab fa-instagram-square"></i>
                        <i class="fab fa-linkedin"></i>
                    </div>
                </div>
                <hr className={styles.horizontal_rule} />
                <div style={{ marginBottom: "10px" }}>
                    <img src="https://s.gr-assets.com/assets/app/badge-ios-desktop-homepage-6ac7ae16eabce57f6c855361656a7540.svg" alt="" />
                    <img src="https://s.gr-assets.com/assets/app/badge-android-desktop-home-0f517cbae4d56c88a128d27a7bea1118.png" alt="" />
                </div>
                <p style={{ fontSize: "13px", color: "#8E8A81" }}>© 2023, GoodReads</p>
            </div>
        </div></>
    )
}

export default Home;
