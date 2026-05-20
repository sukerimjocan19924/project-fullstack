import React, { useState } from 'react'
import Button from '../ui/Button'
import { SETTING_ICONS } from '@/constants/SettingIcon'
import { useAuth } from '@/store/auth.store'
import { cancelWithdraw, confirmWithdraw } from '@/api/withdrawal.api'
import './SettingComponentAll.scss'

const Withdrawal = ({ onCancel }) => {
  const { member, logout } = useAuth()
  const [email, setEmail] = useState('')
  const [cancelLoading, setCancelLoading] = useState(false)
  const [withdrawLoading, setWithdrawLoading] = useState(false)

  // 취소 버튼 동작
  const handleCancel = async () => {
    try {
      setCancelLoading(true)
      const data = await cancelWithdraw(email)
      alert(data?.message || '탈퇴가 취소되었습니다.')
      setEmail('')
      onCancel() // 모달 닫기
    } catch (err) {
      console.error(err)
      alert('취소 처리 중 오류가 발생했습니다.')
    } finally {
      setCancelLoading(false)
    }
  }

  // 탈퇴 확인 버튼 동작
  const handleWithdraw = async () => {
    if (!email) {
      alert('이메일을 입력하세요.')
      return
    }
    if (email !== member?.email) {
      alert('현재 계정 이메일과 일치하지 않습니다.')
      return
    }

    try {
      setWithdrawLoading(true)
      const data = await confirmWithdraw(email)

      setTimeout(() => {
        alert(data?.message || '계정이 삭제되었습니다.')
        logout()
        onCancel() // 모달 닫기
      }, 1000)
    } catch (err) {
      console.error(err)
      alert('탈퇴 처리 중 오류가 발생했습니다.')
    } finally {
      setWithdrawLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="confirm-top">
          <div className="confirm-title-row">
            <div className="img-wrap">
              <img src={SETTING_ICONS.confirm} alt="icon" />
            </div>
            <div className="title-info">
              <h3>정말 탈퇴하시겠습니까?</h3>
              <p>이 작업은 되돌릴 수 없습니다.</p>
            </div>
          </div>

          <div className="confirm-desc-box">
            <img src={SETTING_ICONS.danger} alt="icon" />
            <p>탈퇴 시 모든 메모, 설정, 데이터가 즉시 영구 삭제됩니다.</p>
          </div>
        </div>

        <div className="confirm-body">
          <h4>이메일 주소 입력</h4>
          <p>계정 확인을 위해 가입하신 이메일 주소를 정확히 입력해 주세요.</p>

          <input
            type="email"
            placeholder="test@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email-input"
          />

          <div className="btn-wrap">
            <Button
              text="취소"
              onClick={handleCancel}
              className="cancel"
              disabled={cancelLoading || withdrawLoading}
            />
            <Button
              icon={SETTING_ICONS.trash}
              text="탈퇴 확인"
              onClick={handleWithdraw}
              className="save"
              disabled={withdrawLoading || cancelLoading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Withdrawal
