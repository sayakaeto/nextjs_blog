import Link from "next/link";
import styles from "styles/blue-frame.module.css";
import Container from "./container";

const BlueFrame = ({ children }) => {
  return (
    <div className={styles.frame}>
      <Container>{children}</Container>

      <Link href="/blog">
        <a className={styles.sideBtn}>Recent Blog Posts</a>
      </Link>
    </div>
  );
};

export default BlueFrame;
