import { 
  CssBaseline 
} from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import GestionDeEmpleados from "./pages/GestionDeEmpleados"
import NotFound from "./pages/NotFound"

function App() {

  return (
    <>
      <CssBaseline/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <GestionDeEmpleados/>
          }/>
          <Route path="*" element={
            <NotFound />
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
