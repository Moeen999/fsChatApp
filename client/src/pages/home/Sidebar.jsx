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
import { axiosInstance } from "../../components/utilities/axiosInstance";
import { getUserProfileThunk } from "../../store/slice/userslice/user.thunk";
import { useRef } from "react";
import toast from "react-hot-toast";

const Sidebar = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [zoom, setZoom] = useState(1);

  const onAvatarClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImageSrc(ev.target.result);
      setZoom(1);
      setShowCropModal(true);
    };
    reader.readAsDataURL(file);
    e.target.value = null;
  };

  const getCroppedImage = async () => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const size = Math.min(img.width, img.height);
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");

        const scaledW = img.width * zoom;
        const scaledH = img.height * zoom;

        const dx = (size - scaledW) / 2;
        const dy = (size - scaledH) / 2;

        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, dx, dy, scaledW, scaledH);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = imageSrc;
    });
  };

  const handleUploadCropped = async () => {
    try {
      const cropped = await getCroppedImage();
      const res = await axiosInstance.patch("/user/update-avatar", {
        avatar: cropped,
      });
      if (res.data?.success) {
        toast.success("Profile picture updated");
        dispatch(getUserProfileThunk());
        setShowCropModal(false);
        setImageSrc(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload avatar");
    }
  };

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
    return <span className="loading loading-spinner loading-xl"></span>;

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
            disabled={otherUsersProfile?.length === 0}
            onChange={handleSearchChange}
          />
          <IoSearch />
        </label>
      </div>

      <>
        {!otherUsersProfile || otherUsersProfile.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No Users Found</p>
        ) : (
          <div className="flex flex-col gap-3 h-screen overflow-y-scroll px-3">
            {filteredUsers
              ?.filter((u) => u?._id !== userProfile?._id)
              .map((otherUsers) => (
                <div key={otherUsers?._id} onClick={handleUserSelect}>
                  <User otherUsers={otherUsers} />
                </div>
              ))}
          </div>
        )}
      </>

      <div className="bg-zinc-800 flex justify-between items-center p-3 mt-auto">
        <div className="flex gap-4 avatar justify-center items-center">
          <div
            role="button"
            onClick={onAvatarClick}
            className="ring-primary ring-offset-base-100 w-[50px] h-[50px] rounded-full ring ring-offset-2 overflow-hidden cursor-pointer tooltip tooltip-right tooltip-success"
            data-tip="Click to Change Picture"
          >
            <img
              src={userProfile?.avatar}
              alt="You"
              className="w-full h-full object-cover"
            />
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
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {showCropModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-base-100 p-4 rounded shadow-lg w-[90%] max-w-md">
            <h3 className="font-semibold mb-2">Crop profile picture</h3>
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center overflow-hidden relative">
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt="preview"
                  style={{ transform: `scale(${zoom})` }}
                  className="max-w-none"
                />
              )}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <label className="text-sm">Zoom</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.01"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="grow"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="btn btn-ghost"
                onClick={() => setShowCropModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleUploadCropped}>
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
