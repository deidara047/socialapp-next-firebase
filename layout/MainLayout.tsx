import Navbar from "../components/Navbar"
import { ReactElement } from "react"

export default function MainLayout({children}: {children: ReactElement}) {
  return (<>
    <Navbar/>
    <div className="main-content container">
      {children}
    </div>
    </>
  )
}