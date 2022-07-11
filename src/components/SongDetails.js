import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { fetchSongsById } from '../libs/fetchApi';
const SongDetails = () => {
  const [song, setSong] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lyrics, setLyrics] = useState('');
  const { id, song: songPath } = useParams();
  useEffect(() => {
    const fetchSongs = async () => {
      const currentSong = await fetchSongsById(id);
      setSong(currentSong);
    };
    fetchSongs();
  }, [id]);
  const getLyricsHandler = async () => {
    // const path = url.split('/')[3];
    const data = await fetch(`http://127.0.0.1:3001/lyrics/${songPath}`);
    const { lyrics } = await data.json();

    setLyrics(lyrics);
  };
  const playSongsHandler = async song => {
    setIsPlaying(!isPlaying);
    console.log(song.response.song.media[0].url);
  };
  console.log(song);
  return (
    <Container>
      <Link
        to="/search"
        style={{
          color: '#1d1d1d',
          fontSize: '30px',
          position: 'absolute',
          left: 0,
        }}
      >
        {'< '}Go Back
      </Link>

      {song.length !== 0 && (
        <div>
          <img
            src={song.response.song.header_image_url}
            style={{ width: '400px', borderRadius: '10px' }}
            alt={
              song.response.song?.album?.full_title || song.response.song.title
            }
          />
          <h2>{song.response.song.title}</h2>
          <h3>{song.response.song.full_title}</h3>
          <button onClick={getLyricsHandler}>Get Lyrics</button>
          <Controls>
            <PlayButton onClick={song => playSongsHandler(song)}>
              {isPlaying ? (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z"></path>
                </svg>
              ) : (
                <>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"></path>
                  </svg>
                  <audio src={song.response.song.media[0].url}></audio>
                </>
              )}
            </PlayButton>
            <PauseButton>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm96 328c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h160c8.8 0 16 7.2 16 16v160z"></path>
              </svg>
            </PauseButton>
          </Controls>
          {lyrics.length > 1 && <LyricsPara>{lyrics}</LyricsPara>}
          {console.log(lyrics)}
        </div>
      )}
    </Container>
  );
};
export default SongDetails;

const Container = styled.div`
  display: flex;

  justify-content: center;
  width: 100%;

  div {
    margin-top: 2rem;
  }
  button {
    margin-top: 1rem;
    background-color: #1d1d1d;
    color: #fff;
    padding: 2.2rem;
    border-radius: 100px;
    outline: none;
    border: royalblue 2px solid;
    transition: all 0.5s;
    cursor: pointer;
    &:hover {
      background: royalblue;
      border: #1d1d1d 2px solid;
    }
  }
`;
const Controls = styled.div`
  button {
    background-color: transparent;
    padding: 1rem;
  }
  svg {
    width: 50px;
    height: 50px;
  }
`;
const PlayButton = styled.button``;
const PauseButton = styled.button`
  margin-left: 20px;
`;

const LyricsPara = styled.pre`
  font-size: 2rem;
  width: 500px;
`;
