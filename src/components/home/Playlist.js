import React, { useEffect , useState } from "react";
import Image from "next/image";
import SpotifyLogo from '../../../public/assets/spotify_logo.png'
import ArrowIcon from '../../../public/assets/right-arrow-icon.png'
import classes from './Playlist.module.css'

const Playlist = ({name , session}) => {
    const [playlists , setPlaylists] = useState([])
    useEffect(() => {
        
        const getPlaylist = async () => {
            const response = await fetch('https://api.spotify.com/v1/me/playlists' , {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session.user.accessToken}`
                }
            })
            const data = await response.json()
            setPlaylists(data.items)
        }
        getPlaylist()
    } , [session])

    console.log(playlists)

    return (
    <div className={classes.playlistContainer}>
        <div className={classes.playlist}>
            <div className={classes.playlistHeader}>
                <h3>Your {name} Account</h3>
                <Image src={SpotifyLogo} height={30} width={30}/>
            </div>
            <div className={classes.playlistCountContainer}>
                <div className={classes.playlistCountContent}>
                <h4>Playlists</h4>
                <span>({playlists.length})</span>
                </div>
            </div>
            <div className={classes.playlistsRowsContainer}>
            {playlists.map((playlist) => {
                return (
                <div className={classes.playlistRowContainer}>
                    <div className={classes.playlistRowLeftContent}>
                    <input type={"checkbox"}/>
                    <Image src={playlist.images[0].url} width={60} height={60}/>
                    </div>
                    <div className={classes.playlistRowRightContent}>
                    <p>{playlist.name}</p>
                    <span>0 / {playlist.tracks.total} Selected</span>
                    </div>
                    <div className={classes.playlistRowArrowContainer}>
                        <span className={classes.playlistRowArrow}><Image src={ArrowIcon} height={13} width={13}/></span>
                    </div>
                </div>
                )
            })}
            </div>
        
        </div>
    <div className={classes.destinationButtonContainer}>
        <button className={classes.destinationButton}> Select Transfer Platform</button>
    </div>
    </div>
    )
}



export default Playlist