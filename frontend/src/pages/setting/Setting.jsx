import React from 'react'
import './SettingPage.scss'
import PagesHeader from '@/components/layouts/PagesHeader'
import Logout from '@/components/setting/Logout'
import Version from '@/components/setting/Version'
import FAQ from '@/components/setting/FAQ'
import { useNavigate } from 'react-router-dom'

const Setting = () => {
  const navigate = useNavigate()
  
  const handleGoBack = ()=>{
    navigate(-1)
  }
  
  return (
    <section className='page setting-section'>
      <div className="inner">
        <PagesHeader
          title='설정'
          buttonText='뒤로가기'
          showButton
          buttonClass="back wh"
          backico="bh"
          onClick={handleGoBack} />

        <main>
          <Version />
          <FAQ />
          <Logout />
        </main>
      </div>
    </section>
  )
}

export default Setting
