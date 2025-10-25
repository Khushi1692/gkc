import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import NotFound from './pages/NotFound';
import VerifyEmail from './pages/VerifyEmail';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchCurrentUser } from './store/slices/authSlice';
import {
  fetchAllBranches,
  fetchNearestBranch,
  loadBranchFromStorage,
  setSelectedBranch,
} from './store/slices/branchSlice';
import Cart from './pages/Cart';
import BranchConfirmationModal from './components/BranchConfirmationModal';
import SelectBranchModal from './components/SelectBranchModal';
import MyOrders from './pages/MyOrders';
import ContactUs from './pages/ContactUs';
import { APIProvider } from '@vis.gl/react-google-maps';
import AboutUs from './pages/AboutUs';
function App() {
  const dispatch = useAppDispatch();
  const { nearestBranch, selectedBranch } = useAppSelector((s) => s.branch);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);

  const skipSelectBranch = localStorage.getItem('skipSelectBranch') === 'true';

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadBranchFromStorage());
  }, [dispatch]);

  useEffect(() => {
    const savedBranch =
      selectedBranch || JSON.parse(localStorage.getItem('selectedBranch') || 'null');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          dispatch(fetchNearestBranch({ lat: latitude, lng: longitude }))
            .unwrap()
            .then((res) => {
              if (res.data) {
                const nearest = res.data;

                const ignoreKey = localStorage.getItem('ignoreNearestBranchFor');
                const shouldIgnore =
                  ignoreKey && savedBranch && ignoreKey === `${savedBranch._id}_${nearest._id}`;

                if (savedBranch && savedBranch._id !== nearest._id && !shouldIgnore) {
                  setShowConfirmModal(true);
                } else if (!savedBranch) {
                  dispatch(setSelectedBranch(nearest));
                }
              }
            });
        },
        () => {
          dispatch(fetchAllBranches({}))
            .unwrap()
            .then(() => {
              if (!selectedBranch && !skipSelectBranch) {
                setShowSelectModal(true);
              }
            });
        },
        { timeout: 8000 }
      );
    } else {
      dispatch(fetchAllBranches({}))
        .unwrap()
        .then(() => {
          if (!selectedBranch && !skipSelectBranch) {
            setShowSelectModal(true);
          }
        });
    }
  }, [dispatch, selectedBranch, skipSelectBranch]);

  const handleConfirm = (dontAskAgain: boolean) => {
    if (dontAskAgain && selectedBranch && nearestBranch) {
      localStorage.setItem('ignoreNearestBranchFor', `${selectedBranch._id}_${nearestBranch._id}`);
    }

    if (selectedBranch) {
      localStorage.setItem('selectedBranch', JSON.stringify(selectedBranch));
    }

    setShowConfirmModal(false);
  };

  const handleChangeBranch = (dontAskAgain: boolean) => {
    if (nearestBranch) {
      dispatch(setSelectedBranch(nearestBranch));

      if (dontAskAgain && selectedBranch) {
        localStorage.setItem(
          'ignoreNearestBranchFor',
          `${selectedBranch._id}_${nearestBranch._id}`
        );
      }
    }

    setShowConfirmModal(false);
  };

  const handleSelectBranch = (branch: any) => {
    dispatch(setSelectedBranch(branch));
    setShowSelectModal(false);
  };

  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <BrowserRouter>
          <Navbar onSelectBranchClick={() => setShowSelectModal(true)} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>

        {showConfirmModal && (
          <BranchConfirmationModal
            open={showConfirmModal}
            nearestBranchName={nearestBranch?.name || ''}
            selectedBranchName={selectedBranch?.name || ''}
            onConfirm={handleConfirm}
            onChangeBranch={handleChangeBranch}
            onClose={() => setShowConfirmModal(false)}
          />
        )}

        {showSelectModal && (
          <SelectBranchModal
            open={showSelectModal}
            onSelect={handleSelectBranch}
            onClose={() => setShowSelectModal(false)}
          />
        )}
      </APIProvider>
    </>
  );
}

export default App;
