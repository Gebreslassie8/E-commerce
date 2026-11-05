import { Outlet } from 'react-router-dom'
import Footer from '../components/core/layout/Footer/Footer.tsx'
import PublicHeader from '../components/core/layout/Header/PublicHeader.tsx'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
    <PublicHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout