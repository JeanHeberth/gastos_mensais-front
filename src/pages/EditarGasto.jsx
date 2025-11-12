import { useParams } from "react-router-dom";
import GastoForm from "../components/GastoForm";

export default function EditarGasto() {
    const { id } = useParams();
    return <GastoForm modo="editar" gastoId={id} />;
}
