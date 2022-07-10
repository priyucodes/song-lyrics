import styled from 'styled-components';
const Navbar = () => {
  return (
    <Header>
      <h1>Lyrics Finder Pro</h1>
      <InputContainer>
        <Input type="text" placeholder="Search for songs" />
        <Button>
          <Svg
            aria-labelledby="title desc"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 19.9 19.7"
          >
            <title id="title">Search Icon</title>
            <desc id="desc">A magnifying glass icon.</desc>
            <g fill="none" stroke="#1d1d1d">
              <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" />
              <circle cx="8" cy="8" r="7" />
            </g>
          </Svg>
        </Button>
      </InputContainer>
    </Header>
  );
};
export default Navbar;

const Header = styled.header`
  width: 100%;
  height: 25vh;
  background-color: #1d1d1d;
  text-align: center;
  color: transparent;
  display: flex;
  flex-direction: column;
  h1 {
    text-transform: uppercase;
    font-weight: 700;
    display: inline-block;
    background-image: -webkit-gradient(
      linear,
      left top,
      right top,
      from(#91eae4),
      to(#7f7fd5)
    );
    background-image: linear-gradient(to right, #91eae4, #7f7fd5);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    letter-spacing: 0.2rem;
  }
`;
const InputContainer = styled.div`
  position: relative;
  text-align: center;
`;
const Input = styled.input`
  width: 40%;
  padding: 2rem 0;
  text-align: center;
  margin: 0 auto;
  margin-top: 60px;
  outline: none;
  border: 0;
  font-size: 2rem;
  border-radius: 100px;
  @media (min-width: 300px) and (max-width: 500px) {
    width: 80%;
  }
  &:focus {
    outline: none;
    border: 0;
  }
`;
const Button = styled.button`
  width: 70px;
  height: 70px;
  background-color: #7f7fd5;
  border-radius: 50%;
  position: relative;
  left: 20px;
  bottom: 5px;
  transition: all 0.3s;
  @media (min-width: 300px) and (max-width: 500px) {
    width: 6rem;
    height: 6rem;
  }
  &:hover {
    background-color: #91eae4;
  }
`;
const Svg = styled.svg`
  width: 45px;
  height: 45px;
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;

  transition: all 0.3s;
  @media (min-width: 300px) and (max-width: 500px) {
    width: 4rem;
    height: 4rem;
  }
  &:hover {
    g {
      stroke: #1d1d1d;
    }
    stroke-width: 2px;
  }
`;
