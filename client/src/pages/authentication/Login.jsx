import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { IoKeySharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import loginUserthunk from "../../store/slice/userslice/user.thunk";
const Login = () => {
  const dispatch = useDispatch();
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
    await dispatch(loginUserthunk(inputData));
    setInputData({
      username: "",
      password: "",
    });
  };
  return (
    <div className="flex justify-center p-6 items-center min-h-screen">
      <div className="max-w-[40rem] w-full flex flex-col gap-5 bg-zinc-900 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold">Login Here...</h2>
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
        <button className="btn btn-primary" type="submit" onClick={handleLogin}>
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
  );
};

export default Login;
