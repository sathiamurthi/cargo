// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import RefreshComponent from './components/RefreshComponent';
import PigionConnectApp from './business-app1/src/App';
import BusinessApp2 from './business-app2/src/App';
import ProtectedLogin from './components/ProtectedLogin'; // Import the ProtectedLogin
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <Router>
    <RefreshComponent />
    <Routes>
      <Route path="/login" element={<ProtectedLogin />} /> {/* Use ProtectedLogin instead */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/business-app1/*" element={<ProtectedRoute element={PigionConnectApp} />} />
      <Route path="/business-app2/*" element={<ProtectedRoute element={BusinessApp2} />} />
    </Routes>
  </Router>
);

export default App;
