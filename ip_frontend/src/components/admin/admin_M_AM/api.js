
const BASE_URL = 'http://localhost:3000/api'; // adjust if backend is elsewhere

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}` // if JWT auth
    },
    ...options
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw { status: res.status, data };
  return data;
}

export const api = {
  // Users
  getUsers: (params = '') => request(`/users${params}`),

  // Attendance
  markAttendance: (body) =>
    request('/manager/attendance/mark', { method: 'POST', body: JSON.stringify(body) }),

  getTodayAttendance: (date) =>
    request(`/attendance/today?date=${encodeURIComponent(date)}`),

  getPreviousAttendance: (params = '') =>
    request(`/attendance/previous${params}`),

  getAttendanceSummary: (date) =>
    request(`/attendance/summary?date=${encodeURIComponent(date)}`),

  getMemberHistory: (params = '') =>
    request(`/attendance/member/history${params}`),

  // ✅ FIXED: requires userId and optional query string
  getMemberAttendance: (userId, query = '') =>
    request(`/attendance/member/${userId}${query}`),

  deleteMemberFromToday: (body) =>
    request('/attendance/today/delete', { method: 'POST', body: JSON.stringify(body) }),

  updateMemberSlot: (body) =>
    request('/attendance/today/update-slot', { method: 'POST', body: JSON.stringify(body) }),
};
