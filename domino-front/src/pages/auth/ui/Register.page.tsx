import {Link} from "react-router-dom";


const RegisterPage = () => {
    return (
        <div>
            <h1>register</h1>
            <Link to={'/login'}>to login</Link>
            <br/>
            <Link to={'/'}>to home</Link>
        </div>
    );
};

export default RegisterPage;
