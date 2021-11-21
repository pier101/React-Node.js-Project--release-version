import axios from 'axios'
import React,{useState} from 'react'
import { useHistory } from 'react-router'
import './style.css'


const FindIdPw = () => {

    const [inputName,setName]=useState("")
    const [inputTel,setTel]=useState("")
    const [inputMail,setMail]=useState("")
    const history= useHistory()
    
    const findId = ()=>{
        console.log("아이디 찾기")
    }
    const findPwd= ()=>{
        console.log("비밀번호 찾기")
        const res = axios.post(`http://localhost:5000/auth/findpwdd`,{inputMail})
        if(res){
            history.push('/login')
        }
    }

    const handleName =(e)=>{
        setName(e.target.value)
    }
    const handleTel =(e)=>{
        setTel(e.target.value)
    }
    const handleMail =(e)=>{
        setMail(e.target.value)
        console.log(inputMail)
    }

    return (
        <div style={{marginTop:80}}>
            
                <fieldset>
                    <h2>아이디 찾기</h2>
                    <h3>가입시 입력한 이름과 전화번호 입력!🔍</h3>
                    <table className="find-table">
                        <hr />
                        <tr>
                            <th><label htmlFor="username">이름</label></th>
                            <td> <input id="username" type="mail" name="username" onChange={handleName}/></td>
                        </tr>
                        <tr>
                            <th> <label for="usertel">전화번호</label></th>
                            <td>   <input id="usertel" type="mail" name="usertel" onChange={handleTel}/></td>
                        </tr>
                            <td><button id="findid" type="submit" onclick={{findId}}>아이디 찾기</button></td>

                    </table>
                        <h2 id="pwd">비밀번호 찾기</h2>
                        <h3>가입시 입력한 이메일 주소를 입력!!🔓</h3>
                    <table className="find-table">
                        <tr>
                            <th><label for="usermail">이메일</label> </th>
                            <td>
                                <input id="usermail" type="mail" name="usermail" onChange={handleMail}/>
                            </td>
                        </tr>
                        <hr/>
                         <input id="findpwd" type="button" onClick={findPwd} value="비밀번호 찾기"/>
                    </table>
                </fieldset>
   
        </div>
    )
}

export default FindIdPw;