import { useState, useEffect } from 'react';
import '../App.css';

import axios from 'axios';

const baseURL = "https://api.spotify.com/v1/search"


function App() {
  
  const CLIENT_ID = '53df0a335bc4421fa5534bb8392d7880';
  const REDIRECT_URI = 'http://localhost:3000';

  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';


  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtist] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token)
  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
    })

    setArtist(data.artists.items)
  }

  const renderArtists = () => {
    return artists.map(artist => {
      return <div key={artist.id}>
        {artist.images.length ? <img width={'100%'} src={artist.images[0].url} alt="" /> : <div>No Image</div>}
        {artist.name}
      </div>
    })
  }

  return (
    <div>
      <div>
        <h1>Musica!</h1>
        {!token ? 
          <h3><a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login To Spotify</a></h3>
          : <button onClick={logout}>Logout</button>
        }
      </div>
      <form onSubmit={searchArtists}>
        <input 
          type='text' 
          placeholder='Search Artist'
          onChange={e => setSearchKey(e.target.value)}
        />
        <button type='submit'>Search</button>
      </form>
      <div>
        {renderArtists()}
      </div>
    </div>
  );
}


export default App;
