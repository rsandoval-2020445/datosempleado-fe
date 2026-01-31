import { 
  CssBaseline 
} from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import GestionDeEmpleados from "./pages/GestionDeEmpleados"

function App() {

  return (
    <>
      <CssBaseline/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <GestionDeEmpleados/>
          }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
