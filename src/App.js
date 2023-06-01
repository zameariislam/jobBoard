import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./features/auth/authSlice";
import { Toaster } from "react-hot-toast";

function App() {
 const {isLoading} = useSelector(state=>state.auth)
 console.log(isLoading)
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        dispatch(setUser(user?.email));
      } else {
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
