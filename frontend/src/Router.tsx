import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Index } from "./pages"
import { List } from "./pages/list"

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index/>} />
                <Route path="/list" element={<List/>}/>
            </Routes>
        </Router>
    )
}