import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { IoKeySharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserthunk } from "../../store/slice/userslice/user.thunk";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };
  const handleLogin = async () => {
    const res = await dispatch(loginUserthunk(inputData));
    if (res.payload?.success) {
      navigate("/");
    }
  };
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="flex flex-col justify-center gap-[8rem] p-6 items-center">
        <h1 className="text-3xl font-bold tracking-widest">Welcome Back 👋 to TalkSphere</h1>

        <div className="max-w-[40rem] w-full flex flex-col gap-5 bg-zinc-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold flex justify-center items-center">
            Log In to TalkSphere
          </h2>

          <label className="input input-bordered flex items-center gap-2">
            <FaUser />
            <input
              type="text"
              className="grow"
              placeholder="Enter Your Username"
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
              placeholder="Enter Your Password"
              name="password"
              value={inputData.password}
              onChange={handleInputChange}
            />
          </label>

          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleLogin}
          >
            Login
          </button>

          <p>
            Don't have an account?
            <Link to="/register" className="text-blue-500 underline">
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full py-3 bg-zinc-800 border-t border-zinc-700">
        <marquee
          behavior="scroll"
          direction="left"
          scrollamount="5"
          className="text-zinc-300 text-sm"
        >
          <span className="tracking-wider">
            © {new Date().getFullYear()} — All Rights Reserved by Muhammad Moeen
          </span>
        </marquee>
      </div>
    </div>
  );
};

export default Login;
