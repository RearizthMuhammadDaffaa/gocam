import React from 'react'
import { Link } from 'react-router-dom'

const Sukses = () => {
  return (
    <div className=' h-[80vh] flex justify-center items-center flex-col gap-5'>
      <h1 className='mt-[100px] text-4xl'>Booking Sukses</h1>
      <Link className='btn btn-wide' to="/inventory">Lihat Transaksi</Link>
    </div>
  )
}

export default Sukses