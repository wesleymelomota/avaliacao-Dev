import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import "./relatorio.css"

export default (props) => {

    const [data1, setPrimeiraData] = useState()
    const [data2, setSegundaData] = useState()
    const [exames, setExames] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/consulta/obter`, {headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
            "Content-Type": "application/json;charset=UTF-8"
        }
    }).then(({data}) => {
            setExames(data)
            
        }).catch((err) => console.log(`Erro! ${err}`))
    })

    const renderListRelatorio = (dado, data1, data2) => {
        return exames.filter((dado) => dado.data >= data1 && dado.data <= data2).map((dados) => {
            return (
                <div className='card-body'>
                    <div className="card">
                        <ul>
                            <li>Código: {dados.exame.codigo}</li>
                            <li>Exame: {dados.exame.nomeExame}</li>
                            <li>Funcionario: {dados.funcionario.nome}</li>
                            <li>Código: {dados.funcionario.codigo}</li>
                            <li>Data Exame: {dados.data}</li>
                        </ul>
                    </div>
                </div>
            )
        })
    }
    
    return (
        <main className='flex-box'>
            <div>
                <header>
                    <h1 className="text-center">Relatorio</h1>
                    <Link to="/">
                        <button type="button" onClick="" className="btn btn-success m-2">Voltar</button>
                    </Link>
                </header>

            </div>
            
            <div className='inputs'>
                <div className="mb-3">
                    <label className="form-label">Data Inicial:</label>
                    <input className="form-control" type="date" value={data1} 
                    onChange={(e) => setPrimeiraData(e.target.value)} name="data" placeholder='dd/mm/aa'/>
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Data Final:</label>
                    <input className="form-control" type="date" value={data2} 
                    onChange={(e) => setSegundaData(e.target.value)} name="data" placeholder='dd/mm/aa'/>
                </div>
            </div>
            <div className='flex-container'>
                {renderListRelatorio(exames, data1, data2)}
            </div>
        </main>
    )
}