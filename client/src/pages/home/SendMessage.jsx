import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slice/messageslice/message.thunk";

const SendMessage = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { screenLoading, selectedUser } = useSelector(
    (state) => state.userReducer
  );
  const handleSendMessage = async () => {
    await dispatch(
      sendMessageThunk({ receiverId: selectedUser?._id, message })
    );
    setMessage("");
  };
  return (
    <div>
      <div className="flex justify-center gap-3 w-full p-3 border-t border-t-white/10">
        <input
          type="text"
          value={message}
          placeholder="Enter your message here........"
          className="input input-bordered input-info w-full"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="btn btn-square btn-outline btn-primary"
        >
          {screenLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <IoIosSend fontSize={24} />
          )}
        </button>
      </div>
    </div>
  );
};

export default SendMessage;
