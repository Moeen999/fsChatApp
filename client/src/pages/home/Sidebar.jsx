import { IoSearch } from "react-icons/io5";
import User from "./User";
import {
  getOtherUsersThunk,
  logoutUserThunk,
} from "../../store/slice/userslice/user.thunk";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserGear } from "react-icons/fa6";
import { closeSidebar } from "../../store/slice/uiSlice/ui.slice";

const Sidebar = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { screenLoading, userProfile, otherUsersProfile } = useSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    setFilteredUsers(otherUsersProfile);
  }, [otherUsersProfile]);

  useEffect(() => {
    dispatch(getOtherUsersThunk());
  }, []);

  const handleLogout = async () => {
    const res = await dispatch(logoutUserThunk());
    if (res.payload?.success) {
      navigate("/login");
    }
  };

  const handleSearchChange = (e) => {
    const result = otherUsersProfile.filter(
      (user) =>
        user?.fullName.toLowerCase().includes(e.target.value) ||
        user?.username.toLowerCase().includes(e.target.value)
    );

    setFilteredUsers(result);
  };

  const handleUserSelect = () => {
    dispatch(closeSidebar());
  };

  if (screenLoading)
    return (
      <span className="w-screen flex justify-center items-center loading loading-bars"></span>
    );
  return (
    <div className="max-w-[20rem] w-full h-screen flex flex-col border-r border-r-white/10 bg-base-100">
      <h1 className="font-extrabold flex justify-center tracking-widest bg-black mx-3 mt-3 rounded-lg px-2 py-1 text-[#7080ff] text-xl">
        TalkSphere
      </h1>

      <div className="p-3">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search Friends....."
            onChange={handleSearchChange}
          />
          <IoSearch />
        </label>
      </div>

      <div className="flex flex-col gap-3 h-screen overflow-y-scroll px-3">
        {filteredUsers
          ?.filter((u) => u?._id !== userProfile?._id)
          .map((otherUsers) => (
            <div key={otherUsers?._id} onClick={handleUserSelect}>
              <User otherUsers={otherUsers} />
            </div>
          ))}
      </div>

      <div className="bg-zinc-800 flex justify-between items-center p-3 mt-auto">
        <div className="flex gap-4 avatar justify-center items-center">
          <div className="ring-primary ring-offset-base-100 w-[50px] h-[50px] rounded-full ring ring-offset-2">
            <img src={userProfile?.avatar} alt="You" />
          </div>
          <p className="hidden sm:block">{userProfile?.fullName}</p>
        </div>

        <div className="dropdown dropdown-top dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-sm m-1">
            <FaUserGear />
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 flex flex-col gap-4 p-4 shadow-sm"
          >
            <li>
              <button
                className="btn btn-active btn-primary btn-sm px-4"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
            <li className="btn btn-error">
              <NavLink to="/delete-account">Delete Account</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
