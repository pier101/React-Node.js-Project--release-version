import React from 'react'
import Thumbnail from './Thumbnail'
import Goods from './Goods'
import News from './News'
import Post from './Post'
import Footer from './Footer'
import Vedios from './Vedios'
//import Testartist from './testartist' 
//import Artist from './components/artist'
const index = () => {
    return (
        <div>
          <Thumbnail/>
          <Goods />
          <News />
          <Post />
          <Vedios />
          <Footer />
        </div>
    )
}

export default index
