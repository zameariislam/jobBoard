import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import {setUser, toggleLoading } from "./features/auth/authSlice";
import { Toaster } from "react-hot-toast";

function App() {
  const { isLoading } = useSelector((state) => state.auth);
  console.log(isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        dispatch(setUser(user?.email));
        // dispatch(setLoading(true))
      } else {
         dispatch(toggleLoading(true))
      }
    });
  }, [dispatch]);

  return (
    <>
      <Toaster />

      <RouterProvider router={routes} />
    </>
  );
}

export default App;
