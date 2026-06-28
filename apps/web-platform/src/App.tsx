import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router';
import { AppShell } from './components/layout/AppShell';
import { GlobalLoader } from './components/ui/GlobalLoader';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { OfflineBanner } from './components/ui/OfflineBanner';
import { NotFoundPage } from './features/errors/pages/NotFoundPage';

const HomePage = lazy(() => import('./features/home/pages/HomePage').then(m => ({ default: m.HomePage })));
const GamesPage = lazy(() => import('./features/games/pages/GamesPage').then(m => ({ default: m.GamesPage })));
const GameDetailsPage = lazy(() => import('./features/games/pages/GameDetailsPage').then(m => ({ default: m.GameDetailsPage })));
const GameLobbyPage = lazy(() => import('./features/games/pages/GameLobbyPage').then(m => ({ default: m.GameLobbyPage })));
const GameplayPage = lazy(() => import('./features/games/pages/GameplayPage').then(m => ({ default: m.GameplayPage })));
const SocialPage = lazy(() => import('./features/social/pages/SocialPage').then(m => ({ default: m.SocialPage })));
const ShopPage = lazy(() => import('./features/shop/pages/ShopPage').then(m => ({ default: m.ShopPage })));
const ProfilePage = lazy(() => import('./features/profile/pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const SettingsPage = lazy(() => import('./features/settings/pages/SettingsPage').then(m => ({ default: m.SettingsPage })));
const AuthPage = lazy(() => import('./features/auth/pages/AuthPage').then(m => ({ default: m.AuthPage })));

function App() {
  return (
    <ErrorBoundary>
      <OfflineBanner />
      <Suspense fallback={<GlobalLoader />}>
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
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
