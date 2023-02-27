import React, { useEffect, useRef, useState , useReducer } from "react";
import Image from "next/image";
import Playlist from './Playlist'
import Platforms from './Platforms'
import classes from '../home/Home.module.css'
import { signIn, useSession } from "next-auth/react";


const reducer = (state , action) => {
    switch(action.type) {
        case 'INITIALIZE':
            return {sources : action.payload}
        case 'UPDATE_SOURCE_STATE':
            return { ...state, sources: action.payload.value}
        case 'SET_DATA':
            return {sources : action.payload}
    }
}


const Home = ({providers}) => {
    const {data: session , status} = useSession()
    const [state , dispatch] = useReducer(reducer , null)

    useEffect(() => {
        let newSources = []
        for(let provider in providers) {
            newSources.push({
                ...providers[provider],
                isSelected: false,
                isSource: false,
                isDestination: false
            })
        }
        dispatch({type: 'INITIALIZE' , payload: newSources})
    }, [])



    // const createPlatformsArr = (providers) => {
    //     let providerArr = []
    //     for(let provider in providers) {
    //         providerArr.push({
    //             ...providers[provider],
    //             isSelected: false
    //         })
    //     }
    //     setPlatforms(providerArr)
    // }

    // useEffect(() => {
    //     createPlatformsArr(providers)
    // }, [])



    if(session != undefined) { // mess around with this
        // return (
        //     <div className={classes.homeContainer}>
        //         <Playlist session={session}  sources={state.sources}/>
        //     </div>
        // )
    }

    return (
        <div className={classes.homeContainer}>
            {state ? <Platforms sources={state.sources} dispatch={dispatch} /> : "here"}
        </div>
    )
}


export default Home