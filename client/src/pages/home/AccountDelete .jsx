import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteUserThunk } from "../../store/slice/userslice/user.thunk";
import toast from "react-hot-toast";

const AccountDelete = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAccountDelete = async () => {
    const res = await dispatch(deleteUserThunk());
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/register");
      toast.success("Account Deleted Successfully!!")
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 p-6">
      <h1 className="text-3xl font-semibold">Delete Account!</h1>

      <div className="flex gap-4">
        <NavLink
          to="/"
          className="px-6 py-2 bg-gray-800 rounded-lg text-white/100 hover:bg-gray-400 text-black"
        >
          Homepage
        </NavLink>

        <button
          onClick={() => setOpenModal(true)}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80 flex flex-col gap-4">
            <h2 className="text-xl text-black  font-bold text-center">
              Are you sure?
            </h2>

            <div className="flex justify-between">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 bg-gray-800 rounded-lg text-white/100 hover:bg-gray-400 text-black"
              >
                <NavLink to="/">Cancel</NavLink>
              </button>

              <button
                onClick={handleAccountDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Now!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDelete;
