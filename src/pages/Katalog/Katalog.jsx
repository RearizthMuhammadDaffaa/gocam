import React, { useState } from 'react'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import CamDisplay from '../../components/CamDisplay/CamDisplay';

const Katalog = () => {
   const [category ,setCategory] = useState("All");
  return (
    <div className='mt-[80px]'>
       <ExploreMenu judul={"Katalog"} category={category} setCategory={setCategory}/>
       <CamDisplay category={category}/>
    </div>
  )
}

export default Katalog