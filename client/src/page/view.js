import React, { Component ,useEffect,useState} from 'react';
import './main.css';
import axios from 'axios';


const View = ({match})=>{
  console.log(match.params.data)

  const [data,setData]=useState([])
  useEffect(() => {
  axios.post('/board/get/board_data', {data:match.params.data}).then(res=>setData(res.data))
  }, []);
  
 
  const deleteView = async function(){
  if(window.confirm('삭제??')){
  axios.post('/board/delete/board', {data:match.params.data}).then(res=>deleteView(res.data))}
  alert('삭제완료')
  return  window.location.href = '/board'
  }



  
      return (
       <div className='Write'style={{marginTop:50}}>
           <div className='top_title'>
                  <input type='text' id='title_txt' name='title' defaultValue={data.title} readOnly/>
                </div>
                <div>
                  {data.date}
                </div>
                <div>
                  <textarea id='content_txt' name='contents' defaultValue={data.contents} readOnly></textarea>
                </div>
                <div className="view_button">
                  <input type="button" value="수정"/>
                  <input  type="button"  value="삭제" onClick={() =>deleteView()}/>
                  <input type='button' value='목록'onClick={() => window.location.href = '/board'}/>
                </div>
              </div>
      );
 
}

export default View;

