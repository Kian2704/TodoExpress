import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../userContext";

export default function Logout()
{
    let navigate = useNavigate();

    const out = async() => {
        await fetch('/auth/logout');
        navigate(0);
    }

    useEffect(() => {
        navigate('/')
        out();
    },[])

    return (<p>You shouldnt be here</p>);
}