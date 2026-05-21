import React, { useState } from 'react'
import './SettingComponentAll.scss'
import Button from '../ui/Button'
import { SETTING_ICONS } from '@/constants/SettingIcon'
import { VERSION_STATUS } from '@/constants/memberStatus'

const Version = () => {
  const [showModal, setShowModal] = useState(false)

  const versionState = VERSION_STATUS.LATEST

  return (
    <div className='setting-card'>
      <label>
        <img src={SETTING_ICONS.info} alt="icon" />
        앱 정보
      </label>

      <div className="version-card">
        <div className="version-header">
          <div className="version-title">
            <h3>PicStory 버전 정보</h3>
            <p>현재 설치된 앱의 버전을 확인하고 업데이트하세요.</p>
          </div>

          <div className="version-icon">
            <div className="badge">{versionState}</div>
          </div>
        </div>

        <div className="version-row">
          <div className="version-left">
            <div className="icon-wrap">
                <img src={SETTING_ICONS.package} alt="icon" />
            </div>

            <div className="version-detail">
                <p>현재 버전</p>
                <span className="version-number">v 1.0.0</span>
            </div>
          </div>

          <Button
            icon={SETTING_ICONS.cw}
            text="업데이트 확인"
            onClick={() => {
                alert(`업데이트 확인\n현재 버전: v 1.0.0\n상태: ${versionState}`);
            }}
            className="update-btn" />
        </div>

        <div className="version-date">
            <div className="version-date-left">
                <img src={SETTING_ICONS.calendar} alt="icon" />
                <span>최근 업데이트</span>
            </div>

            <div className="version-date-right">
                2025.01.08
            </div>
        </div>
      </div>
    </div>
  )
}

export default Version
