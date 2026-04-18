import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.scss'
import Button from '../ui/Button'
import { logout as logoutApi } from '@/api/auth.api'
import { useAuth } from '@/store/auth.store'

const Header = () => {

  const navigate = useNavigate()
  const { logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const menus = [
    {
      name: '내 메모',
      link: '/app/posts/all'
    },
    {
      name: '내 프로필',
      link: '/app/profile'
    },
    {
      name: '설정',
      link: '/app/setting'
    }
  ]

  // 1. 메뉴가 열렸을 때 ESC 키로 닫을 수 있도록 이벤트 등록
  useEffect(() => {
    if (!menuOpen) return

    const onkey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)  // ESC 누르면 메뉴 닫기
    }

    window.addEventListener('keydown', onkey) // ESC 이벤트 등록

    // cleanup: 메뉴가 닫히거나 컴포넌트가 사라질 때 이벤트 제거
    return () => window.removeEventListener('keydown', onkey)

  }, [menuOpen])

  // 2. 메뉴가 열릴 때 body에 클래스 추가해서 스크롤 차단
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('is-nav-open')  // 메뉴 열리면 스크롤 막기
    } else {
      document.body.classList.remove('is-nav-open') // 메뉴 닫히면 스크롤 복원
    }
  }, [menuOpen])

  const handleLogout = async () => {
    try {
      await logoutApi()
      logout()
      setMenuOpen(false)
      navigate("/")
    } catch (error) {
      alert(error.message || '로그아웃 오류')
    }
  }

  return (
    <header>
      <div className="inner">
        <h1>
          <Link to="/app">
            <img src="/images/logo.svg" alt="logo" />
          </Link>
        </h1>
        <div className={`right ${menuOpen ? 'is-nav-open' : ''} `}>

          <button
            type='button'
            className='header-menu-toggle'
            aria-expanded={menuOpen}
            aria-controls='header-nav'
            onClick={() => setMenuOpen((v) => !v)} >
              <span className='header-menu-toggle__label' >메뉴 열기</span>
              <span className='header-menu-toggle__bar' aria-hidden />
              <span className='header-menu-toggle__bar' aria-hidden />
              <span className='header-menu-toggle__bar' aria-hidden />
          </button>

          <div
            className="header-nav-backdrop"
            aria-hidden
            onClick={() => setMenuOpen(false)} />

          <nav id='header-nav' aria-label='주 메뉴'>
            <ul>
              {menus.map((menu, i) => (
                <li key={i}>
                  <Button
                    icons
                    className="sq"
                    onClick={() => {
                      navigate(menu.link)
                      setMenuOpen(false)
                    }}
                    text={menu.name} />
                </li>
              ))}
            </ul>

            <Button
              text="로그아웃"
              className="logout-btn"
              onClick={handleLogout} />
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
