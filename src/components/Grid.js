import './Grid.css'
import { useCollection } from '../hooks/useCollection'
import { useState } from 'react'

import Project from './Project'

const Grid = () => {
  const { documents } = useCollection('projects')
  const [current, setCurrent] = useState('')
  
  return (
    <div className='grid'>
      <div className='grid_left'>
      <div className='grid_filters'>
        <div className='grid_filter'>Filter</div>
        <div className='grid_sort'>Sort</div>
      </div>
      <div className='grid_items'>
      {
        documents && documents.map((p) => {
          return <div className='grid_item' onClick={() => setCurrent(p)}>
                  <div className='grid_item_header'>
                    <div className='grid_item_category'>{p.category}</div>
                    <div className='grid_item_daysleft'>10 days left</div>
                  </div>
                  <div className='grid_item_createdate'>{p.creator[1]} - {p.date}</div>
                  <div className='grid_item_title'>{p.name}</div>
                  <img src='mural.jpg' className='grid_item_image'/>
                  <div className='grid_item_members'>{p.members.slice(0,2).map(m => ` ${m.label}`)} ...</div>
                </div>
        })
      }
      </div>

      </div>
      {current &&
        <Project p={current}/>
      }
    </div>
  )
}

export default Grid