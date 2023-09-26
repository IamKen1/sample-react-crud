import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SamplePage from "./pages/samplePage";
function App() {
  return(
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/SamplePage" element={<SamplePage />} />
  </Routes>
  )
}

export default App;
