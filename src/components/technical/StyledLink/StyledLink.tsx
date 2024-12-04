import { Link } from "react-router";
import styles from "./styles.module.scss";

const StyledLink = (props: { to: string; label: React.ReactNode }) => {
  return (
    <Link to={props.to} className={styles.link}>
      {props.label}
    </Link>
  );
};

export default StyledLink;
