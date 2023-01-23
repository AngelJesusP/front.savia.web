import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './modules/auth/views/login'
import HomeMain from './modules/home/views/HomeMain'
import { ProtectedRoute } from './utils/components/ProtectedRoute';

export default function App() {
    return (
        <div className='container-app background-login' style={{ height: '100vh' }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/savia/login/" element={<Login />} />
                    <Route path="/savia/*" element={
                        <ProtectedRoute >
                            <HomeMain />
                        </ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </div>
    );
}