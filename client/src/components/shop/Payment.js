import React,{useState,useEffect}from 'react'
import {Box,Avatar,Divider,Button,TextField} from '@mui/material';
import Footer from '../main/Footer'
import axios from 'axios';

import DaumPostcode from "react-daum-postcode";


import {useLocation, useHistory} from "react-router";
import {authenticate} from "./common/authenticate";
   
 function Payment() {
    const[post,setPost]=useState({
        name:'',
        phoen:'',
        email:'',
        address:'',
    })
    const [user, setUser] = useState([])
    useEffect(()=>{  
        axios.get(`http://localhost:5000/mypage/${sessionStorage.user_id}`)
       .then( (res)=>{setUser(res.data)})
   },[post])
    ////////////////결제
    window.onpopstate = (e) => {
        if (e) {
            window.MainBodyAction('close');
        }
    }
    const location = useLocation();
    const history = useHistory();
    const content = location.state.content !== null || undefined ? location.state.content : null;

    let [payResult] = useState({});
    /* 결과를 받고자 하는 callback 함수 (callback 함수를 설정할 경우 PCD_RST_URL 이 작동하지 않음)
     * ref: http://docs.payple.kr/faq/pay/callback
     */
    const getResult = (res) => {
        if (res.PCD_PAY_RST === 'success') {
            payResult = res;

            // 전달받은 결제 파라미터값을 state에 저장 후  '/react/order_result'로 이동
            history.push({
                pathname: '/react/order_result',
                state: {payResult: payResult},
            });
        } else {
            /////////////////////////////////////////여기엑시오스해서 저장할꺼보내야도미
            axios.post(`http://localhost:5000/goodsOder`,{content});
            history.push({
                pathname: '/',
            });
            window.alert('결제가완료됬어유~~');
        }

    }

    /*
     *  결제창에 보낼 파라미터 세팅 ('결제하기' 버튼 클릭시 호출)
     *  ref: http://docs.payple.kr/bank/pay/outline (빌링키방식 transfer)
     *  ref: http://docs.payple.kr/card/pay/outline (빌링키방식 card)
     */
    const handleClick = (e) => {
        e.preventDefault();
        const obj = {};
        
        obj.PCD_PAY_TYPE = content.pay_type;			             // (필수) 결제 방법 (transfer | card)
        obj.PCD_PAY_WORK = content.work_type;			             // (필수) 결제요청 업무구분 (AUTH : 본인인증+계좌등록, CERT: 본인인증+계좌등록+결제요청등록(최종 결제승인요청 필요), PAY: 본인인증+계좌등록+결제완료)
        obj.PCD_CARD_VER = content.card_ver || '01';			     // DEFAULT: 01 (01: 정기결제 플렛폼, 02: 일반결제 플렛폼), 카드결제 시 필수
        obj.PCD_PAYER_AUTHTYPE = content.auth_type;				     // (선택) [간편결제/정기결제] 본인인증 방식 (sms : 문자인증 | pwd : 패스워드 인증)

        // IOS, AOS앱 및 인앱브라우저에서는 결제창 호출 방식을 다이렉트로 연결해 주세요.
        // content.is_direct === 'Y' 인 경우, POST 요청을 처리할 서버 도메인을 입력해 주세요.
        // direct(절대경로): https://payple.kr/sample/pay.html | popup(상대경로) https:// 로 시작하지 않고, 중간경로( /sample/pay.html)를 표기한 URL
        // ref: http://docs.payple.kr/faq/pay/callback
        if (content.is_direct === 'Y' ? obj.PCD_RST_URL = process.env.REACT_APP_REMOTE_HOSTNAME + '/react/api' : obj.PCD_RST_URL = '/react/order_result') ;
        // obj.PCD_RST_URL = pcd_rst_url;							 // (필수) 결제(요청)결과 RETURN URL

        obj.payple_auth_file = '';	                                 // 인증파일경로 /절대경로/payple_auth_file (node.js => [app.js] app.post('/pg/auth', ...) {..}

        // (선택) 결과를 받고자 하는 callback 함수명 (callback함수를 설정할 경우 PCD_RST_URL 이 작동하지 않음)
        // ref: http://docs.payple.kr/faq/pay/callback
        obj.callbackFunction = getResult;

        /*
         *  빌링키 등록 (pay_work === 'AUTH')
         */
        if (content.pay_type === 'AUTH') {
            obj.PCD_PAYER_NO = content.buyer_no;					  // (선택) 가맹점 회원 고유번호 (결과전송 시 입력값 그대로 RETURN)
            obj.PCD_PAYER_NAME = content.buyer_name;				  // (선택) 결제자 이름
            obj.PCD_PAYER_HP = content.buyer_hp;					  // (선택) 결제자 휴대폰 번호
            obj.PCD_PAYER_EMAIL = content.buyer_email;				  // (선택) 결제자 Email
            obj.PCD_TAXSAVE_FLAG = content.is_taxsave;				  // (선택) 현금영수증 발행여부
            obj.PCD_REGULER_FLAG = content.is_reguler;				  // (선택) 정기결제 여부 (Y|N)
            obj.PCD_SIMPLE_FLAG = content.simple_flag;				  // (선택) 간편결제 여부 (Y|N)
        }
        /*
         *  최초결제 및 단건(일반,비회원)결제
         */
        else {
            // 간편결제 여부('N') or 결제창 버전 빈 값
            if (content.simple_flag !== 'Y' || content.payple_payer_id === '') {
                obj.PCD_PAYER_NO = content.buyer_no;				  // (선택) 가맹점 회원 고유번호 (결과전송 시 입력값 그대로 RETURN)
                obj.PCD_PAYER_NAME = content.buyer_name;			  // (선택) 결제자 이름
                obj.PCD_PAYER_HP = content.buyer_hp;				  // (선택) 결제자 휴대폰 번호
                obj.PCD_PAYER_EMAIL = content.buyer_email;			  // (선택) 결제자 Email
                obj.PCD_PAY_GOODS = content.buy_goods;				  // (필수) 결제 상품
                obj.PCD_PAY_TOTAL = content.buy_total;				  // (필수) 결제 금액
                obj.PCD_PAY_TAXTOTAL = content.buy_taxtotal;		  // (선택) 부가세 (복합과세인 경우 필수)
                obj.PCD_PAY_ISTAX = content.buy_istax;				  // (선택) 과세여부 (과세: Y | 비과세(면세): N)
                obj.PCD_PAY_OID = content.order_num;				  // 주문번호 (미입력 시 임의 생성)
                obj.PCD_REGULER_FLAG = content.is_reguler;			  // (선택) 정기결제 여부 (Y|N)
                obj.PCD_PAY_YEAR = content.pay_year;				  // (PCD_REGULER_FLAG = Y 일때 필수) [정기결제] 결제 구분 년도 (PCD_REGULER_FLAG : 'Y' 일때 필수)
                obj.PCD_PAY_MONTH = content.pay_month;				  // (PCD_REGULER_FLAG = Y 일때 필수) [정기결제] 결제 구분 월 (PCD_REGULER_FLAG : 'Y' 일때 필수)
                obj.PCD_TAXSAVE_FLAG = content.is_taxsave;			  // (선택) 현금영수증 발행 여부 (Y|N)
            }
            // 간편결제 여부('N') or 결제창 버전 포함, (재결제)
            else if (content.simple_flag === 'Y' && content.payple_payer_id !== '') {
                obj.PCD_SIMPLE_FLAG = content.simple_flag;			  // 간편결제 여부 (Y|N)
                //-- PCD_PAYER_ID 는 소스상에 표시하지 마시고 반드시 Server Side Script 를 이용하여 불러오시기 바랍니다. --//
                obj.PCD_PAYER_ID = content.payple_payer_id;			  // 결제자 고유ID (본인인증 된 결제회원 고유 KEY)

                obj.PCD_PAYER_NO = content.buyer_no;				  // (선택) 가맹점 회원 고유번호 (결과전송 시 입력값 그대로 RETURN)
                obj.PCD_PAY_GOODS = content.buy_goods;				  // (필수) 결제 상품
                obj.PCD_PAY_TOTAL = content.buy_total;				  // (필수) 결제 금액
                obj.PCD_PAY_TAXTOTAL = content.buy_taxtotal;		  // (선택) 부가세(복합과세인 경우 필수)
                obj.PCD_PAY_ISTAX = content.buy_istax;				  // (선택) 과세여부 (과세: Y | 비과세(면세): N)
                obj.PCD_PAY_OID = content.order_num;				  // 주문번호 (미입력 시 임의 생성)
                obj.PCD_REGULER_FLAG = content.is_reguler;			  // (선택) 정기결제 여부 (Y|N)
                obj.PCD_PAY_YEAR = content.pay_year;				  // (PCD_REGULER_FLAG = Y 일때 필수) [정기결제] 결제 구분 년도 (PCD_REGULER_FLAG : 'Y' 일때 필수)
                obj.PCD_PAY_MONTH = content.pay_month;				  // (PCD_REGULER_FLAG = Y 일때 필수) [정기결제] 결제 구분 월 (PCD_REGULER_FLAG : 'Y' 일때 필수)
                obj.PCD_TAXSAVE_FLAG = content.is_taxsave;			  // (선택) 현금영수증 발행 여부 (Y|N)
            }
        }
        // 결제창에 보낼 Object Set
        console.log('Object Set:', obj);

        // 가맹점 인증
        authenticate().then((res) => {
            console.log('Auth Result:', res.data);
            // 토큰값 세팅
            obj.PCD_CST_ID = res.data.cst_id;         // 가맹점 인증 후 리턴 받은 cst_id Token
            obj.PCD_CUST_KEY = res.data.custKey;      // 가맹점 인증 후 리턴 받은 custKey Token
            obj.PCD_AUTH_KEY = res.data.AuthKey;      // 가맹점 인증 후 리턴 받은 AuthKey Token
            obj.PCD_PAY_URL = res.data.return_url;    // 가맹점 인증 후 리턴 받은 결제요청 URL

            if (res.data.result !== 'success') return alert(res.data.result_msg);

            // 해당 함수를 불러오려면 cpay.payple.kr 스크립트 추가가 선행 되어야 합니다. /public/index.html
            // 가맹점 인증 후, 토큰 값을 추가 및 PaypleCpayPopup 함수 호출
            window.PaypleCpayPopup(obj);
        }).catch((err) => {
            console.error(err)
        })
    }
    ///////////////////////////////////////////////////////////결제라인 이벤트 끝

    const[fullAddress,setfullAddress] =useState ('');
    let [daumPost, setDaumPost] = useState(false);

    const nameChange = (event) => {
        content.buyer_name = event.target.value }
    const phoenChange = (event) => {
        content.buyer_hp = event.target.value }
    const addresChange = (event) => {
        setfullAddress(event.target.value)
        content.buyer_address = fullAddress}
    const  emailChange = (event) => {
        content.buyer_email = event.target.value}
    
    

    const changeValue = ()=>{
        setPost({ 
            name: user.userName,
            phoen: user.userTel,
            email: user.userMail,
            address: user.userAddr,
        })
        content.buyer_email = user.userMail
        content.buyer_name = user.userName
        content.buyer_hp = user.userTel
        content.buyer_address =  user.userAddr
        setfullAddress(user.userAddr)
    }

    return (
        <div>
        <Box sx={{mt:10, mx:'10%',display:'flex',}}>
            {/* 왼쪽고정 이미지 */}
               <Box sx={{fontWeight: 'bold',textAlign:'left',width:'55%', height:'10vh' }}>
                   <Box position="fixed"  sx={{m:1,px:5,borderRadius: 3, width:'30%',color:'black' ,bgcolor:'#e9ecef' }}>
                   
                   <Box sx={{mt:2, display:'flex',justifyContent: 'space-between',}}> 
                       <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:30, }}>상품 정보 </Box>
                       <Box sx={{ fontWeight: 'bold' ,fontSize:30, }}> 가격 원 </Box>
                   </Box>
                   <Divider sx={{m:2,mx:0}}/>  
                       <Box sx={{ mt:2,fontWeight: 'Medium' ,fontSize:25, }}> {content.buy_goods} </Box>
                       <Box sx={{ display:'flex',justifyContent: 'space-between',}}> 
                            <Avatar
                                    alt="Remy Sharp"
                                    src={content.goods_img}
                                    variant="rounded"
                                    sx={{  width: 150    , height: 150    , textAlign: 'center', }} />
                            <Box sx={{textAlign:'', }}> 
                                <Box sx={{pb:1, pl:1}}> 👍티샤쓰</Box>
                                <Box sx={{p:1 }}> 👍키 링</Box>
                                <Box sx={{ p:1}}> 👍핸드폰케이스</Box>
                                <Box sx={{p:1 }}> 👍담배케이스</Box>
                            </Box>
                        </Box>
                    <Divider sx={{m:2,mx:0}}/>  
                    <Box sx={{ mt:2,display:'flex',justifyContent: 'space-between',}}> 
                       <Box sx={{ fontWeight: 'Medium' ,textAlign: 'left',fontSize:20, }}>총 수량  </Box>
                       <Box sx={{ fontWeight: 'Medium' ,fontSize:20, }}> {content.buy_count}개 </Box>
                   </Box>
                    <Box sx={{ display:'flex',justifyContent: 'space-between',}}> 
                       <Box sx={{ fontWeight: 'Medium' ,textAlign: 'left',fontSize:20, }}>총 상품 가격   </Box>
                       <Box sx={{ fontWeight: 'Medium' ,fontSize:20, }}> {content.buy_price} 원 </Box>
                   </Box>
                    {/* <Box sx={{ display:'flex',justifyContent: 'space-between',}}> 
                       <Box sx={{ fontWeight: 'Medium' ,textAlign: 'left',fontSize:20, }}>배송비  </Box>
                       <Box sx={{ fontWeight: 'Medium' ,fontSize:20, }}> 3000 원 </Box>
                   </Box> */}
                   
                        <Box sx={{mt:2, display:'flex',justifyContent: 'space-between',}}> 
                            <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:25, }}>최종 얼매?   </Box>
                            <Box sx={{ fontWeight: 'bold' ,fontSize:25, }}>{content.buy_total} 원 </Box>
                        </Box>
                    

                  
                                  
                        
                           
                      
                    </Box>
               </Box>


               {/* 오른쪽고정 */}

           
               <Box sx={{ fontWeight: 'bold',textAlign: 'left',fontSize:30, width:'65%',}}>  
               {/* 필수 정보 */}
                   <Box sx={{mt:2, fontWeight: 'bold',textAlign: 'left',fontSize:30, }}>유저 정보 </Box>

                   <Box sx={{ mt:3,}}> 
                       <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:20, }}>이름</Box>
                       <TextField   margin="dense"   fullWidth id="fullWidth" value={user.userName} />
                   </Box>

                   <Box sx={{ mt:3,}}> 
                       <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:20, }}>연락처</Box>
                       <TextField   margin="dense" fullWidth id="fullWidth" value={user.userTel} />
                   </Box>
                   <Box sx={{ mt:3,}}> 
                       <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:20, }}>이메일</Box>
                       <TextField   margin="dense" fullWidth id="fullWidth" value={user.userMail} />
                   </Box>
                   <Box sx={{ mt:3,}}> 
                       <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:20, }}>주소</Box>
                       <TextField   margin="dense" fullWidth id="fullWidth" value={user.userAddr} />
                   </Box>

                   <Divider sx={{m:7,mx:0}}/>  
                {/* 부가정보 */}
                    <Box sx={{display:'flex',justifyContent: 'space-between', }}>
                            <Box sx={{mt:2, fontWeight: 'bold',textAlign: 'left',fontSize:30, }}>배송지 정보 </Box>
                            <Button  onClick={changeValue} sx={{width:"15%",  bgcolor:'black',color:"white", fontWeight: 'bold',fontSize:20,}}>유저와 같음</Button>
                            
                    </Box>

                   <Box sx={{ mt:5,}}> 
                       <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:20, }}>수령인</Box>
                       <TextField  onChange={nameChange} margin="dense"  fullWidth id="fullWidth" placeholder="이름을 입력하세유" value={post.name} />
                   </Box>

                   <Box sx={{ mt:5,}}> 
                       <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:20, }}>연락처</Box>
                       <TextField  onChange={phoenChange} margin="dense"  fullWidth id="fullWidth" placeholder="-없이 입력하셈" value={post.phoen} />
                   </Box>

                   <Box sx={{ mt:5,}}> 
                       <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:20, }}>이메일</Box>
                       <TextField  onChange={emailChange} margin="dense"  fullWidth id="fullWidth" placeholder="-없이 입력하셈" value={post.email} />
                   </Box>

                   <Box sx={{ mt:5}}> 

                       <Box sx={{display:'flex',justifyContent: 'space-between', }}>
                            <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:20, }}>주소</Box>
                            <Button  onClick={()=>{setDaumPost(true)}} outlined="contained" color="inherit"sx={{width:"30%",  bgcolor:'black',color:"white", fontWeight: 'bold',fontSize:20,}}>주소검색</Button>
                            
                       </Box>
                       {/* 주소모달!!!!! */}
                       { 
                                daumPost === true 
                                ? <DaumPost fullAddress={fullAddress} setfullAddress={setfullAddress} />
                                : null
                            }
                       <TextField type='text' onChange={addresChange} value={fullAddress} margin="dense"  fullWidth id="fullWidth" placeholder="주소입력하셈" />

                  
                    </Box>
                    <Divider sx={{m:7,mx:0}}/>  
                    {/* 배송 안내 */}
                    <Box sx={{mt:5, fontWeight: 'bold',textAlign: 'left',fontSize:30, }}>배송 정보 </Box>

                        <Box sx={{ mt:2,}}> 
                            <Box sx={{ textAlign: 'left',fontSize:15, }}>주문 폭주, 재고 부족으로 인한 발송 지연 시에는 별도 안내드립니다. 공휴일과 주말 주문 건은 배송사 휴무로 인해 월요일부터 적용됩니다. 연휴 기간 택배사 휴무, 천재지변 등으로 발송 지연 시 공지로 안내드립니다.</Box>
                        </Box>
                    {/* <Box sx={{mt:5, fontWeight: 'bold',textAlign: 'left',fontSize:30, }}>결제 및 배송 동의 </Box>

                        <Box sx={{ mt:2,}}> 
                            <Box sx={{ textAlign: 'left',fontSize:15, }}>주문 폭주, 재고 부족으로 인한 발송 지연 시에는 별도 안내드립니다. 공휴일과 주말 주문 건은 배송사 휴무로 인해 월요일부터 적용됩니다. 연휴 기간 택배사 휴무, 천재지변 등으로 발송 지연 시 공지로 안내드립니다.</Box>
                        </Box> */}

                   {/* 결제 */}
                   <Divider sx={{m:2,mx:0}}/>  
                   <Button onClick={handleClick} outlined="contained" color="inherit"sx={{mt:1, width:'100%',bgcolor:'black',color:"white", fontWeight: 'bold',fontSize:20,textAlign: 'center'}}>결 제 하 기</Button>
                   {/* /////////////////////////////////////////////결제끝 상품 설명 */}


                  
               </Box>
           </Box>
                    <Footer />
   </div>
    )
    
}


        /////////////////////////////////주소모달
        const DaumPost = (props) => {
            let Address= props.fullAddress
            let setAddress= props.setfullAddress
            
            const handleComplete = (data) => {
                let fullAddress = data.address;
                let extraAddress = '';
                Address=(fullAddress)
                if (data.addressType === 'R') {
                    if (data.bname !== '') {
                        extraAddress += data.bname;
                    }
                    if (data.buildingName !== '') {
                        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
                    }
                    fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
                }
                setAddress(fullAddress)
            
            }
            return (<DaumPostcode onComplete={handleComplete} className="post-code"  />
            );
    

}

export default Payment;

