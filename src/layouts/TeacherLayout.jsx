import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Navbar from '../components/Navbar.jsx'

export default function TeacherLayout() {
  return (
    <div className="h-screen w-full flex bg-ink-950">
      <Sidebar role="TEACHER" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title="Teacher" />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}