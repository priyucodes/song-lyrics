import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import SongDetails from './components/SongDetails';
import SongsList from './components/SongsList';

function App() {
  const [searchedData, setSearchedData] = useState([]);

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

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        draggable
        pauseOnHover
        style={{ fontSize: '2rem' }}
      />
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
