import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import { registerUserThunk,loginUserthunk, logoutUserThunk } from "./store/slice/userslice/user.thunk";
import { Toaster } from "react-hot-toast";
function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userReducer.isAuthenticated);
  console.log(state);

  useEffect(() => {
    dispatch(registerUserThunk());
    dispatch(loginUserthunk());
    dispatch(logoutUserThunk());
  }, [dispatch]);
  return (
    <>
      <Toaster />
    </>
  );
}

export default App;
