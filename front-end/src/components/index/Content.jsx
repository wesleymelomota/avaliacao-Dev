import { useSelector } from "react-redux"
import "./conteudo.css"

export default (props) => {

    const {consulta} = useSelector((state) => state)
    return(
        <div className="main">
            <div>
                <ul>
                    <li>Código Consulta: {consulta.consulta.codigo}</li>
                    <li>Código Exame: {consulta.consulta.exame.codigo}</li>
                    <li>Exame: {consulta.consulta.exame.nomeExame}</li>
                    <li>Código Funcionario: {consulta.consulta.funcionario.codigo}</li>
                    <li>Funcionario: {consulta.consulta.funcionario.nome}</li>
                    <li>Data do Exame: {consulta.consulta.data}</li>
                </ul>
            </div>
        </div>
    )
}