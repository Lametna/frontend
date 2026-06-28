import { Routes, Route } from 'react-router';
import { AppShell } from './components/layout/AppShell';
import { HomePage } from './features/home/pages/HomePage';
import { GamesPage } from './features/games/pages/GamesPage';
import { GameDetailsPage } from './features/games/pages/GameDetailsPage';
import { GameLobbyPage } from './features/games/pages/GameLobbyPage';
import { GameplayPage } from './features/games/pages/GameplayPage';
import { SocialPage } from './features/social/pages/SocialPage';
import { ShopPage } from './features/shop/pages/ShopPage';
import { ProfilePage } from './features/profile/pages/ProfilePage';
import { SettingsPage } from './features/settings/pages/SettingsPage';
import { AuthPage } from './features/auth/pages/AuthPage';

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/games/:id" element={<GameDetailsPage />} />
        <Route path="/games/:id/lobby" element={<GameLobbyPage />} />
        <Route path="/games/:id/play" element={<GameplayPage />} />
        <Route path="/social" element={<SocialPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
