import React from "react";
import "./footer.styling.css";
import GoogleIcon from "../../assets/badge-android-desktop-home-0f517cbae4d56c88a128d27a7bea1118.png"
import AppleIcon from "../../assets/badge-ios-desktop-homepage-6ac7ae16eabce57f6c855361656a7540.svg"
import LinkedIn from "../../assets/footer_linkedin-5b820f4703eff965672594ef4d10e33c.svg";
import Twitter from "../../assets/footer_twitter-126b3ee80481a763f7fccb06ca03053c.svg";

export const Footer = () => {
  return (
    <>
      <div className="container">
        <div className="Box">
          <br />
          <br />
          <br />
          <p className="BoxText">COMPANY</p>
          <br />
          <p>About us</p>
          <p>Careers</p>
          <p>Terms</p>
          <p>Privacy</p>
          <p>Interest Based Ads</p>
          <p>Ad Preferences</p>
          <p>Help</p>
        </div>
        
        <div className="Box">
          <br />
          <br />
          <br />
          <p className="BoxText">WORK WITH US</p>
          <br />
          <p>Authors</p>
          <p>Advertise</p>
          <p>Authors & ads blog</p>
          <p>API</p>
        </div>

        <div className="Box">
          <br />
          <br />
          <br />
          <p className="BoxText">Connect</p>
          <br />
          <img className="socialLinks" src={LinkedIn} alt="alt"/>
          <img className="socialLinks" src={Twitter} alt="alt"/>
          <br />
        </div>
    
        <div className="Box">
            <br/>
            <br/>
            <br/>
        
            <img src={AppleIcon} alt="alt"/>
            <img src={GoogleIcon} alt="alt"/>
            <p>© 2023 Good Reads, Inc.</p>
        </div>
      </div>
    </>
  );
};
