import { Navigate, Route, Routes } from "react-router"
import Dashboard from "./pages/Dashboard"
import Error from "./pages/Error"
import Login from "./pages/Login"

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default App
