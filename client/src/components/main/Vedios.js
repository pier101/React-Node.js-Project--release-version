import { Box } from '@mui/system'
import React from 'react'
import ReactPlayer from 'react-player'
export default function Vedios() {
    return (
        <>
            <Box sx={{mt:15,mx:'15%'}}>  
                <Box sx><h1>추천 MUSIC</h1></Box>
                <Box sx={{ display: 'flex'}}>  
                    <Box sx={{m:1, width:'50%'}}>     
                        <ReactPlayer url='https://youtu.be/_TU5Sn8aGZg' width='100%' playing controls/>
                    </Box>
                    <Box sx={{m:1, width:'50%'}}>     
                        <ReactPlayer url='https://youtu.be/Hmyr0yTDRos' width='100%' playing controls/>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
