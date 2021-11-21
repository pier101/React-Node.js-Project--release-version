import React, { Component } from "react";
import axios from 'axios';
import TextareaAutosize from '@mui/material/TextareaAutosize'

// axios.post('주소', {
//     firstName : 'kwon',
//     lastName : 'jaeeun'
//   })
//   .then((response) => console.log(response))
//   .catch((response) => console.log(error));

class Sample extends Component {
    constructor(props) {
    super(props);
    this.state = {
        noticeContent : ''
    }
    };

    WritePost = async(e) => {
        const {noticeContent } = this.state;
        e.preventDefault();
        
        const res = await axios.post('/posts' ,{ 
           noticeContent
            })
        console.log(noticeContent)
        if(res.data) {
            alert('데이터를 추가했습니다.');
            return window.location.reload();
        }
    }

    // CreatePost = async(e)=>{
    //     const get = await  axios('http://localhost:5000/posts', {
    //         method : 'POST'
    //     })
    //     if(get){
            
    //     }
    // }



    noticeContentWrite(e) {
    this.setState({ noticeContent : e.target.value })
    }

    render() {
    return(
        <div>
            <form method='POST' onSubmit={this.WritePost}>
                {/* <TextareaAutosize type="text" aria-label="empty textarea" placeholder="Empty" onChange={(e) => this.noticeContentWrite(e)} style={{ width: 200,height: 150 , }}/> */}
                <input type='text' maxLength='20' placeholder='내용입력' onChange={(e) => this.noticeContentWrite(e)}/>
                <input type='submit' value='완료' />
            </form>
        </div>
    )
    };
};





export default Sample;