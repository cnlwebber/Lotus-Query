// Routing setup (modifying the URL and determining what components to render)
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import Navbar from './components/Navbar';
import Scry from './pages/Scry';
import Search from './pages/Search'
import SearchHelp from './pages/SearchHelp'
import Random from './pages/Random';

// defines routes and their corresponding components for the front end
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/help" element={<SearchHelp />} />
        <Route path="/random" element={<Random />} />
        <Route path="/scry/:scryfall_id" element={<Scry />} />
      </Routes>
    </Router>
  );
}

export default App;
