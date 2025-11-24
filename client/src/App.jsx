import { useDispatch } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import { getOtherUsersThunk, getUserProfileThunk } from "./store/slice/userslice/user.thunk";
import { Toaster } from "react-hot-toast";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(getUserProfileThunk());
      dispatch(getOtherUsersThunk());
    })();
  }, [dispatch]);
  return (
    <>
      <Toaster />
    </>
  );
}

export default App;
