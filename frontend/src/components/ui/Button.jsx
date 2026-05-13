import React from 'react'
import './Button.scss'

const Button = ({
  text,
  className,
  onClick,
  backico = '',
  disabled = false,
  type = 'button',
  icons='' }) => {

    const KakaoIcon = () => (
      <svg width="28" height="29" viewBox="0 0 28 29" fill="none">
      <path
        d="M14.0002 6.39999C8.70016 6.39999 4.41016 9.79999 4.41016 13.98C4.41016 16.71 6.23016 19.1 8.96016 20.43C8.76016 21.18 8.23016 23.14 8.13016 23.56C8.00016 24.08 8.32016 24.07 8.53016 23.94C8.70016 23.83 11.1602 22.15 12.2202 21.43C12.8002 21.52 13.3902 21.56 14.0002 21.56C19.3002 21.56 23.5902 18.16 23.5902 13.98C23.5902 9.79999 19.2902 6.39999 14.0002 6.39999Z"
        fill="#000000"/>
    </svg>
    )
  
    const backIconSrc =
        backico == 'wh' ? "/images/arrow-back-wh.svg" :
        backico == 'bh' ? "/images/arrow-back.svg" : null
        
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className}`}>
      {
        backIconSrc && <img src={backIconSrc} />
      }
      {text}
      {icons==true && <img src='/images/arrow.svg' />}
      {icons=='kakao' && <KakaoIcon />}
    </button>
  )
}

export default Button
