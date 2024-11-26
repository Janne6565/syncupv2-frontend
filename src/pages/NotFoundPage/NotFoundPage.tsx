import { useLocation } from "react-router";
import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  const location = useLocation();
  return (
    <div>
      <h2 style={{ color: "rgb(210, 210, 210)" }}>404</h2>
      <h3>Oops! Page</h3>
      <h1>
        <span className={styles.cursive}>
          {location.pathname.split("/").join("/")}
        </span>
      </h1>
      <h3>not found</h3>
    </div>
  );
};

export default NotFoundPage;
