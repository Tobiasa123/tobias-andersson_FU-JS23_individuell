import "./abstracts/app.scss"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";


//import my pages
import About from "./pages/About";
import Landing from "./pages/Landing";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import Status from "./pages/Status";

//import components this is kind of a page aswell
import Nav from "./components/Nav";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Landing />} />
      <Route path="/Menu" element={<Menu />} />
      <Route path="/About" element={<About />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Status" element={<Status />} />
      <Route path="/Nav" element={<Nav />} />
    </Route>
  )
);

function App() {
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
