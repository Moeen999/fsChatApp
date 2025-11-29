import { useSelector } from "react-redux";

const Message = ({ messageDetails }) => {
  const { userProfile } = useSelector((state) => state.userReducer);
  return (
    <>
      <div
        className={`chat ${
          messageDetails?.senderId === userProfile?._id
            ? "chat-end"
            : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={userProfile?.avatar}
            />
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
