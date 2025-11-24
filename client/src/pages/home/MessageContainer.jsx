import User from "./User";
import Message from "./Message";
import { IoIosSend } from "react-icons/io";

const MessageContainer = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="border-b border-b-white/10 p-3">
        <User />
      </div>

      <div className="h-full overflow-y-auto p-3">
        <Message />
      </div>

      <div className="flex justify-center gap-3 w-full p-3 border-t border-t-white/10">
        <input
          type="text"
          placeholder="Type here........"
          className="input input-bordered input-info w-full"
        />
        <button className="btn btn-square btn-outline btn-primary">
          <IoIosSend fontSize={24}/>
        </button>
      </div>
    </div>
  );
};

export default MessageContainer;
