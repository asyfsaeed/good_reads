import React from "react";
import styles from "./navigation.module.css";
import { Link } from "react-router-dom";
import { Search } from "../Search/Search";
import { getBaseUrl } from "../../utils/utils";

const Navigation = () => {
  return (
    <div className={styles.navigation__cont}>
      <div className={styles.navigation__left}>
        <div className={styles.menu__logo}>
          <img src={`${getBaseUrl}/assets/header_logo-8d96d7078a3d63f9f31d92282fd67cf4.png`} />
        </div>
        <div className={styles.menu}>
          <Link to="/" className={styles.menu__link}>
            Home
          </Link>
        </div>
        <div className={styles.menu}>
          <Link to="/books" className={styles.menu__link}>
            View Books
          </Link>
        </div>
      </div>
      <div className={styles.flexgrow1}></div>
      <div>
        <Search></Search>
      </div>
      <div className={styles.flexgrow2}></div>
      <div className={styles.navigation__right}>
        <div className={styles.menu__icon}>
          <Link to="#">
            <img width="50" src={`${getBaseUrl}/assets/icons/user-ic.png`}></img>
          </Link>
          <div className={styles.dropdown_content}>
            <Link to="#" className={styles.dropdown_link}>
              Sign Out
            </Link>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Navigation };
