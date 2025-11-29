import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { IoKeySharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { registerUserThunk } from "../../store/slice/userslice/user.thunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

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
    const res = await dispatch(registerUserThunk(inputData));
    localStorage.setItem("accesstoken", res.payload.token);
    if (res.payload?.success) {
      navigate("/");
    }
  };
  return (
    <div className="flex flex-col justify-center gap-4 p-6 items-center min-h-screen">
      <h1 className="text-3xl font-semibold">Hi, welcome to the Dev_Talks😊</h1>
      <div className="max-w-[40rem] w-full flex flex-col gap-5 bg-zinc-900 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold">Register Here...</h2>
        <label className="input input-bordered flex items-center gap-2">
          <FaUser />
          <input
            type="text"
            className="grow"
            placeholder="FullName"
            name="fullName"
            value={inputData.fullName}
            onChange={handleInputChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaUser />
          <input
            type="text"
            className="grow"
            placeholder="Username"
            name="username"
            value={inputData.username}
            onChange={handleInputChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <IoKeySharp />
          <input
            type="password"
            className="grow"
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
            <span className="label-text">Male</span>
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
