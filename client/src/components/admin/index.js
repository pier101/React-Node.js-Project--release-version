import { Box } from '@mui/system';
import React from 'react'
import Card from './Card';
import Goods from './Goods';
import Post from './Post';

function Admin() {
    return (
        <Box sx={{mt:15}}>   
            <Card />
            <Goods/>
            <Post />
        </Box>
    )
}
export default Admin;