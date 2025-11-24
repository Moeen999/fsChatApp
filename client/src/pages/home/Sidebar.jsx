import { IoSearch } from "react-icons/io5";
import User from "./User";
import { logoutUserThunk } from "../../store/slice/userslice/user.thunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile, otherUsersProfile } = useSelector(
    (state) => state.userReducer
  );
  const handleLogout = async () => {
    const res = await dispatch(logoutUserThunk());
    if (res.payload?.success) {
      navigate("/login");
    }
  };
  return (
    <div className="max-w-[20rem] w-full h-screen flex flex-col border-r border-r-white/10">
      <h1 className="bg-black mx-3 mt-3 rounded-lg px-2 py-1 text-[#7080ff] text-xl font-semibold">
        DevTalks
      </h1>
      <div className="p-3">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <IoSearch />
        </label>
      </div>

      <div className="flex flex-col gap-3 h-screen overflow-y-scroll px-3">
        {otherUsersProfile?.map((otherUsers) => (
          <User key={otherUsers?._id} otherUsers={otherUsers} />
        ))}
      </div>

      <div className="bg-zinc-800 flex justify-between items-center p-3">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
            {userProfile && <img src={userProfile?.avatar} alt="You" />}
          </div>
        </div>
        <button
          className="btn btn-active btn-error btn-sm px-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
