import React from 'react'
import Banner from './components/Banner'
import Contact from './components/Contact'
import List from '../../product/components/List'
import NewBook from '../../product/components/NewBook'
const HomePage = () => {
  return (
    <div>
      <Banner />
      <NewBook/>
      <List/>
      <Contact />
    </div>
  )
}

export default HomePage
