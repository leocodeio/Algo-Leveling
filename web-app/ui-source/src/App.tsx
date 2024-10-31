import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Credits from "./components/Credits";
import Dummy from "./components/Dummy";
import Header from "./utils/common/Header";
import Entry from "./components/Entry";
function App() {
  return (
    <div className="h-screen w-full">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Entry />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/dummy" element={<Dummy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
