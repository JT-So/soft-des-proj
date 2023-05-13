import "./styles.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Service from "./routes/Service";
import Contact from "./routes/Contact";
import Board from "./components/Board";
import { AuthContextProvider } from "./AuthContext";
import Protected from "./components/Protected";
import Admin from "./components/Admin";

export default function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/board"  element={<Protected><Board /></Protected>}/>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}
