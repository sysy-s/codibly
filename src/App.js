import { Routes, Route } from "react-router";
import Home from "./Home";
import Test from "./Test";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test/" element={<Test/>}/>
    </Routes>
  );
}

export default App;
