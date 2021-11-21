import React, { useState } from "react";
import {Carousel} from 'react-bootstrap'
import { Box } from '@mui/system';
export default function Goods() {
  let [구쯔,set구쯔] = useState([
    {goodsNum:1, goodsSale: "10%", goodsName:'내가제일날나가 빽',goodsPrice:5000,goodsImg:"https://cdn-contents.weverse.io/admin/xlx2048/jpg/1c9a49d6725c4cff94802adee73b3591992.jpg"},
    {goodsNum:2,goodsSale: "5%", goodsName:'잘가요내사랑빽',goodsPrice:10000,goodsImg:"https://cdn-contents.weverse.io/admin/xlx2048/png/0d1c0a2d47b24cbe88d3e37ef41e1048379.png"},
    {goodsNum:3,goodsSale: "30%", goodsName:'시장이 붐바야',goodsPrice:10000,goodsImg:"https://cdn-contents.weverse.io/admin/xlx2048/png/9748dae239044e65835bd894768beebe971.png"},
  ])

    return(
      <>
      <Box sx={{mt: 15, mx: "13%",}}>   
       <Carousel fade>
         {구쯔.map((상품,i)=>{
               return(
        <Carousel.Item key={i} style={{ height: '500px', cursor:'pointer'  }} onClick={()=>{console.log('경로설정')}}>
          <img
            className="d-block w-100 "
            src={상품.goodsImg}
            alt="First slide"
            />
          <Carousel.Caption >
            
           
            <h1 >{상품.goodsSale} Season Off</h1>
            <h3>{상품.goodsName}  </h3> <h3> Price:{상품.goodsPrice} </h3>
            <p> This is a simple hero unit, a simple jumbotron-style component for calling
                extra attention to featured content or information.</p>
          </Carousel.Caption>
        </Carousel.Item>
        )})};
       
     

      </Carousel>
      </Box>
    </>
)}