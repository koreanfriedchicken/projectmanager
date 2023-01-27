import './Grid.css'
import { useCollection } from '../hooks/useCollection'
import { useState } from 'react'

import Project from './Project'
import Select from 'react-select'

const Grid = ({ search }) => {
  const { documents } = useCollection('projects')
  const [current, setCurrent] = useState('')

  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('none')

  const categories = [
    {value:'all', label: 'Categories'}, 
    {value: 'web', label: 'Web'},
    {value: 'research', label: 'Research'},
    {value:'marketing', label: 'Marketing'}, 
    {value: 'ideation', label: 'Ideation'}
  ]

  const sortTypes = [
    {value: 'ascending', label: 'Ascending'},
    {value: 'descending', label: 'Descending'}
  ]
  
                

  let projects = documents && documents.filter((doc) => {
    switch(category) {
      case 'all':
        return true
      case 'web':
      case 'research':
      case 'marketing':
      case 'illustration':
      case 'ideation':
        return doc.category === category
      default:
      return true
    }
  })

  if(projects && search){

    projects = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

    console.log(projects)
  }


  if(projects && sort == 'ascending'){
    projects = projects.sort(function(a,b){
      return new Date(a.date) - new Date(b.date)
    })
    console.log(projects)
  }

  if(projects && sort == 'descending'){
    projects = projects.sort(function(a,b){
      return new Date(b.date) - new Date(a.date)
    })
    console.log(projects)
  }



  
  
  return (
    <div className='grid'>
      <div className='grid_left'>
      <div className='grid_filters'>
        <div className='grid_category'>
          <Select
            placeholder='Category'
            onChange={(option) => setCategory(option.value)}
            className='grid_categoryselect'
            options={categories}
          />
        </div>
        <div className='grid_sort'>
        <Select
            placeholder='Sort By'
            onChange={(option) => setSort(option.value)}
            className='grid_sortselect'
            options={sortTypes}
          />
        </div>
      </div>
      <div className='grid_items'>
      {
        projects && projects.map((p) => {
          return <div className='grid_item' key={p.id} onClick={() => setCurrent(p)}>
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