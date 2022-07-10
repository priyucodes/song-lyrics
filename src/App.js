import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';

function App() {
  useEffect(() => {
    // const fetchData = async () => {
    //   const data = await fetch(
    //     'https://api.genius.com/songs/5830307?access_token=process.env.REACT_APP_CLIENT_ACCESS_TOKEN'
    //   );
    //   const res = await data.json();
    //   console.log(res);
    // };
    // fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <StyledParagraph>
        Lyrics Finder helps to find lyrics of a song.
        <br />
        Search by song or artist to get results.
      </StyledParagraph>
    </div>
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
