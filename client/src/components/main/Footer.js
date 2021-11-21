import React,{useState}from 'react'
import {Box,Avatar,Checkbox,Divider,Button} from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {Carousel} from 'react-bootstrap'
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';

export default function Footer() {
    return (
        <div>
                    <Box sx={{ mt:5,bgcolor:'#fbfbfb', fontWeight: 'bold',textAlign: 'center', width:'100%',}}>
                        
                        <Box sx={{pt:5, fontWeight: 'bold',fontSize:20, }}> 팀프로젝트   </Box>
                        <Divider sx={{m:1,mx:'30%'}}/>  
                        <Box sx={{pt:2,fontSize:15, fontWeight: 'Medium', textAlign: 'center',color:'gray'}}>
                             <p>팀명 : 욱이와 아이들</p> 
                             <p>프로젝트 기술 : react, nodejs, MySql, material-ui, axios, sequelize,   </p> 
                             <p>조원 : 김동욱, 강해민, 장아라, 임철순    </p> 
                             <Divider sx={{m:1,mx:'30%'}}/>  
                        <Box sx={{fontWeight: 'Medium',fontSize:15,textAlign: 'center' }}>    
                             <p>©제작된 본 홈페이지에 대한 모든 권리는 팀프로젝트 귀속됩니다. 저작권이런건 없습니다.</p> 
                        </Box>
                             </Box>
                    </Box>
        </div>
    )
}
