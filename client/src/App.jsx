import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import fetchUserThunk from "./store/slice/userslice/user.thunk";
import { Toaster } from "react-hot-toast";
function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userReducer.isAuthenticated);
  console.log(state);

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, [dispatch]);
  return(
    <>
     <Toaster />
    </>
  )
}

export default App;
