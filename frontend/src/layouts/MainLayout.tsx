import { Outlet } from 'react-router-dom'
import Header from '../components/core/layout/Header/Header.tsx'
import Footer from '../components/core/layout/Footer/Footer.tsx'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout