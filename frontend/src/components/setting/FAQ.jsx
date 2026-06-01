import React, {useState, useEffect} from 'react'
import './SettingComponentAll.scss'
import Button from '../ui/Button'
import { SETTING_ICONS } from '@/constants/SettingIcon'
import { VERSION_STATUS } from '@/constants/memberStatus'
import { useForm, ValidationError } from '@formspree/react'

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_MESSAGE = 1000

const FAQ = () => {
  const versionState = VERSION_STATUS.LATEST
  const [selected, setSelected] = useState("이메일 문의")
  const [hovered, setHovered] = useState(null)
  const [formState, handleFormspreeSubmit] = useForm('xwvybybd')
  const [emailValue, setEmailValue] = useState("")
  const [messageValue, setMessageValue] = useState("")

  useEffect(() => {
    if (formState.succeeded) {
      setEmailValue("")
      setMessageValue("")
    }
  }, [formState.succeeded])

  const handleSend = async () => {
    if (!EMAIL_OK.test(emailValue)) {
      alert("올바른 이메일 주소를 입력하세요.")
      return
    }

    if (!messageValue.trim()) {
      alert("내용을 입력하세요.")
      return
    }

    if (messageValue.length > MAX_MESSAGE) {
      alert(`내용은 ${MAX_MESSAGE}자 이내로 입력하세요.`)
      return
    }
    
    const formData = new FormData()
    formData.set("주제", selected)
    formData.set("이메일", emailValue)
    formData.set("내용", messageValue)

    await handleFormspreeSubmit(formData)
  }

  return (
    <div className='setting-card'>
      <label>
        <img src={SETTING_ICONS.headphones} alt="icon" />
        지원 / 문의
      </label>

      <div className="support-card">
        <div className="support-header">
          <div className="support-title">
            <h3>고객센터</h3>
            <p>도움이 필요하신가요? 아래 채널을 통해 문의해 주세요.</p>
          </div>

          <div className="support-faq">
            <div className="support-left">
              <div className="icon-wrap">
                  <img src={SETTING_ICONS.help} alt="icon" />
              </div>

              <div className="support-detail">
                  <span>자주 묻는 질문(FAQ)</span>
                  <p>자주 묻는 질문과 답변을 확인하세요</p>
              </div>
            </div>

            <a href="#" className="faq-btn">
              <img src={SETTING_ICONS.chevron} alt="icon" />
            </a>
          </div>
        </div>

        <div className="support-form">
          <div className="support-form-header">
            <img src={SETTING_ICONS.message} alt="icon" />
            <h3>문의 / 신고 / 피드백</h3>
          </div>

          <div className="support-options">
            <p>유형 선택</p>
            <Button
              icon={
                selected === "이메일 문의" || hovered === "mail"
                  ? SETTING_ICONS.mailBtn2
                  : SETTING_ICONS.mailBtn1
              }
              text="이메일 문의"
              className={`support-btn ${selected === "이메일 문의" ? "active" : ""}`}
              onClick={() => setSelected("이메일 문의")}
              onMouseEnter={() => setHovered("mail")}
              onMouseLeave={() => setHovered(null)}
            />
            <Button
              icon={
                selected === "버그 신고" || hovered === "bug"
                  ? SETTING_ICONS.bugBtn2
                  : SETTING_ICONS.bugBtn1
              }
              text="버그 신고"
              className={`support-btn ${selected === "버그 신고" ? "active" : ""}`}
              onClick={() => setSelected("버그 신고")}
              onMouseEnter={() => setHovered("bug")}
              onMouseLeave={() => setHovered(null)}
            />
            <Button
              icon={
                selected === "피드백" || hovered === "message"
                  ? SETTING_ICONS.messageBtn2
                  : SETTING_ICONS.messageBtn1
              }
              text="피드백"
              className={`support-btn ${selected === "피드백" ? "active" : ""}`}
              onClick={() => setSelected("피드백")}
              onMouseEnter={() => setHovered("message")}
              onMouseLeave={() => setHovered(null)}
            />
          </div>

          <div className="support-input">
            <label>답변 받을 이메일</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
          </div>

          <div className="support-textarea">
            <label>내용</label>
             <textarea
              placeholder="문의 내용, 버그 증상, 또는 피드백을 자유롭게 입력해 주세요..."
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
            />
          </div>

          <div className="support-footer">
            <span className="support-note">보통 1-2 영업일 내 답변드립니다.</span>
            <Button
              icon={SETTING_ICONS.send}
              text={formState.submitting ? "전송 중..." : "제출하기"}
              className="submit-btn"
              onClick={handleSend} />
          </div>

          {formState.succeeded && (
            <p style={{ color: "green", marginTop: "8px" }}>
              ✅ 메시지가 성공적으로 전송되었습니다!
            </p>
          )}
          {formState.errors?.length > 0 && (
            <p style={{ color: "red", marginTop: "8px" }}>
              ❌ 전송 중 오류가 발생했습니다. 다시 시도해 주세요.
            </p>
          )}

        </div>
      </div>
    </div>
  )
}

export default FAQ
