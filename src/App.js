import "./styles.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Service from "./routes/Service";
import Contact from "./routes/Contact";
import Login from "./creds/Login";
import Register from "./creds/Register";
import Board from "./components/Board";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/board"  element={<Board />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register"  element={<Register />}/>
      </Routes>
    </div>
  );
}
