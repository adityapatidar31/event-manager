import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./myComponents/Navbar/Navbar";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import HeroSection from "./myComponents/Heropage/Hero";
import Homepage from "./myComponents/Homepage/page";
import Eventpage from "./myComponents/Eventpage/Eventpage";
import Aboutpage from "./myComponents/Aboutpage/Aboutpage";
import CreateEvent from "./myComponents/CreateEventpage/CreateEvent";
import Loginpage from "./myComponents/Loginpage/Loginpage";
import SignupPage from "./myComponents/SignupPage/SignupPage";
import MyEventComponent from "./myComponents/MyEventspage/MyEvents";

function Layout() {
  return (
    <div className="max-w-screen-xl mx-auto lg:px-13 ">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="mt-4 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable
        theme={theme}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/hero" element={<HeroSection />} />
          <Route path="/" element={<Layout />}>
            {/* The HomePage is the default for /home */}
            <Route path="" element={<Homepage />} />
            {/* The dynamic route is defined as :id */}
            <Route path="/:id" element={<Eventpage />} />
            <Route path="/myEvent" element={<MyEventComponent />} />
            <Route path="/about" element={<Aboutpage />} />
            <Route path="/createEvent" element={<CreateEvent />} />
          </Route>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
