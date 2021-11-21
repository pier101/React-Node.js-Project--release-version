import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Box} from '@mui/material';
import { Link } from "react-router-dom";
import Feed from './feed.js'
import {Grid} from '@material-ui/core';
import './style.css'

const Menu = ({match})=>{
    console.log(match)
    const [isFeed, setIsFeed] = useState(true)
    const [isArtist, setIsArtist] = useState(false)
    const feedChanger = ()=>{
        setIsFeed(true)
        setIsArtist(false)
        console.log(isFeed)
    }
    const artistChanger = ()=>{
        setIsFeed(false)
        setIsArtist(true)
    }
    useEffect(() => {
        feedChanger()
    }, [])

    return(
        <Box sx={{mt:15}} className="artist-box" style={{display:'flex', justifyContent:"center" }}>
        <Box style={{width:400,marginRight:200}}>
            <Box position="fixed" style={{display:'flex',justifyContent:"center" }} className="aside-box">
                <Grid>
                    <Grid item xs={3} md={4}>
                        <ArtistInfo  match={match}/>
                    </Grid>
                    <Grid item xs={3} md={4}> 
                        <Box className='menu-box'>
                            <button className="menu-button" type="button" onClick={feedChanger}>Feed</button>
                            <button className="menu-button" type="button" onClick={artistChanger}>Artist</button>
                            <button className="menu-button"><Link  style={{textDecoration:"none"}} to={"/Shop"}>Shop</Link></button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
        <Box style={{width:500,marginRight:200,display:'flex',justifyContent:"center" }} className="feed-box">
            <Feed style={{textAlign:"center"}}  match={match} isFeed={isFeed} isArtist={isArtist}/>
        </Box>
    </Box>
    )
}


const ArtistInfo = ({match}) => {
    console.log(match)
    const [viewArtistInfo , setArtistInfo] = useState([]);
    const [isTrue,setIsTrue] = useState(false)
    const [isfollow, setIsFollow] = useState("follow")
    const [isFollowCounter, setIsFollowCounter] = useState(0)
    
    const follow = async()=>{
        if (!isTrue) {
            setIsTrue(true)
            setIsFollow("fllowing")
            return await axios.post(`http://localhost:5000/artist/follow/${match.params.name}`,{
                id :sessionStorage.user_id
            }).then(res=>{
                setIsFollowCounter(Number(res.data))
            })
            
        } else {
            setIsTrue(false)
            setIsFollow("follow")
            return await axios.post(`http://localhost:5000/artist/unfollow/${match.params.name}`,{
                id :sessionStorage.user_id
            }).then(res=>setIsFollowCounter(Number(res.data)))
        }
    }
    
    useEffect(()=>{
        const artistinfo =async()=> {
            const getartistinfo = await axios.get(`http://localhost:5000/artist/artistinfo/${match.params.name}`)
            console.log(getartistinfo.data)
            setArtistInfo(getartistinfo.data[0])
        }
        const followCount =async()=> {
            await axios.get(`http://localhost:5000/artist/followcounter/${match.params.name}`).then(res=>setIsFollowCounter(Number(res.data)))
        }
        artistinfo();
        followCount()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <div className="artistInfo-box">
            <div>
                <img  src={viewArtistInfo.artistCardImg} alt="artistImg" />
            </div>
            <div className='artistname'>
                <h2 >{viewArtistInfo.artistName}</h2>
                <p>{isFollowCounter} followers</p>
            </div>
            <div className='button'> 
                <button type='button' onClick={follow}>{isfollow}</button>
            </div>
        </div>
    )
}



export default Menu;



