import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
     <div className=' h-[80vh] flex justify-center items-center flex-col gap-5'>
          <h1 className='mt-[100px] text-4xl'>Cancel</h1>
          <Link className='btn  btn-error btn-wide' to="/">Kembali Ke Home</Link>
        </div>
  )
}

export default Cancel