import { useDispatch, useSelector } from "react-redux";
import { setSelecteduser } from "../../store/slice/userslice/user.slice";

const User = ({ otherUsers }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const handleUserclick = () => {
    dispatch(setSelecteduser(otherUsers));
  };
  return (
    <div
      onClick={handleUserclick}
      className={`flex items-center gap-5 hover:bg-gray-700 rounded-lg p-2 cursor-pointer ${
        otherUsers?._id === selectedUser?._id && "bg-gray-700"
      }`}
    >
      <div className="avatar online">
        <div className="w-12 rounded-full">
          <img src={otherUsers?.avatar} alt={otherUsers?.username?.charAt([0])} />
        </div>
      </div>
      <div>
        <h2 className="line-clamp-1">{otherUsers?.fullName}</h2>
        <p className="text-sm">{otherUsers?.username}</p>
      </div>
    </div>
  );
};

export default User;
