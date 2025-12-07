import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  initialSocket,
  setOnlineUsers,
} from "../../store/slice/socketSlice/socket.slice";
import { setNewMessages } from "../../store/slice/messageslice/message.slice";
import { toggleSidebar } from "../../store/slice/uiSlice/ui.slice";
import { GiHamburgerMenu } from "react-icons/gi";

const Home = () => {
  const dispatch = useDispatch();
  const { screenLoading, isAuthenticated, userProfile } = useSelector(
    (state) => state.userReducer
  );
  const { socket } = useSelector((state) => state.socketReducer);
  const { sidebarOpen } = useSelector((state) => state.uiReducer);

  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(initialSocket(userProfile?._id));
  }, [isAuthenticated]);

  useEffect(() => {
    if (!socket) return;
    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });
    socket.on("newMsg", (newMsg) => {
      dispatch(setNewMessages(newMsg));
    });
    return () => {
      socket.close();
    };
  }, [socket]);

  return (
    <div className="flex relative h-screen">
      <button
        className="md:hidden fixed top-4 right-4 z-50 btn btn-sm btn-ghost"
        onClick={() => dispatch(toggleSidebar())}
      >
        <GiHamburgerMenu size={20} />
      </button>

      <div
        className={`fixed md:relative md:w-auto w-full h-screen md:h-auto transform transition-all duration-300 z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => dispatch(toggleSidebar())}
        ></div>
      )}

      <div className="flex-1">
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
