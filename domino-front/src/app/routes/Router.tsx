import {Route, Routes} from "react-router-dom";
import WelcomePage from "../../pages/home/ui/WelcomePage.tsx";
import RegisterPage from "../../pages/auth/ui/Register.page.tsx";
import LoginPage from "../../pages/auth/ui/Login.page.tsx";

export const Router = () => {
    return (
        <Routes>
            <Route path={'/'} element={<WelcomePage/>}/>
            <Route path={'/register'} element={<RegisterPage/>}/>
            <Route path={'/login'} element={<LoginPage/>}/>
        </Routes>
    )
}