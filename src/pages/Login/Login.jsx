import React, {useState} from "react";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import styles from "./login.module.css";
import Logo from "../../assets/header_logo-8d96d7078a3d63f9f31d92282fd67cf4.png";
import { Footer } from "../../components/Footer/Footer"

const useStyles = makeStyles(() => ({
    signInButton: {
        color: "white",
        background: "#333333 !important",
        marginTop: "15px !important",
        marginLeft: "10px !important",
        "&:hover": {
          background: "#424242 !important",
        },
    }
}));

const Login = () => {
    const classes = useStyles();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');


    const handleLogin =()=>{
      // let payload ={
      //   email:email2,
      //   password:password2
      // }
      localStorage.setItem("isLogin", JSON.stringify(true))
      setEmail("")
      setPassword("")
    }

    return (
        <>
          <div className={styles.navBar}>
            <img
              className={styles.logo}
              src={Logo}
              alt="logo"
            />
          </div>
          <div className={styles.banner}>
            <div className={styles.bannerImgText}>
            </div>
            <div className={styles.signInContainer}>
              <input onChange={(e)=>setEmail(e.target.value)}  type="email" placeholder="Email" />
              <br />
              <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
              <br />
              <Button onClick={handleLogin}  className={classes.signInButton} variant="contained" color="primary">
                sign in
              </Button>
            </div>
          </div>
          <Footer></Footer>
        </>
      );
}

export default Login;