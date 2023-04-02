import React, {useState, useContext} from "react";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import styles from "./login.module.css";
import { Footer } from "../../components/Footer/Footer"
import { UserContext } from "../../store/userStorage";
import { useMutation } from '@apollo/client';
import { SIGN_IN_USER } from '../../graphql/mutations';
import { getBaseUrl } from '../../utils/utils';

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

    const {
      data: { userData },
      setDataToStore
    } = useContext(UserContext);

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [signInUser] = useMutation(SIGN_IN_USER, {
      onCompleted: (res) => {
        setEmail("")
        setPassword("")
        if (res?.login?.token) {
          setDataToStore({
            userData: {
              token: res?.login?.token,
              id: res?.login?.id,
              name: res?.login?.name,
              email: res?.login?.email,
            }
          })
          window.location.href = '/books';
        }
      },
      onError: (err) => {
        console.log('sign in error', err.message);
        setEmail("")
        setPassword("")
      },
    });

    const handleLogin =()=>{
      let payload ={
        email: email,
        password: password
      }

      signInUser({ variables: payload });
    }

    return (
        <>
          <div className={styles.navigation}>
            <img
              className={styles.logo}
              src={`${getBaseUrl}/assets/header_logo-8d96d7078a3d63f9f31d92282fd67cf4.png`}
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