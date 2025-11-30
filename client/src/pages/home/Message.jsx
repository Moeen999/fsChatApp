import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ messageDetails }) => {
  const { userProfile, selectedUser } = useSelector(
    (state) => state.userReducer
  );

  const isSenderMe = messageDetails?.senderId === userProfile?._id;
  const messageRef = useRef(null);
  const profilePic = isSenderMe ? userProfile?.avatar : selectedUser?.avatar;
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  });
  return (
    <>
      <div
        ref={messageRef}
        className={`chat ${isSenderMe ? "chat-end" : "chat-start"}`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="avatar" src={profilePic} />
          </div>
        </div>

        <div className="chat-header">
          <time className="text-xs opacity-50">
            {messageDetails?.updatedAt
              ? new Date(messageDetails.updatedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : ""}
          </time>
        </div>

        <div className="chat-bubble">{messageDetails?.message}</div>
      </div>
    </>
  );
};

export default Message;
