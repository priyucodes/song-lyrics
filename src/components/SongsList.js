import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
const SongsList = ({ searchedData }) => {
  const navigate = useNavigate();
  const singleSong = searchedData?.response.hits?.map(hit => hit.result);
  const songDetailsHandler = song => {
    navigate(`/lyrics${song.path}/${song.id}`);
  };
  return (
    <StyledList>
      <ul>
        {singleSong.map(song => (
          <ListContainer key={song.id} onClick={() => songDetailsHandler(song)}>
            <img
              src={song.song_art_image_thumbnail_url}
              style={{
                width: '150px',
                objectFit: 'cover',
                borderRadius: '5px',
              }}
              alt={song.title}
            />
            <div>
              <li>{song.title}</li>
              <h3>
                {moment(
                  new Date(
                    song.release_date_components?.year || '1970',
                    song.release_date_components?.month || '1',
                    song.release_date_components?.day || '1'
                  ).toISOString()
                ).format('YYYY-MM-DD')}
              </h3>
              <p>{song.primary_artist.name}</p>
            </div>
          </ListContainer>
        ))}
      </ul>
    </StyledList>
  );
};
export default SongsList;

const StyledList = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;

  ul {
    padding: 2rem 0;
  }
  ul li {
    padding: 3rem 0;
    list-style: none;
    font-size: 1.5rem;
  }
`;

const ListContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
  width: 50%;
  transition: all 0.3s;
  &:hover {
    background-color: #1d1d1d;
    color: #fff;
    cursor: pointer;
  }
  margin-left: 30%;
  position: relative;
  @media (min-width: 300px) and (max-width: 700px) {
    margin: 0 auto;
  }
  div {
    margin-left: 3rem;
  }
`;
