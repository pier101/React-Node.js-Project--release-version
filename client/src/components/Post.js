import { Navbar,Container,Nav,Carousel, } from 'react-bootstrap';
import {Route,Link} from 'react-router-dom'
import Main from './main';
import Profile from './pofile/Profile';
function Post() {
  return (
    <div>
    
        <Link to='/'className='nav-link' >Main</Link>   
        <Nav.Link href="/Profile">login</Nav.Link>
   

   
  
    <Route path="/" component={Main} exact={true}/> 




      

     
      
    </div>
  );
}

export default Post;
