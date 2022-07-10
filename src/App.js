import { useEffect, useState } from 'react';

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

  return <div>HHhhh</div>;
}

export default App;
