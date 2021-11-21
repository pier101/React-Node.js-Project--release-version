import React from "react";
import { Avatar, Grid, Paper, TextField, Typography } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Button from "@mui/material/Button";
// import { Search } from "react-daum-postcode";

const Searchpw = () => {
  const paperStyle = {
    padding: 20,
    width: 380,
    margin: "100px auto",
    height: "73vh",
  };

  const avatarStyle = {
    backgroundColor: "#004DAA",
  };

  return (
  <Grid>
  <Paper elevation={10} style={paperStyle} align='center'>
    <Grid align='center'>
      <Avatar style={avatarStyle}>
        <PersonSearchIcon></PersonSearchIcon>
      </Avatar>
      <br></br>
      <h2>비밀번호 찾기</h2>
      <br></br>
    </Grid>
    {/* 아이디 입력창 */}
    <TextField
      margin='20px'
      label='아이디를 입력해주세요.'
      placeholder=''
      fullWidth
      // onChange={handleIdValue}
    ></TextField>
    {/* 이메일 입력창 */}
    <TextField
      margin='20px'
      label='이메일 주소를 입력해주세요.'
      placeholder=''
      fullWidth
      // onChange={handleIdValue}
    ></TextField>
    <Button
      align='center'
      onClick={() => {
        alert("남겨주신 메일주소로 임시비밀번호를 발송해드렸습니다.👍");
      }}
    >
      조회하기
    </Button>
  </Paper>
</Grid>
);
};

export default Searchpw;
