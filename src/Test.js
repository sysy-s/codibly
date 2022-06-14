import { useNavigate } from "react-router"

export default function Test() {
    const navigate = useNavigate();

    return <button onClick={() => navigate("/dupa")}>DUPA?</button>
}