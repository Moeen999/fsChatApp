import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  initialSocket,
  setOnlineUsers,
} from "../../store/slice/socketSlice/socket.slice";
import { setNewMessages } from "../../store/slice/messageslice/message.slice";

const Home = () => {
  const dispatch = useDispatch();
  const { screenLoading ,isAuthenticated, userProfile } = useSelector(
    (state) => state.userReducer
  );
  const { socket } = useSelector((state) => state.socketReducer);

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
    <div className="flex">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
