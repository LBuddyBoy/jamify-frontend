import { NavLink } from "react-router";
import "./style/sidebar.css";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function SideBar() {
  const { sliderOpen } = useTheme();
  const { user } = useAuth();

  return (
    <nav className={`sidebar${sliderOpen ? " open" : ""}`}>
      <header>
        <NavLink to={"/"}>
          <img src="/logo.png"></img>
        </NavLink>
      </header>
      <div className={`sidebar-items${sliderOpen ? " show" : ""}`}>
        {user ? (
          <>
            <BarLink to="/playlists">Playlists</BarLink>
            {/* <BarLink to="/queue">Queue</BarLink> */}
          </>
        ) : (
          <>
            <BarLink to="/register">Register</BarLink>
          </>
        )}
        <BarLink to="/artists">Artists</BarLink>
        <BarLink to="/search/t">Explore</BarLink>
      </div>
    </nav>
  );
}

function BarLink({ to, children }) {
  const { closeSlider } = useTheme();

  return (
    <NavLink to={to} onClick={closeSlider}>
      {children}
    </NavLink>
  );
}
