import React, {useState, useEffect, useContext} from 'react';
import styles from './read.module.css'
import Button from '@mui/material/Button';
import { Menu, MenuItem } from '@mui/material';
import { UserContext } from "../../store/userStorage";

const ReadButton = ({selectedBook, updateCollection}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {id, collection} = selectedBook;

    const [collectionVal, setCollectionVal] = useState(collection);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = (val) => {
      setCollectionVal(val);
      updateCollection(id, val);
      setAnchorEl(null);
    }
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div className = {styles.button}>
        <Button 
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            onClick={handleClick}
            className = {styles.buttonText}
        >
          {
            collectionVal === 'READ'
            ? "Read"
            : collectionVal === 'READING'
            ? "Reading"
            : "Want to read"
          }
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem 
            onClick={() => {
              handleMenuClick('READ');
            }}
          >Read</MenuItem>
          <MenuItem 
            onClick={() => {
              handleMenuClick('READING');
            }}
          >Reading</MenuItem>
          <MenuItem 
             onClick={() => {
              handleMenuClick('WANT_TO_READ');
            }}
          >Want to read</MenuItem>
        </Menu>
      </div>
    );
}

export {ReadButton}
