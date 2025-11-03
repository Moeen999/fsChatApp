import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { IoKeySharp } from "react-icons/io5";
import { Link } from "react-router-dom";
const Register = () => {
  const [inputData, setInputData] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  setInputData((prev)=>({
      ...prev,
      [name]: value,  
  }))
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setInputData({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  }
  return (
    <form className="flex justify-center p-6 items-center min-h-screen" onSubmit={handleFormSubmit}>
      <div className="max-w-[40rem] w-full flex flex-col gap-5 bg-zinc-900 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold">Register Here...</h2>
        <label class="input input-bordered flex items-center gap-2">
          <FaUser />
          <input
            type="text"
            class="grow"
            placeholder="FullName"
            name="fullname"
            value={inputData.fullname}
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
        <label class="input input-bordered flex items-center gap-2">
          <IoKeySharp />
          <input
            type="password"
            class="grow"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={inputData.confirmPassword}
            onChange={handleInputChange}
          />
        </label>
        <button className="btn btn-primary" type="submit">Register</button>
        <p>
          Already have an account?
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
