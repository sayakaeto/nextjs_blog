import styles from "styles/hero.module.css";
import cube from "images/cube.jpg"
import Image from "next/image";

const Hero = ({ title, subtitle, imageOn = false }) => {
  return (
    <div className={styles.flexContainer}>
      <div className={styles.text}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
       </div>
        {imageOn && (
        <figure className={styles.image}>
          <Image 
          src={cube} 
          alt="" 
          layout="responsive"
          sizes="(win-width: 1152px) 576px,(min-width: 768x) 50vw, 100vw"
          priority
          placeholder="blur"
          />
        </figure>)}
      
    </div>
  );
};

export default Hero;
