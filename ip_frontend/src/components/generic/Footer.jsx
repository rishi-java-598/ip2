import React from "react";
import { Link } from "react-router-dom";
import styles from '../../styles/generic/Footer.module.css'
import { IoLogoInstagram } from "react-icons/io5";
import pic from "../../assets/Logo.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.intofooterinner}>
        <div className={styles.footerContainer}>
          <div className={styles.entryText}>
            <img
              style={{ borderRadius: "10px" }}
              src={pic}
              width={160}
              alt=""
            />
            <p
            // style={{color:"white"}}
            >
              The Iron Paradise – Strength in motion.
Power in progress.
<br />
<br />
Address - VIT BHOPAL
            </p>
          </div>

          <div id={styles.contactus1}>
            <h2>Connect with us</h2>
            <div>
              <h3 style={{ color: "white",marginTop:"10px" }}>mail : TheIronParadise@gmail.com</h3>

              <h4
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  marginTop: "10px",
                  color: "white",
                }}
              >
                {/* <IoLogoInstagram color="white" size={40} /> */}
<a className={styles.Btn}                   href="https://instagram.com/"
>
 <span className={styles.svgContainer}>
   <svg fill="white" className={styles.svgIcon} viewBox="0 0 448 512" height="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
 </span>
 <span className={styles.BG}></span>
</a>
                
                
                  Follow us
              </h4>
            </div>
          </div>
        </div>

        <div className={styles.wholeindiv}>
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
            Quick Links
          </h2>

          <div className={styles.centerContainer}>
            <Link className={styles.flink} to="/">
              Home
            </Link>
            <Link className={styles.flink} to="/about">
              About Us
            </Link>
            <Link className={styles.flink} to="/accounts">
              Gym Staff
            </Link>
            <Link className={styles.flink} to="/budgets">
              Register
            </Link>
            <Link className={styles.flink} to="/userProfile">
              Profile
            </Link>
          </div>
        </div>
      </div>

      <div id={styles.contactus2}>
        <h2>Connect with us</h2>
        <div>

          <h3 style={{ color: "white",marginTop:"10px" }}>                  <br />
mail : expo.tracey@gmail.com</h3>
          <h4
          
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginTop: "10px",
              color: "white",
            }}
          
          >
            <IoLogoInstagram color="white" size={40} />
            Instagram
            <a
              id={styles.linkedinbutton}
              // style={{
              //   textDecoration: "none",
              //   color: "white",
              //   padding:"2px 6px ",
              //   border:"solid 1px white",
              //   borderRadius:"10px"
              //   // marginLeft: "20px",
              // }}
              target="_blank"
              href="https://www.linkedin.com/in/rishi-raj-sharma-kdds598/"
            >
              Follow us
            </a>
          </h4>
        </div>
      </div>

      <div className={styles["footer-bottom"]}>
        <p style={{ textAlign: "center" }}>
          &copy; 2025 The Iron Paradise, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;