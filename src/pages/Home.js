import Grid from "../components/Grid"

import './Home.css'

const Home = ({ search }) => {
  return (
    <div className='home'>
      <Grid search={search}/>
    </div>
  )
}

export default Home