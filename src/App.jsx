import Home from "./pages/Home.jsx"
import { Routes, Route } from "react-router"
import PostDetails from "./pages/PostDetails.jsx"
import Navbar from "./components/Navbar.jsx"

function App() {
    return (
        <>
         
         <Navbar />

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
        </Routes>

       </>  
    )

}

export default App
