import Header from "../components/Header"
import DashboardContent from "../components/DashboardContent"
import { useAppSelector } from "../hooks/useAppDispatch"
import { Navigate } from "react-router"

const Dashboard = () => {
  const { isLogin } = useAppSelector((state) => state.persistedReducer)

  if (!isLogin) return <Navigate to="/login" replace />
  return (
    <>
      <Header />

      <DashboardContent />
    </>
  )
}

export default Dashboard
