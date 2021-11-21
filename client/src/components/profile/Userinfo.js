import React, { useEffect, useState } from "react";
import { Grid, Paper, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import axios from "axios";
import multer from "multer";
// import Post from "../Login/Post";

const Input = styled("input")({
  display: "none",
});

// //post에서 주소를 받아온곳
// const [address, setAddress] = React.useState("");
// const [popup, setPopup] = React.useState("");

// //유저 아이디 받아오는 곳
// const [username, setUserName] = React.useState("");
// const [userid, setUserId] = React.useState("");

function UserInfo() {
  const paperStyle = {
    padding: 100,
    width: 700,
    margin: "100px auto",
    height: "900px",
    alignItems: "center",
  };

  //multer를 이용한 이미지파일 업로드
    const [content, setContent] = useState("");
    const [uploadedImg, setUploadedImg] = useState({
      file: null,
    });
  

  //db에서 유저 네임/id 가져오기
  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/Userinfo`);
    // setUserName(res.data.username);
    // setUserId(res.data.userid);
    console.log(res.data);
  }, []);

  // 이메일 유효성 검사
  const checkEmail = e => {
    var regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 형식에 맞는 경우 true 리턴
    console.log("이메일 유효성 검사 :: ", regExp.test(e.target.value));
  };

  //비밀번호 유효성 검사
  const checkPassword = e => {
    //  8 ~ 10자 영문, 숫자 조합
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    // 형식에 맞는 경우 true 리턴
    console.log("비밀번호 유효성 검사 :: ", regExp.test(e.target.value));
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid>
          <h3>회원정보 수정</h3>
          <Stack direction='row' alignItems='center' spacing={2}>
            <label htmlFor='contained-button-file'>
              <Input
                accept='image/*'
                id='contained-button-file'
                multiple
                type='file'
              />
              <Button variant='contained' component='span'>
                Upload
              </Button>
            </label>
            <label htmlFor='icon-button-file'>
              <Input accept='image/*' id='icon-button-file' type='file' />
              <IconButton
                color='primary'
                aria-label='upload picture'
                component='span'
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Stack>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              {/* 이름 / 수정불가 */}
              <Typography label='username'>사용자 이름 :
              {/* {username} */}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              {/* 아이디 / 수정불가*/}
              <Typography label='userid'>사용자 아이디 :
              {/* {userid} */}
              </Typography>
            </Grid>
          </Grid>

          <br></br>
          <Box>
            {/* 메일주소 / 수정가능*/}
            <TextField
              // margin="20px"
              label='E-mail'
              placeholder='Enter your E-mail'
              onBlur={checkEmail}
              fullWidth
            ></TextField>

            <Button variant='contained' fullWidth>
              메일주소 변경하기
            </Button>
            <hr></hr>

            {/* 비밀번호 / 변경 가능*/}
            <TextField
              // margin="20px"
              label='Password'
              placeholder='Enter your Password'
              type='password'
              onBlur={checkPassword}
              fullWidth
            ></TextField>

            {/* 비밀번호 변경 확인 */}
            <TextField
              label='Confirm Password '
              placeholder='Enter your Password'
              type='password'
              onBlur={checkPassword}
              fullWidth
            ></TextField>

            <Button variant='contained' fullWidth>
              비밀번호 변경하기
            </Button>
            <hr></hr>

            {/* 주소 */}
            {/* <TextField
              // margin="20px"
              label='Adress'
              placeholder='Enter your Adress'
              fullWidth
            ></TextField>

            <Button
              variant='contained'
              fullWidth
              onClick={() => {
                setPopup(!popup);
              }}
            >
            //   🔍︎ 주소 검색
            // </Button>
            // {popup && <Post address={address} setAddress={setAddress}></Post>}

            {/* 상세주소 */}
            <TextField
              // margin="20px"
              label='Detail Adress'
              placeholder='Enter your detial Adress'
              fullWidth
            ></TextField>
            {/* 수정 완료버튼/ 버튼 누르면 수정 정보가 DB에저장되고 마이페이지로 이동  */}
            <Button variant='contained' fullWidth>
              수정완료
            </Button>
          </Box>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default UserInfo;