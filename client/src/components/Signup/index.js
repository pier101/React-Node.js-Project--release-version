import React, { useState } from "react";
import { Avatar, Grid, Paper, TextField, Typography } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Post from "./Post";
import axios from 'axios'


// import DaumPostcode from "react-daum-postcode";

const Signup = () => {
  const paperStyle = {
    padding: 20,
    width: 380,
    margin: "100px auto",
    height: "73vh",
  };
  const avatarStyle = {
    backgroundColor: "#004DAA",
  };

  //post에서 주소를 받아온곳
    //post에서 주소를 받아온곳
  
  const [address, setAddress] = useState("");
  const [popup, setPopup] = useState("");
  const [idValue, setIdValue] = useState("")
  const [pwValue, setPwValue] = useState("")
  const [pwValue2, setPwValue2] = useState("")
  const [nameValue, setNameValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [telValue, setTelValue] = useState("")
  const [addressValue, setAddrValue] = useState("")
  const [addressValue2, setAddrValue2] = useState("")
  const [msg0, setMsg0] = useState({display:'none' ,color:"black", fontSize:10})
  const [msg1, setMsg1] = useState({display:'none' ,color:"black", fontSize:10})
  const [msg2, setMsg2] = useState({display:'none' ,color:"black", fontSize:10})
  const [msg3, setMsg3] = useState({display:'none' ,color:"black", fontSize:10})
  const [msg4, setMsg4] = useState({display:'none' ,color:"black", fontSize:10})
  const [innermsg0, setInnerMsg0] = useState("")
  const [innermsg1, setInnerMsg1] = useState("")
  const [innermsg2, setInnerMsg2] = useState("")
  const [innermsg3, setInnerMsg3] = useState("")
  const [innermsg4, setInnerMsg4] = useState("")

 const idHandler = (e)=>{
  setIdValue(e.target.value)
 }
 const pwHandler = (e)=>{
  setPwValue(e.target.value)
 }
 const pwHandler2 = (e)=>{
  setPwValue2(e.target.value)
 }
 const nameHandler = (e)=>{
  setNameValue(e.target.value)
 }
 const emailHandler = (e)=>{
  setEmailValue(e.target.value)
 }
 const telHandler = (e)=>{
  setTelValue(e.target.value)
 }
 const addrHandler = (e)=>{
  setAddrValue(e.target.value)
 }
 const addrHandler2 = (e)=>{
  setAddrValue2(e.target.value)
 }

 function checkId() {
  //id유효성 검사 및 에러시 메세지 표시
  let regId = /^[a-z]+[a-z0-9]{3,20}$/g;
  if (idValue === "") { 
      setMsg2({display:'block',color:'red',fontSize:12})
      setInnerMsg2("필수정보입니다.");
  } else if (!regId.test(idValue)) {
      setMsg2({display:'block',color:'red',fontSize:12})
      setInnerMsg2("영문자로 시작하거나 숫자 포함해보세요");
  } else {
      setMsg2({display:'block',color:'#08A600',fontSize:12})
      setInnerMsg2("올바른 아이디 입니다.");
  }
}

 function checkPwd() {
    let regPwd = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
    if (pwValue === "") {
      setMsg0({display:'block',color:'red',fontSize:12});
      setInnerMsg0("필수정보입니다");
    } else if (!regPwd.test(pwValue)) {
      setMsg0({display:'block',color:'red',fontSize:12});
      setInnerMsg0("6~20자 영문 대/소문자에 숫자 또는 특수문자를 포함해주세요.");
    } else {
      setMsg0({display:'none'});
    }
}
function checkPwd2() {
  if (pwValue2 === "") {
    setMsg1({display:'block',color:'red',fontSize:12});
    setInnerMsg1("필수정보입니다");
    
  } else if (pwValue !== pwValue2) {
    setMsg1({display:'block',color:'red',fontSize:12});
    setInnerMsg1("비밀번호가 일치하지 않습니다.");
  } else {
    setMsg1({display:'none'});
  }
}
function checkTel() {
  let regTel = /^\d{3}-\d{3,4}-\d{4}$/;
  if (telValue === "") {
    setMsg3({display:'block',color:'red',fontSize:12});
    setInnerMsg3("필수정보입니다");
  } else if (!regTel.test(telValue)) {
    setMsg3({display:'block',color:'red',fontSize:12});
    setInnerMsg3("전화번호 형식이 올바르지 않습니다");
  } else {
    setMsg3({display:'none'});
  }
}

function checkEmail() {
  let regMail =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (emailValue === "") {
    setMsg4({display:'block',color:'red',fontSize:12});
    setInnerMsg4("필수정보입니다");
  } else if (!regMail.test(emailValue)) {
    setMsg4({display:'block',color:'red',fontSize:12});
    setInnerMsg4("이메일 형식이 올바르지  않습니다.");
  } else {
    setMsg4({display:'none'});
  }
}

  //회원가입 요청
  const onSignUp = () =>{
    const signUpToServer = async ()=>{
      await axios.post('http://localhost:5000/auth/signup',{
        id : idValue, 
        pw2 : pwValue2, 
        name : nameValue, 
        email : emailValue, 
        tel : telValue, 
        addr : addressValue,
        addr2 : addressValue2,
      }).then(res=>{
        console.log(res)
        console.log(res.data)
        if (res.data === "id존재") {
          alert('이미 가입된 id입니다.')
        } else if(res.data === "email존재"){
          alert('이미 가입된 email이 있습니다.')
        } else if (res.data ===true){
          alert('가입 완료!!')
         // document.location.href = '/'
        }
      })
    }
    signUpToServer()
  }
  // const [userimg, setUserImg] = useState({
  //   file : '',
  //   preview : ''
  // })
  // const onUserImg = e =>{
  //   e.preventDefault();
  //   let reader= new FileReader();
  //   let file = e.target.files[0];
  //   reader.onloadend = ()=>{
  //     setUserImg({
  //       file: file,
  //       preview : reader.result
  //     })
  //   }
  //   console.log(userimg.file)
  //   //console.log(userimg.preview)
  //   reader.readAsDataURL(file);
  // }
  

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AssignmentIndIcon></AssignmentIndIcon>
          </Avatar>
          <h2>회원가입</h2>
          <Typography variant="caption">
            아래의 빈칸을 양식에 맞게 넣어주세요.
          </Typography>
        </Grid>

        {/* 아이디 */}
        <TextField
          // margin="400px"
          color="secondary"
          label="ID"
          placeholder="Enter your ID"
          fullWidth
          onKeyUp={checkId}
          onChange={idHandler}
        ></TextField>
        <span style={msg2}>{innermsg2}</span>

        {/* 비밀번호 입력 */}
        <TextField
          // margin="20px"
          label="Password"
          placeholder="Enter your Password"
          type="password"
          onKeyUp={checkPwd}
          fullWidth
          onChange={pwHandler}
        ></TextField>
        <span style={msg0}>{innermsg0}</span>

        {/* 비밀번호 확인 */}
        <TextField
          // margin="20px"
          label="Confirm Password "
          placeholder="Enter your Password"
          type="password"
          onKeyUp={checkPwd2}
          fullWidth
          onChange={pwHandler2}
        ></TextField>
        <span style={msg1}>{innermsg1}</span>

        {/* 이름 */}
        <TextField
          // margin="20px"
          label="Name"
          placeholder="Enter your name"
          fullWidth
          onChange={nameHandler}
        ></TextField>

        {/* 성별 */}
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            defaultValue="female"
            name="radio-buttons-group"
            style={{ display: "initial" }}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
              // align="center"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>

        {/* 이메일 */}
        <TextField
          // margin="20px"
          label="E-mail"
          placeholder="Enter your E-mail"
          onBlur={checkEmail}
          fullWidth
          onChange={emailHandler}
          onKeyUp={checkEmail}
        ></TextField>
        <span style={msg4}>{innermsg4}</span>
        {/* 전화번호 */}
        <TextField
          // margin="20px"
          label="Phone-number"
          placeholder="Enter your Phone number"
          fullWidth
          onChange={telHandler}
          onKeyUp={checkTel}
        ></TextField>
        <span style={msg3}>{innermsg3}</span>
        {/* 주소 */}
        <TextField
          // margin="20px"
          label="Adress"
          placeholder="Enter your Adress"
          fullWidth
          onChange={addrHandler}
        ></TextField>
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            setPopup(!popup);
          }}
        >
          🔍︎ 주소 검색
        </Button>
        {popup && <Post address={address} setAddress={setAddress}></Post>}

        {/* 상세주소 */}
        <TextField
          // margin="20px"
          label="Detail Adress"
          placeholder="Enter your detial Adress"
          fullWidth
          onChange={addrHandler2}
        ></TextField>

          {/* 프로필이미지 올리고 db저장하는 작업 시도해봤는데 완성 못함 ㅠㅠ */}
        {/* <Input type='file' accept='image/*' name='profile_img' onChange={onUserImg}>
        </Input>
        { userimg.file !== ''&& <img style={{width: 200, height: 200}} className='profile_preview' src={userimg.preview} alt='profile'></img>} */}
        <br></br>
        <br></br>



        {/* 가입버튼 */}
        <Button variant="contained" fullWidth onClick={onSignUp}>
          가입하기
        </Button>
      </Paper>
    </Grid>
  );
};



export default Signup;
