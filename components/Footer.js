import { Container, Row, Col } from "react-bootstrap";
import styles from './global-style.module.css'


const Footer = () => {
    return (
       <footer className="bg-light text-center text-lg-start fixed-bottom accent-color">
        <div className="text-center p-3">
          © 2022 Copyright:&nbsp;&nbsp;  
          <a className="text-dark" href="https://github.com/rubencosta13">Ruben Costa</a>
        </div>
    </footer>
    );
}
 
export default Footer;