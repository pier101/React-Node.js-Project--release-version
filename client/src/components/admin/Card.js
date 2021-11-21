import React,{useState} from 'react'
import {Box,Paper,TextField,Button} from '@mui/material';
import axios from 'axios';

export default function Card() {
    const [cardContent] = useState({
        artistName:'',
        artistCardImg:'',
    });

   const cardChange = (e) => {
    cardContent[e.target.name] = e.target.value;
    console.log(cardContent)
    }
    const cardSubmit = async(e) => {
        e.preventDefault();
        const res = await axios.post(`http://localhost:5000/admin/atistcard`,{cardContent});
        const check = res.data.data
        console.log(check)
            if(check===true) {
                //아이디있으면 트루
                alert(`아티스트 중복됩니다.`);    
                //새로고침시 업데이트 되는걸 새로고침 없이 업데이트 되게 손 봐야됨
            }
            else if(check===false){
                alert(`정상등록되었다!`);

            }
    }
    return (
        <div>
            <Paper sx={{mx:'10%'}}>
                    <Box sx={{ mx:'5%', m:1, textAlign: 'center', }}> 
                    <form onChange={cardChange}>
                        <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:20, }}>Atist : name</Box>
                        <TextField type='text' name="artistName"  fullWidth   />
                        <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:20, }}>이미지 url</Box>
                        <TextField type='text' name="artistCardImg"  fullWidth /> 
                        <Button  onClick={cardSubmit} sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:20, }}  fullWidth  >카드만들기</Button> 
                    </form>
                    </Box>
                </Paper>
        </div>
    )
}
