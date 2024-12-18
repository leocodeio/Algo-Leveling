import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Credits from "./components/Credits";
import Dummy from "./components/Dummy";
import Header from "./utils/common/Header";
import Entry from "./components/Entry";
import Error from "./components/Error";
import Profile from "./components/Profile";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Play from "./components/Play";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="h-screen w-full">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Entry />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/play" element={<Play />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dummy" element={<Dummy />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
