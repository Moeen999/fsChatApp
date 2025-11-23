import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { IoKeySharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { registerUserThunk } from "../../store/slice/userslice/user.thunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    fullName: "",
    username: "",
    password: "",
    gender: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserRegister = async () => {
    await dispatch(registerUserThunk(inputData));
    setInputData({
      fullName: "",
      username: "",
      password: "",
      gender: "",
    });
    navigate("/login")
  };
  return (
    <div className="flex justify-center p-6 items-center min-h-screen">
      <div className="max-w-[40rem] w-full flex flex-col gap-5 bg-zinc-900 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold">Register Here...</h2>
        <label class="input input-bordered flex items-center gap-2">
          <FaUser />
          <input
            type="text"
            class="grow"
            placeholder="FullName"
            name="fullName"
            value={inputData.fullName}
            onChange={handleInputChange}
          />
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <FaUser />
          <input
            type="text"
            class="grow"
            placeholder="Username"
            name="username"
            value={inputData.username}
            onChange={handleInputChange}
          />
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <IoKeySharp />
          <input
            type="password"
            class="grow"
            placeholder="Password"
            name="password"
            value={inputData.password}
            onChange={handleInputChange}
          />
        </label>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="male"
              className="radio radio-primary"
              checked={inputData.gender === "male"}
              onChange={handleInputChange}
            />
            <span class="label-text">Male</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="female"
              className="radio radio-primary"
              checked={inputData.gender === "female"}
              onChange={handleInputChange}
            />
            <span className="label-text">Female</span>
          </label>
        </div>

        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleUserRegister}
        >
          Register
        </button>
        <p>
          Already have an account?
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
