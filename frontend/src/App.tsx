import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PodcastProvider } from './hooks/usePodcastStore';
import PodcastListPage from './pages/PodcastListPage';
import EpisodeDetailPage from './pages/EpisodeDetailPage';
import GlobalPlayer from './components/player/GlobalPlayer';

function App() {
  return (
    <PodcastProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<PodcastListPage />} />
            <Route path="/episode/:id" element={<EpisodeDetailPage />} />
          </Routes>
          <GlobalPlayer />
        </div>
      </Router>
    </PodcastProvider>
  );
}

export default App;