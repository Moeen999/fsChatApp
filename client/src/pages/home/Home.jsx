import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'

const Home = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <MessageContainer/>
    </div>
  )
}

export default Home