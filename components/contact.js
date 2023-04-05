import styles from "styles/contact.module.css";
import Social from "./social";

const Contact = () => {
  return (
    <div className={styles.stack}>
      <h3 className={styles.heading}>Contact</h3>
      <Social iconSize="30px"/>
      <address>cube@web.mail</address>
    </div>
  );
};

export default Contact;
