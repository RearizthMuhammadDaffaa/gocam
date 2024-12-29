import React from 'react'
import "./Item.css"
import { assets } from '../../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'

const CamItem = ({id,name,hoursPrice,daysPrice,url}) => {
  return (
    <div className='cam-item'>
      <div className="cam-item-img-container">
        <img className='cam-item-img' src={url} alt="" />
      </div>
      <div className="cam-item-info">
        <div className="cam-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="cam-item-desc">{"desc"}</p>
        {/* <div className="cam-item-link">
          
        </div> */}
        <Link to={`transaksi-jam/${id}`} className='cam-item-price'>Sewa perjam /${hoursPrice}</Link>
        <Link to={`transaksi/${id}`} className='cam-item-price'>Sewa perhari/${daysPrice}</Link>
      </div>
    </div>
  )
}

export default CamItem