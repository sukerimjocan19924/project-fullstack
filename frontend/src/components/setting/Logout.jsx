import React, { useState } from 'react'
import './SettingComponentAll.scss'
import Button from '../ui/Button'
import { SETTING_ICONS } from '@/constants/SettingIcon'
import { STATUS_BADGE } from '@/constants/memberStatus'
import { useAuth } from '@/store/auth.store'
import Withdrawal from './Withdrawal'

const Logout = () => {
  const { member } = useAuth()
  const [showModal, setShowModal] = useState(false)

  const badgeDisplay = member?.status
    ? STATUS_BADGE[member.status] ?? `● ${member.status}`
    : '_'

  return (
    <div className='setting-card'>
      <label htmlFor='setting-account'>
        <img src={SETTING_ICONS.user} alt="icon" />
        계정 관리
      </label>

      <div className="account-card">
        <div className="account-header">
          <div className="account-title">
            <h3>계정 정보</h3>
            <p>현재 로그인된 계정 정보입니다.</p>
          </div>
          <div className="account-icon">
            <div className="badge">{badgeDisplay}</div>
          </div>
        </div>

        <div className="withdrawal-box">
          <div className="withdrawal-header">
            <div className="withdrawal-info">
              <h3>회원 탈퇴</h3>
              <p>탈퇴 시 모든 메모와 데이터가 영구적으로 삭제됩니다.</p>
            </div>
            <div className="danger-badge">
              <img src={SETTING_ICONS.danger} alt="icon" />
              되돌릴 수 없음
            </div>
          </div>
          
          <div className="btn-wrap">
            <Button
              icon={SETTING_ICONS.logout}
              text="탈퇴 하기"
              onClick={() => setShowModal(true)}
              className="save" />
          </div>
        </div>
      </div>

      {showModal && (
        <Withdrawal
          onConfirm={() => setShowModal(false)}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default Logout
