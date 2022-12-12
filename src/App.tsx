import {
    BrowserRouter,
    Routes, // instead of "Switch"
    Route,
} from 'react-router-dom'
import { Login } from './modules/auth/views/login'
import { HomeMain } from './modules/home/views/home'

export default function App() {
    return (
        <div className='container-app'>
            <BrowserRouter>
                <Routes>
                    <Route path="/savia/login/" element={<Login />} />
                </Routes>
                <Routes>
                    <Route path="/savia/home/" element={<HomeMain />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}