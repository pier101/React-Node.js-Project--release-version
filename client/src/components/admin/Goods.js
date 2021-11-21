import React,{useState,useEffect} from 'react'
import {Box,Paper,TextField,Button,InputLabel,MenuItem,FormControl,Select     } from '@mui/material';
import axios from 'axios';

export default function Goods() {
////아티스트카드에서 가수이름불러오겠다.
const  [artistCard,setArtistCard] = useState([]);
    //로딩시 카드불러올꺼임
    useEffect(()=>{  
             axios.get(`http://localhost:5000/artistCard`)
            .then( (res)=>{setArtistCard(res.data)})
        },[])
////////////////////////////////////////////

    const [Content] = useState({
        goodsName:'',
        goodsPrice:'',
        goodsContent:'',
        artistName:'',
    });

    const Change = (e) => {
        Content[e.target.name] = e.target.value;
        }
        
        const Submit = async(e) => {
            e.preventDefault();
            console.log("goods")
        
        if(Content.goodsName.length<7){
        const res = await axios.post(`http://localhost:5000/admin/goods`,{Content});
        const check = res.data.data
            if(check===true) {
                //아이디있으면 트루 
                alert(`현재 있는 상품입니다 확인해주세욘.`);    
                //새로고침시 업데이트 되는걸 새로고침 없이 업데이트 되게 손 봐야됨
            }
            else if(check===false){ 
                alert(`정상등록되었다!`);

            }
        }else{
            alert(`굿즈이름 6글자이내로 작성하세요`);

        }
    }    
   

    return (

        <>
        <Paper sx={{mx:'10%'}}>
            <Box sx={{ mx:'5%', m:1, textAlign: 'center', }}> 
            <form onChange={Change}>
                <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:20, }}>굿즈이름</Box>
                <TextField fullWidth name="goodsName" placeholder="6글자이내" />
                <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:20, }}>가격</Box>
                <TextField type='number'  name="goodsPrice"  fullWidth  /> 
                <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:20, }}>굿즈 할인 밑 설명</Box>
                <TextField type='text'  name="goodsContent"  fullWidth  /> 
                <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:20, }}>아티스트 고르셈</Box>
                <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <Select
                    id="demo-simple-select"
                    name="artistName"
                    onChange={Change} >
                          { artistCard.map((a,i)=>{
                        return(<MenuItem key={i} value={a.artistName}>{a.artistName}</MenuItem>)}) }
                    </Select>
                </FormControl>
                </Box>
                
                <Button  onClick={Submit} sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:20, }}  fullWidth  >굿즈 만들기</Button> 
            </form>
            </Box>
        </Paper>
        </>
    )
}
