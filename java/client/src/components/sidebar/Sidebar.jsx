import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";
import {
  AiOutlineHome,
  AiOutlineRobot,
  AiOutlineLogout,
  AiOutlineMenu,
} from "react-icons/ai";
import { API_URL, sendRequest } from "../../utils/Api";

const sidebarNavItems = [
  {
    display: "Dashboard",
    icon: <AiOutlineHome />,
    to: "/dashboard",
    section: "dashboard",
  },
  {
    display: "Products",
    icon: <AiOutlineRobot />,
    to: "/products",
    section: "products",
  },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sidebarRef = useRef();

  const location = useLocation();
  const [profile, setProfile] = useState({});
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      let response = await sendRequest(API_URL + "/users/current-user", "GET");
      setProfile(response?.data?.data);
      localStorage.setItem("profile", JSON.stringify(response?.data?.data));
    }
    loadData();
  }, []);

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    setSidebarOpen(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="sidebar__toggle" onClick={handleSidebarToggle}>
        <AiOutlineMenu />
      </div>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar__logo">Binary Supermarket</div>
        <div className="sidebar__sublogo">{`Welcome ${
          profile?.firstName ? profile?.firstName : profile?.email
        }`}</div>
        <div ref={sidebarRef} className="sidebar__menu">
          {sidebarNavItems.map((item, index) => (
            <Link to={item.to} key={index}>
              <div
                className={`sidebar__menu__item ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <div className="sidebar__menu__item__icon">{item.icon}</div>
                <div className="sidebar__menu__item__text">{item.display}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="sidebar__logout">
          <Link to="/logout">
            <div className={`sidebar__logout__item`}>
              <div className="sidebar__logout__item__icon">
                <AiOutlineLogout />
              </div>
              <div className="sidebar__logout__item__text">Logout</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
