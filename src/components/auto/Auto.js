import React from 'react'
import './auto.scss';
import AutoFilter from './autoFilter/AutoFilter';
import AutoList from './autoList/AutoList';




const Auto = () => {
  return (
    <>
      <section>
        <div className='container'>
          <div className='auto'>
            <aside className='filter'>
              <AutoFilter />
            </aside>
            <div className='content'>
              <AutoList />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Auto
