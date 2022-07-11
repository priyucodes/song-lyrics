import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { fetchSongsById } from '../libs/fetchApi';
const SongDetails = () => {
  const [song, setSong] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reactPlayer, setReactPlayer] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
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
    const data = await fetch(
      `https://get-lyrics-api.herokuapp.com/lyrics/${songPath}`
    );

    const { lyrics } = await data.json();

    setLyrics(lyrics);
  };
  const playSongsHandler = async song => {
    setIsPlaying(!isPlaying);
    const displayStyle = {
      display: showVideo ? 'block' : 'none',
    };
    console.log(song.response.song.media);
    setReactPlayer(
      <ReactPlayer
        url={
          song.response.song.media.filter(
            item => item.provider === 'youtube'
          )[0].url ??
          song.response.song.media.filter(
            item => item.provider === 'soundcloud'
          )[0].url
        }
        playing={!isPlaying ? true : false}
        style={displayStyle}
        config={{
          youtube: {
            playerVars: { showinfo: 1 },
          },
          soundcloud: {
            options: { autoPlay: true },
          },
        }}
      />
    );
  };
  const pauseHandler = () => {
    setReactPlayer(null);
    setIsPlaying(false);
  };
  const showVideoHandler = () => {
    setShowVideo(prevState => !prevState);
  };
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
            <PlayButton onClick={() => playSongsHandler(song)}>
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
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"></path>
                  </svg>
                </>
              )}
            </PlayButton>
            <PauseButton onClick={pauseHandler}>
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
            <ShowVideoButton onClick={showVideoHandler}>
              <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 122.88 111.34"
                fill="currentColor"
                stroke="currentColor"
              >
                <title>video</title>
                <path d="M23.59,0h75.7a23.68,23.68,0,0,1,23.59,23.59V87.75A23.56,23.56,0,0,1,116,104.41l-.22.2a23.53,23.53,0,0,1-16.44,6.73H23.59a23.53,23.53,0,0,1-16.66-6.93l-.2-.22A23.46,23.46,0,0,1,0,87.75V23.59A23.66,23.66,0,0,1,23.59,0ZM54,47.73,79.25,65.36a3.79,3.79,0,0,1,.14,6.3L54.22,89.05a3.75,3.75,0,0,1-2.4.87A3.79,3.79,0,0,1,48,86.13V50.82h0A3.77,3.77,0,0,1,54,47.73ZM7.35,26.47h14L30.41,7.35H23.59A16.29,16.29,0,0,0,7.35,23.59v2.88ZM37.05,7.35,28,26.47H53.36L62.43,7.38v0Zm32,0L59.92,26.47h24.7L93.7,7.35Zm31.32,0L91.26,26.47h24.27V23.59a16.32,16.32,0,0,0-15.2-16.21Zm15.2,26.68H7.35V87.75A16.21,16.21,0,0,0,12,99.05l.17.16A16.19,16.19,0,0,0,23.59,104h75.7a16.21,16.21,0,0,0,11.3-4.6l.16-.18a16.17,16.17,0,0,0,4.78-11.46V34.06Z" />
              </svg>
            </ShowVideoButton>
            {reactPlayer && reactPlayer}
          </Controls>
          {lyrics.length > 1 && <LyricsPara>{lyrics}</LyricsPara>}
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
  @media (min-width: 300px) and (max-width: 500px) {
    margin-left: 20rem;
  }

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
const ShowVideoButton = styled.button`
  margin-left: 20px;
`;

const LyricsPara = styled.pre`
  font-size: 2rem;
  width: 500px;
  @media (min-width: 300px) and (max-width: 500px) {
    font-size: 1.6rem;
  }
`;
