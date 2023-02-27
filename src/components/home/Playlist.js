import React, { useEffect , useState , useReducer } from "react";
import Platforms from './Platforms'
import Image from "next/image";
import SpotifyLogo from '../../../public/assets/spotify_logo.png'
import ArrowIcon from '../../../public/assets/right-arrow-icon.png'
import classes from './Playlist.module.css'



const Playlist = (props) => {
    const [playlists , setPlaylists] = useState([])
    const [loadSelectedPlaylist , setLoadedSelectedPlaylist] = useState([])
    const [transferButton , setTransferButton] = useState(false)


    useEffect(() => {
        const getPlaylist = async () => {
            const response = await fetch('https://api.spotify.com/v1/me/playlists' , {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${props.session.user.accessToken}`
                }
            })
            const data = await response.json()
            setPlaylists(createPlaylistsArr(data.items))
        }

        getPlaylist()
    } , [props.session])


    const createPlaylistsArr = (playlists) => {
        let arr = [] // rewrite using map ?
        playlists.forEach((playlist) => {
            arr.push({
                ...playlist,
                isSelected: false,
            })
        })
        return arr
    }

    const updateCheckboxStatus = (playlists , index) => {
        if(playlists[index].isSelected == false) {
            playlists[index].isSelected = true
        } else { 
            playlists[index].isSelected = false
        }
        setPlaylists([...playlists])
    }

    const getPlaylistTracks = async (playlist , index , e) => {
        if(e.target.checked) {
            const response =  await fetch(`${playlist.tracks.href}` ,{
            headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${props.session.user.accessToken}`
                }
        })
        const data =  await response.json()
        setLoadedSelectedPlaylist([...loadSelectedPlaylist , data])
        } else {
            const newLoadedPlaylist = loadSelectedPlaylist.filter((loadedPlaylist) => !loadedPlaylist.href.includes(playlist.id))
            setLoadedSelectedPlaylist(newLoadedPlaylist)
        }
    } 

    const getButtonStyle = () => {
        if(playlists.find((playlist) => playlist.isSelected != false)) {
            return classes.activeButton
        } else {
            return classes.destinationButton
        }   
    }

    if(transferButton) {
        return (
            <Platforms sources={props.sources} />
        )
    } 

    return (
    <div className={classes.playlistContainer}>
        <div className={classes.playlist}>
            <div className={classes.playlistHeader}>
                <Image className={classes.playlistHeaderUserLogo} src={props.session.user.image} height={50} width={50}/>
                <h3>{props.sources[0].name} Account</h3>
                <Image src={SpotifyLogo} height={30} width={30}/>
            </div>
            <div className={classes.playlistCountContainer}>
                <div className={classes.playlistCountContent}>
                <h4>Playlists</h4>
                <span>({playlists.length})</span>
                </div>
            </div>
            <div className={classes.playlistsRowsContainer}>
            {playlists.map((playlist , index) => {
                return (
                <div className={classes.playlistRowContainer}>
                    <div className={classes.playlistRowLeftContent}>
                    <input type={"checkbox"} onChange={(e) => {updateCheckboxStatus(playlists , index) , getPlaylistTracks(playlist , index , e)}}/>
                    <Image src={playlist.images[0].url} width={60} height={60}/>
                    </div>
                    <div className={classes.playlistRowRightContent}>
                    <p>{playlist.name}</p>
                    <span> {playlist.isSelected ? `${playlist.tracks.total} / ${playlist.tracks.total} Selected` : `0 / ${playlist.tracks.total} Selected`}</span>
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
        <button className={getButtonStyle()} onClick={() => {setTransferButton(true)}} > Select Transfer Platform</button>
    </div>
    </div>
    )
}



export default Playlist