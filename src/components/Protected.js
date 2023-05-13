
import { Navigate, useNavigate } from "react-router-dom";
import { UserAuth } from "../AuthContext";

const Protected = ({children}) => {

    const { user } = UserAuth();
    const navigate = useNavigate()

    if (!user) {
        return <Navigate to="/"/>
    }
    return children;
}

export default Protected;