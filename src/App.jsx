import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/MainLayout";
import LandingPage from "./Pages/Landing/Main";
import UseCard from "./components/Layout/UseCard";
import ChatWindow from "./Pages/ChatWindow";

function App() {
  return (
    <Router>
      <Routes>
        {/* 1 */}
        <Route element={<Layout />}>
          {/* 2 */}
          <Route
            path="/"
            element={
              <>
                <LandingPage />
                <UseCard />
              </>
            }
          />
          {/* 3 */}
          <Route
            path="/chat"
            // element={<ChatWindow userId="guest_1" threadId="session_1" />}
            element={<ChatWindow />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
