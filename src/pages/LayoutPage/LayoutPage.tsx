import { Outlet } from "react-router";
import styles from "./LayoutStyles.module.css";
import NavBar from "components/NavBar/NavBar.tsx";

const LayoutPage = () => {
  return (
    <div className={styles.layoutPage}>
      <NavBar />
      <div className={styles.outlet + " " + styles.page}>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutPage;
