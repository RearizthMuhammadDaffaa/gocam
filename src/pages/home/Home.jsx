import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import CamDisplay from '../../components/CamDisplay/CamDisplay'

const Home = () => {
  const [category ,setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory}/>
      <CamDisplay category={category}/>
      
    </div>
  )
}

export default Home