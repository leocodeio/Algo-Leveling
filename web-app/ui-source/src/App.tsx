import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Entry from "./components/Entry";
import Dummy from "./components/Dummy";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Entry />} />
          <Route path="/dummy" element={<Dummy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
