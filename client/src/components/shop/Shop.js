import React,{useState,useEffect} from 'react'
import {Box,Avatar,Checkbox} from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {Carousel} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios'
import {useHistory} from "react-router";

import { pink } from '@mui/material/colors';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }


 function Shop() {
    const  [goodsCard,setGoodsCard] = useState([]);
    //로딩시 카드불러올꺼임
    useEffect(()=>{  
             axios.get(`http://localhost:5000/goodsCard`)
            .then( (res)=>{setGoodsCard(res.data)})
        },[])

    //////////////////////////////리덕스 안쓰고 페이지 넘길래
    const history = useHistory();
    const [content,setContent]  = useState({
    is_direct: 'N',                               // 결제창 방식 (DIRECT: Y | POPUP: N)
    pay_type: 'transfer',                         // 결제수단
    work_type: 'CERT',                            // 결제요청방식
    card_ver: '',                                  // DEFAULT: 01 (01: 정기결제 플렛폼, 02: 일반결제 플렛폼), 카드결제 시 필수
    payple_payer_id: '',                          // 결제자 고유ID (본인인증 된 결제회원 고유 KEY)
    buyer_no: '2335',                             // 가맹점 회원 고유번호
    buyer_name: '홍길동',                         // 결제자 이름
    buyer_hp: '01012345678',                      // 결제자 휴대폰 번호
    buyer_email: 'test@payple.kr',                // 결제자 Email
    buyer_address: '천호 경일아카데미',                // 결제자 Email
    buy_goods: '휴대폰',                          // 결제 상품
    buy_count: '',                                // 결제 상품 개수
    buy_price: '1000',                            // 결제 금액
    buy_total: '1000',                            // 결제 금액
    buy_istax: 'Y',                               // 과세여부 (과세: Y | 비과세(면세): N)
    buy_taxtotal: '',                             // 부가세(복합과세인 경우 필수)
    order_num: createOid(),                       // 주문번호
    pay_year: '',                                 // [정기결제] 결제 구분 년도
    pay_month: '',                                // [정기결제] 결제 구분 월
    is_reguler: 'N',                              // 정기결제 여부 (Y | N)
    is_taxsave: 'N',                              // 현금영수증 발행여부
    simple_flag: 'N',                             // 간편결제 여부
    auth_type: 'sms',                              // [간편결제/정기결제] 본인인증 방식 (sms : 문자인증 | pwd : 패스워드 인증)
    goods_img:'',
    goods_color:'',
    goods_size:'',
    goodsNum:'',
    userId:'',
    });
    //주문번호
   

    const Submit = (e) => {
    content.buy_total = e.goodsPrice
    content.buy_goods = e.goodsName
    content.buy_price = e.goodsPrice
    content.goods_img = e.ArtistCard.artistCardImg
    content.goodsNum = e.goodsNum
    content.userId = sessionStorage.user_id
        
      history.push({
        pathname: `/GoodsInfo/${content.goodsNum}`,
        state: {content: content},
    });
    console.log(history)
    }   
   
    
    return (
        <>
           
                <Box sx={{}}>
                    <Box sx={{ pt:'8%', pb:'5%',fontWeight: 'bold',textAlign: 'center',color:'#06e19a',fontSize:100, }}>GOOODS SHOP</Box>
                        <Box sx={{ bgcolor:'#06e19a',fontWeight: 'bold',textAlign: 'center',color:'#06e19a', }}>
                            <Box sx={{mx:'10%'}}>
                        
                        <Carousel fade>
                            <Carousel.Item  style={{ height: '600px'}} onClick={()=>{console.log('경로설정')}}>
                                <Carousel.Caption >
                                    <Box sx={{ml:8, textAlign:'center',color:'white',fontSize:50,display:'flex' }}> 
                                        <Box sx={{textAlign: 'center',mr:10 }} >
                                        <img
                                        style={{ height: '500px'}}
                                        src='https://weverseshop.io/images/mockup-3@3x.2776bd6edddab582d48095db591a427a.png'
                                        /> </Box>
                                        구쯔<br/>맛집에 오신걸 환영합니다.
                                    </Box>
                                </Carousel.Caption>
                            </Carousel.Item> 

                            <Carousel.Item  style={{ height: '600px'}} onClick={()=>{console.log('경로설정')}}>
                                <Carousel.Caption >
                                    <Box sx={{ml:8, textAlign:'center',color:'white',fontSize:50,display:'flex' }}> 
                                            <br/><br/><br/>여기가 다른데보다 전나싸여<br/>다른데 절대가지마요
                                        <Box sx={{textAlign: 'center',ml:10 }} >
                                        <img
                                        style={{height: '500px'}}
                                        src='https://weverseshop.io/images/mockup-1@3x.f104bfaaf1616a890572339c59a22184.png'
                                        /></Box>
                                    </Box>
                                </Carousel.Caption>
                            </Carousel.Item> 

                            <Carousel.Item  style={{ height: '600px'}} onClick={()=>{console.log('경로설정')}}>
                                <Carousel.Caption >
                                    <Box sx={{ml:8,mb:25, textAlign:'center',color:'white',}}> 
                                    <h1 >80%~90% Season Off</h1>
                                        <h3>전품목 시즌오프~!! </h3> <h3> 드루와 드루와 </h3>
                                        <p> This is a simple hero unit, a simple jumbotron-style component for calling
                                            extra attention to featured content or information.</p>
                                        </Box>
                                </Carousel.Caption>
                            </Carousel.Item> 
                        </Carousel>
                         </Box>
                         </Box>
{/* ///////////////////////////////////// */}
                    {/* 상품검색만들어보자 */}

                    {/* 가수 별 상품나열 */}

                    <Box sx={{ pt:'10%',fontWeight: 'bold',textAlign: 'center',color:'#06e19a',fontSize:70, }}>구경 가자가자 가자고!</Box>
                    <Box sx={{ mt:5, mx:'15%', fontWeight: 'bold',textAlign: 'center',display: 'flex',  flexWrap: 'wrap',justifyContent: 'center', }}>
                 
                    {goodsCard.map((a,i)=>{ return(
                        
                        <Box key={i}>
                            <Box type="button"  className='nav-link' onClick={()=>{Submit(a)}}>
                            <Avatar
                            alt="Remy Sharp"
                            variant="square"
                            src={a.ArtistCard.artistCardImg}
                            sx={{  borderRadius: 10 ,width: 200, height: 200, textAlign: 'center',  }}
                            /></Box>
                            <Box sx={{ml:3,display:'flex', fontSize:27, fontWeight:'bold',justifyContent: 'space-between', }}>{a.goodsName}
                                <Checkbox {...label} 
                                    sx={{color: pink[1000],'&.Mui-checked': {color: pink[300],},}} icon={<FavoriteBorder />} checkedIcon={<Favorite />} /> 
                            </Box>
                        </Box>
                    )})} 
                      
                        
                    </Box>
                </Box>
        </>
    )
}
const createOid = () => {
    const now_date = new Date();
    let now_year = now_date.getFullYear()
    let now_month = now_date.getMonth() + 1
    now_month = (now_month < 10) ? '0' + now_month : now_month
    let now_day = now_date.getDate()
    now_day = (now_day < 10) ? '0' + now_day : now_day
    const datetime = now_date.getTime();
    return 'test' + now_year + now_month + now_day + datetime;
};
export default Shop;