import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import NotFound from './pages/NotFound';
import VerifyEmail from './pages/VerifyEmail';
import { useAppDispatch } from './store/hooks';
import { fetchCurrentUser } from './store/slices/authSlice';
import { fetchAllBranches, fetchNearestBranch } from './store/slices/branchSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(fetchNearestBranch({ lat: latitude, lng: longitude }));
        },
        (error) => {
          console.warn('Location access denied or blocked:', error);
          dispatch(fetchAllBranches({}));
        },
        { timeout: 8000 }
      );
    } else {
      dispatch(fetchAllBranches({}));
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
