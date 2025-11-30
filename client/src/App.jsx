import { useDispatch } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import {
  getUserProfileThunk,
} from "./store/slice/userslice/user.thunk";
import { Toaster } from "react-hot-toast";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfileThunk());
  }, [dispatch]);
  return (
    <>
      <Toaster />
    </>
  );
}

export default App;
