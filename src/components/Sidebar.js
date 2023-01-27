import { Link } from 'react-router-dom'

import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className='sidebar'>

      <div className='sidebar_title'>Project Manager</div>
      <Link className='link' to='/projectmanager'><div className='sidebar_projects'>Projects</div></Link>
      <Link className='link' to='/projectmanager/create'><div className='sidebar_create'>Create</div></Link>

    </div>
  )
}

export default Sidebar