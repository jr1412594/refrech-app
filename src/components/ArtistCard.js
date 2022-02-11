import React from 'react'

import { Link } from 'react-router-dom'
import noimageicon from '../assets/noimagecon.png'

export default function ArtistCard({ artist, getArtistID }) {

    const handleClick = () => {
        let art = artist.id
        getArtistID(art)
    }

    return (
        <div className='artist-card' onClick={handleClick}>
            <Link to='/artists'>
            <h3>{artist.name}</h3>
            {artist.images.length 
                ? <img className='album-cover' width={'70%'} height={'70%'} src={artist.images[0].url} alt="" /> 
                : <img className='album-cover' width={'70%'} height={'70%'} src={noimageicon} alt=""/>}
            </Link>
        </div>
    )
}
