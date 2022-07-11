import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import SongDetails from './components/SongDetails';
import SongsList from './components/SongsList';
import Modal from 'react-modal';
const customStyles = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1d1d1d',
  },
};
Modal.setAppElement('#modal');
function App() {
  const [searchedData, setSearchedData] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);

  if (searchedData?.response?.hits.length === 0) {
    toast.error('No songs found', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        draggable
        pauseOnHover
        style={{ fontSize: '2rem' }}
      />
      <StyledModalButton onClick={() => setIsOpen(true)}>
        Note
      </StyledModalButton>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          onRequestClose={closeModal}
          // portalClassName="modal"
        >
          <StyledDMCA>
            <h2>DMCA</h2>
            <p>
              This website is not responsible for content displayed within
              pages, videos, image, music etc. All videos,music etc. is taken
              from 3rd party sites.
              <br />
              If you have any legal issues please contact appropriate media file
              owners/ hosters
            </p>
          </StyledDMCA>
        </Modal>
      )}
      <Routes>
        <Route
          path="/search"
          element={
            <>
              <Navbar
                searchedData={searchedData}
                setSearchedData={setSearchedData}
              />

              {searchedData?.response?.hits.length > 0 ? (
                <Outlet />
              ) : (
                <StyledParagraph>
                  Lyrics Finder helps to find lyrics of a song.
                  <br />
                  Search by song or artist to get results
                </StyledParagraph>
              )}
            </>
          }
        >
          <Route
            path=":input"
            element={
              <>
                <SongsList searchedData={searchedData} />
              </>
            }
          />
        </Route>
        <Route path="/lyrics/:song/:id" element={<SongDetails />} />
        <Route path="*" element={<Navigate to="/search" replace />} />
      </Routes>
    </>
  );
}

export default App;

const StyledParagraph = styled.p`
  font-size: 2rem;
  padding: 0 20px;
  font-weight: 600;
  text-align: center;
  margin-top: 10rem;
  color: #1d1d1d;
`;
const StyledModalButton = styled.button`
  padding: 2rem;
  background-color: transparent;
  border: 1px solid #1d1d1d;
  color: #fff;
  transition: all 0.5s;
  &:hover {
    background-color: #1d1d1d;
    color: #fff;
  }
`;

const StyledDMCA = styled.div`
  height: 300px;
  text-align: center;
  color: goldenrod;
  p {
    margin-top: 2rem;
    font-size: 2rem;
    color: #fff;
  }
`;
