import User from "./User";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMessagesThunk } from "../../store/slice/messageslice/message.thunk";
import SendMessage from "./SendMessage";

const MessageContainer = () => {
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { messages } = useSelector((state) => state.messageReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessagesThunk({ receiverId: selectedUser?._id }));
    }
  }, [selectedUser]);
  return (
    <>
      {!selectedUser?._id ? (
        <>
          <div className="w-full h-screen flex flex-col justify-center items-center px-4">
            <h2 className="text-xl text-center"><span className="tracking-wider font-bold">SphereTalk</span> By Moeen</h2>
            <p className="text-lg md:text-2xl text-gray-500 text-center">
              Select a user to start conversation
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-screen flex flex-col">
            <div className="border-b border-b-white/10 p-3">
              <User otherUsers={selectedUser} />
            </div>

            <div className="h-full overflow-y-auto p-3">
              {messages?.map((messageDetails) => (
                <Message
                  key={messageDetails?._id}
                  messageDetails={messageDetails}
                />
              ))}
            </div>
            <SendMessage/>
          </div>
        </>
      )}
    </>
  );
};

export default MessageContainer;
