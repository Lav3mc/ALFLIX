import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BrowsePage from "./pages/BrowsePage";
import SearchPage from "./pages/SearchPage";
import WatchPage from "./pages/WatchPage";

function App() {
  return (
    <div className="App bg-black text-white min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/watch/:id" element={<WatchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;