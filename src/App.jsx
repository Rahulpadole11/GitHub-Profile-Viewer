import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileViewer from './components/ProfileViewer';
import Home from './pages/Home';

function App() {
  
  
  return (
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ProfileViewer" element={<ProfileViewer />} />
      </Routes>
    </Router>
 
  );

}

export default App;
