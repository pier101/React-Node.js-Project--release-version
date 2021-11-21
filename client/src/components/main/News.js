import React,{useEffect,useState} from 'react';
import {Box,TextField} from '@mui/material';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import axios from 'axios'



export default function News() { 
  const [search,setSeach] = useState('');   
  const [Delay,setDelay] = useState('블랙핑크');   
  const  [img,setImg] = useState([]);
  const handleSubmit = () => {setDelay(search) }
  
  //검색
  useEffect(()=>{  
    axios.get(`http://localhost:5000/search?query=${Delay} `)
        .then( (res)=>{setImg(res.data.items)})
  },[Delay])

  /////////검색이름 넣어줄꺼임
    const searchChange = (event) => {
      setSeach(event.target.value); }
  

  return (
    <Box sx={{ mt: 15, mx: "15%"    }}>
        <Box ><h1>From.Atrist</h1></Box>
        <form target="iframe" onSubmit={()=>{ handleSubmit()}}>  {/* 엔터치면 넘어가게끔 form쓰셈 */}
        <TextField sx={{mt:5,mb:5}} onChange={searchChange} margin="dense"  fullWidth id="fullWidth" placeholder="검색어를 입력하세요" />
        </form>
        <iframe id="iframe" name="iframe" style={{display:"none"}}></iframe>
      <Masonry columns={4} sx={{display: 'flex',  flexWrap: 'wrap', }} spacing={{ xs: 1, sm: 2, md: 3 }}>
        {img.map((a,i) => (
          <Paper key={i} elevation={3}  sx={{ minWidth:'280px' }}>
          <Box sx={{bgcolor:'#36e7ad',color:'#6c757d',fontWeight: 'bold', textAlign: 'left'}}>
          <img
          className="d-block w-100 "
          src={a.link}
          alt="First slide"
          /> 
           {a.title}</Box> 
          </Paper>
        ))}
      </Masonry>
    </Box>
  );
}
