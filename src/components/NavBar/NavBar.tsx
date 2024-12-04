import logo from "assets/icon-transparant.svg";
import { NavLink } from "react-router";
import {
  GamepadRounded,
  HomeRounded,
  MapRounded,
  SettingsRounded,
  UploadRounded,
} from "@mui/icons-material";
import { Avatar, CircularProgress } from "@mui/material";
import styles from "./styles.module.scss";
import useAuthentication from "hooks/useAuthentication/useAuthentication.tsx";

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
        styles.icon +
        " " +
        styles.links +
        " " +
        (isActive && !disableVisualisation ? styles.linkActive : "")
      }
      aria-label={to}
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

const NavBar = () => {
  const { isLoggedIn, getAuthContext } = useAuthentication();
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
        icon: <GamepadRounded sx={iconStyles} />,
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
        icon:
          isLoggedIn() == undefined ? (
            <CircularProgress
              style={{
                width: "80%",
                height: "auto",
                aspectRatio: 1,
                stroke: "5px solid black",
              }}
            />
          ) : (
            <Avatar sx={{ bgColor: "#000", textDecoration: "none" }}>
              {isLoggedIn() ? getAuthContext().userName.charAt(0) : "G"}
            </Avatar>
          ),
        to: isLoggedIn() ? "/profile" : "/login",
      },
    ],
  };
  return (
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
  );
};
export default NavBar;
