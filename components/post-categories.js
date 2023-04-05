import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "styles/post-categories.module.css";

const PostCategories = ({ categories }) => {

  return (
    <div className={styles.flexContainer}>
        <h3>
            <FontAwesomeIcon icon={faFolderOpen} />
            <span className="sr-only">Categories</span>
        </h3>
      <ul className={styles.list}>
        {categories.map(({ name, slug }) => (
          <li key={slug}>
            <Link href={`/blog/category/${slug}`}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostCategories;
