import { Component } from 'react'

import Option from './Option'

export default class ShowArtist extends Component {

    state = {
        artist: {},
        albums: [],
    }
    
    componentDidMount() {
        fetch(this.props.showURL, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${this.props.token}`
            }
        })
        .then(response => response.json())
        .then(response => this.setState({artist: response }))
        .catch(error => {
            console.log(error, "error")
        })
        fetch(`${this.props.showURL}/albums`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${this.props.token}`
            }
        })
        .then(response => response.json())
        .then(response => this.setState({albums: response.items}))
    }

    displayGenres = () => {
        return !this.state.artist.genres 
                ? <h1>Loading..</h1>
                : this.state.artist.genres.map(genres => <li key={genres.index}>{genres}</li>)
    }
    
    render() {

        console.log(this.state.artist, "My render now.")
        console.log(this.state.albums, "the albums")
        
        return (
            <div>
            <Option />
            <h1>Name: {this.state.artist.name}</h1>
            <h2>{this.state.artist.type}</h2>
            <h2>Popularity: {this.state.artist.popularity}</h2>
            <div>
                <h3>Genres :</h3>
                {this.displayGenres()}
            </div>
        </div>
    )
}
}
