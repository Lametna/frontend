import { Routes, Route } from 'react-router';
import { AppShell } from './components/layout/AppShell';
import { HomePage } from './features/home/pages/HomePage';
import { GamesPage } from './features/games/pages/GamesPage';
import { SocialPage } from './features/social/pages/SocialPage';
import { ShopPage } from './features/shop/pages/ShopPage';
import { ProfilePage } from './features/profile/pages/ProfilePage';

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/social" element={<SocialPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
