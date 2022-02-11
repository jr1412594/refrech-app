import React from 'react'
import ArtistCard from './ArtistCard'
import Option from './Option'

export default function Artists({
    handleChange,
    artists,
    searchArtists,
    getArtistID
}) {
    
    const renderArtists = () => {
        return artists.map(artist => {
            return <ArtistCard key={artist.id} artist ={artist} getArtistID={getArtistID}/>
        })
    }


    return (
        <div>
            <Option />
            <h1>Artists</h1>
            <form 
                className='artist-search' 
                onSubmit={searchArtists}
            >
                <input
                    type='text'
                    placeholder='Search Artist'
                    onChange={handleChange}
                />
                <button type='submit'>Search</button>
            </form>
            <div className='artist-container'>
                {renderArtists()}
            </div>
        </div>
    )
}
