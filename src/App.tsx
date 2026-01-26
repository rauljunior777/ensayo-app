import { Routes, Route } from 'react-router-dom'
import Header from './layouts/header/Header'
import Home from './screens/public/home/Home'
import About from './screens/public/about/About'
import Detail from './screens/public/detail/Detail'

function App() {
  return (
    <div className='bg-white dark:bg-very-dark-blue dark:text-white'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/detail' element={<Detail/>}/>
        <Route path='/about' element={<About />}/>
      </Routes>
    </div>
  )
}

export default App
