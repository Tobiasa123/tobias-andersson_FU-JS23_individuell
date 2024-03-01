
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import About from "./pages/About";
import Landing from "./pages/Landing";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import Status from "./pages/Status";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Landing />} />
      <Route path="/Menu" element={<Menu />} />
      <Route path="/About" element={<About />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Status" element={<Status />} />
    </Route>
  )
);


import './App.css'



function App() {

  return (
    <>
     <h1>app</h1>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
