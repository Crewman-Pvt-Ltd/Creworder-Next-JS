import React from 'react'
import SettingsSidebarListItems from './SettingsSidebarListItems'

const SettingsSidebar = ({type}) => {
  return (
    <div>
      <SettingsSidebarListItems type={type}/>
    </div>
  )
}

export default SettingsSidebar
