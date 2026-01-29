import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://dtsiki.github.io/"
        target="_blank"
        className={styles.footer__link}
      >
        dtsiki
      </a>
    </footer>
  );
};
