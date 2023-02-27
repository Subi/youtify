import React from "react";
import Image from "next/image";
import classes from '../home/Home.module.css'
import SpotifyLogo from '../../../public/assets/spotify_logo.png'
import YoutubeLogo from '../../../public/assets/youtube_logo.png'
import { signIn } from "next-auth/react";


const Platforms = (props) => {
    const getPlatformLogo = (name) => {
        switch(name) {
            case "spotify":
                return SpotifyLogo
            case "youtube":
                return YoutubeLogo    
        }
    }

    const updatePlatformStatus = (source,index) => {
        if(!props.sources.find(source => source.isSelected !=  false)) {
            source.isSource = true
            props.dispatch({type: "UPDATE_SOURCE_STATE" ,  payload: {index: index , value: props.sources}})
        }
        // if(platforms[index].isSelected  ==  false) {
        //     platforms[index].isSelected =  true
        // } else {
        //     platforms[index].isSelected = false
        // }
        // setPlatforms([...platforms])
    }

    
    const addSource = (source) => {
        newSources.current.push(source)
    }


    const isSourceSelected = () => {
            return props.sources.find(source => source.isSource != true)
    }

    return (
            <div className={classes.platformContainer}>
                <h2 className={classes.platformContainerTitle}>
                    Select {isSourceSelected ? "Source" : "Destination"}
                </h2>
                <div className={classes.platformCarosuel}>
                    {props.sources.map((source , index) => {
                        return (
                        <div className={classes.platform} onClick={() => {updatePlatformStatus(source , index) ,  signIn(source.id , 'localhost:3000')}} >
                        <Image src={getPlatformLogo(source.id)} width={70} height={70}/>
                        <span>{source.id.charAt(0).toUpperCase() + source.id.slice(1)}</span>
                        </div>
                        )
                    })}
                </div>
            </div>
    )
    
}



export default Platforms