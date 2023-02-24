import React from "react";
import Image from "next/image";
import Playlist from './Playlist'
import classes from '../home/Home.module.css'
import SpotifyLogo from '../../../public/assets/spotify_logo.png'
import YoutubeLogo from '../../../public/assets/youtube_logo.png'
import { signIn, useSession } from "next-auth/react";

const Home = ({providers}) => {
    const {data: session , status} = useSession()

    if(session) {
        return (
            <div className={classes.homeContainer}>
                <Playlist name={providers.spotify.name} session={session}/>
            </div>
        )
    }

    return (
        <div className={classes.homeContainer}>
            <h2 className={classes.platformContainerTitle}>Select Source</h2>
            <div className={classes.platformContainer}>
                <div className={classes.platform} onClick={() => {signIn(providers.spotify.id , 'localhost:3000')}} >
                    <Image src={SpotifyLogo} width={100} height={100}/>
                    <span>Spotify</span>
                </div>
                <div className={classes.platform}>
                    <Image src={YoutubeLogo} width={100} height={100}/>
                    <span>Youtube</span>
                </div>
            </div>
        </div>
    )
}


export default Home