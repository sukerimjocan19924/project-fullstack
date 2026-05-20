const BASE_URL = import.meta.env.VITE_API_URL ?? ""

// 회원 탈퇴 취소 API
export const cancelWithdraw = async (confirmEmail) => {
  const response = await fetch(`${BASE_URL}/members/withdraw/confirm`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ confirmEmail, mode: 'cancel' })
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message || '탈퇴 취소 요청 실패')
  }

  return data
}

// 회원 탈퇴 확정 API
export const confirmWithdraw = async (confirmEmail) => {
  const response = await fetch(`${BASE_URL}/members/withdraw/confirm`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ confirmEmail, mode: 'hard' })
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message || '탈퇴 요청 실패')
  }

  return data
}
