import {
  AccountCircle,
  HomeRounded,
  MapRounded,
  SettingsRounded,
  SportsEsportsRounded,
  UploadRounded,
} from "@mui/icons-material";
import logo from "assets/icon-transparant.svg";
import { NavLink, Outlet } from "react-router";
import styles from "./LayoutStyles.module.css";

const IconLink = ({
  to,
  children,
  disableVisualisation,
}: {
  to: string;
  children: React.ReactNode;
  disableVisualisation: boolean;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        styles.links +
        " " +
        (isActive && !disableVisualisation ? styles.linkActive : "")
      }
      aria-label={"test"}
    >
      {children}
    </NavLink>
  );
};

const iconFillColor = "#7FD5D1";
const iconStyles = {
  fill: iconFillColor,
  width: "90%",
  height: "auto",
  aspectRatio: 1,
};

const links = {
  center: [
    {
      name: "Home",
      icon: <HomeRounded sx={iconStyles} />,
      to: "/",
    },
    {
      name: "Maps",
      icon: <MapRounded sx={iconStyles} />,
      to: "/maps",
    },
    {
      name: "Ingame",
      icon: <SportsEsportsRounded sx={iconStyles} />,
      to: "/ingame",
    },
    {
      name: "Upload",
      icon: <UploadRounded sx={iconStyles} />,
      to: "/upload",
    },
  ],
  bottom: [
    {
      name: "Settings",
      icon: <SettingsRounded sx={iconStyles} />,
      to: "/settings",
    },
    {
      name: "Profile",
      icon: <AccountCircle sx={iconStyles} />,
      to: "/profile",
    },
  ],
};

const LayoutPage = () => {
  return (
    <div className={styles.layoutPage}>
      <div className={styles.navBar}>
        <div className={styles.navBarHeader}>
          <IconLink
            to={"/"}
            children={<img src={logo} alt="" className={styles.navIcon} />}
            disableVisualisation={true}
          />
        </div>
        <div className={styles.navBarCenter}>
          {links.center.map((link) => (
            <IconLink
              to={link.to}
              children={link.icon}
              disableVisualisation={false}
              key={link.to}
            />
          ))}
        </div>
        <div className={styles.navBarBottom}>
          {links.bottom.map((link) => (
            <IconLink
              to={link.to}
              children={link.icon}
              disableVisualisation={false}
              key={link.to}
            />
          ))}
        </div>
      </div>
      <div className={styles.outlet + " " + styles.page}>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutPage;
