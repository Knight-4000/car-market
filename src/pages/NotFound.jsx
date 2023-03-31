import React from 'react'
import './notfound.css';
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='wrong-turn'>
        <h1 className='text-center py-2'>Page Not Found</h1>
        <div className='container'>
            <p className='text-center'>It would seem that the page you are looking for does not exist.</p> 
            <p className='text-center'>Click <Link to="/" className='home-link'>Back</Link> to return to 
            the home page.</p> 
        </div>

    </div>
  )
}
