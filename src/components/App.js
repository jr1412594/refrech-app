import { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../App.css';

import Artists from './Artists';
import Option from './Option';

import axios from 'axios';
import ShowArtist from './ShowArtist';

const baseURL = "https://api.spotify.com/v1/search"
const ArtistURL = "https://api.spotify.com/v1/artists/"
const CLIENT_ID = '53df0a335bc4421fa5534bb8392d7880';
const REDIRECT_URI = 'http://localhost:3000';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';


class App extends Component {
  
  state = {
    token: "",
    searchKey: "",
    artists: [],
    showURL: ''
  }

  componentDidMount() {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      console.log(token, "in the if");
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    this.setState({ token })
  }

  handleChange = (event) => {
    this.setState({searchKey: event.target.value});
  }

  getArtistID = (art) => {
    this.setState({showURL: `${ArtistURL}${art}`});
  }

  logout = () => {
    this.setState({token: ""})
    window.localStorage.removeItem("token")
  }
    
  searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${this.state.token}`
      },
      params: {
        q: this.state.searchKey,
        type: "artist,track,playlist,album",
        include_external: "audio"
      }
    })
    this.setState({artists: data.artists.items})
  }

  loggedIn = () => {
    return !this.state.token 
    ? <h3><a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login To Spotify</a></h3>
    : <div><button onClick={this.logout}>Logout</button><span><h1>Musica!</h1></span></div>
  }

  render() {

    return (
      <Router>
        <Routes>
          <Route exact path='/'
            element={
              <div>
                <div>
                  {this.loggedIn()}
                </div>
              <div>
              {
              !this.state.token 
                ? <h1>Log in to experience</h1> 
                : <Option /> 
              }
              </div>
            </div>}
          />
          </Routes>
        <Routes>
          <Route path='/search'
            element={<Artists 
              handleChange={this.handleChange} 
              // setArtist={this.state.artist}
              artists={this.state.artists}
              searchArtists={this.searchArtists}
              getArtistID={this.getArtistID}
            />}
          />
        </Routes>
        <Routes>
          <Route 
            path="/artists" 
              element={<ShowArtist  
                  showURL={this.state.showURL}
                  token={this.state.token}
                />
              } 
          />
        </Routes>
      </Router>
    );
  }
}

export default App;
