import {Link} from "react-router-dom";


const WelcomePage = () => {
    return (
        <div>
            <h1>Welcome Page</h1>
            <Link to={'/login'}>to login</Link>
        </div>
    );
};

export default WelcomePage;
