
import { useNavigate } from "react-router-dom";

import { useDispatch,useSelector } from "react-redux";
import axios from "axios";

const Register=()=>{

    axios.post("http://localhost:5000/users/register",{
        firstName,
        lastName,
        age,
        country,
        email,
        password
    }).then((res)=>{

    }).catch((err)=>{
        
    })
    return(
        <div>

        </div>
    )
}
export default Register