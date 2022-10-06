import './form.css'
//import UseConfig from '../../hooks/StatesUteis'
import { useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
//const {GetUser} = UseConfig()


export default (props) => {
    const [nomeExame, setNome] = useState()
    const [codigo, setCodigo] = useState()
    const [data, setData] = useState()
    const [Exame, setExame] = useState({funcionario: {nome: ""}, nomeExame: "", data: ""} )
    
    const [nome, setNomeFuncionario] = useState()
    /*pegar os dados do input armazenar no state e fazer uma requisicao via post com axios */
    
    const initialState = {
    nome: {nome: ""},
    nomeExame: "",
    data: ""
    }

    const exame = {
        nomeExame: nomeExame,
        funcionario: {
            nome: nome
        },
        data: data
    }

    const getValueField = (e) => {
        const exame = {...Exame}
        exame[e.target.name] = e.target.value
        setExame(exame)
        
    }
    
    const salvar = () => {
        axios.post('http://localhost:8080/exame/criar/funcionario', {
           "funcionaro": {"nome": "vergil"}, "nomeExame": "Sangue", "data": "2022/10/23"
        }).then(({data}) => {
            alert(data)
        }).catch((err) => {
            alert(`ERRO: ${err}`)
        })
        console.log(Exame)
    }

    return(
        <div className="formulario form-group row mb-3">
                <div className="mb-3">
                    <label className="form-label">Nome Exame:</label>
                    <input className='form-control' value={Exame.nomeExame}  
                    onChange={(e) => getValueField(e)} type="text" name="nomeExame"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Data Exame:</label>
                    <input className="form-control" type="datetime-local" value={Exame.data} 
                    onChange={(e) => getValueField(e)} name="data" placeholder='dd/mm/aa'/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Nome do Funcionario:</label>
                    <input className="form-control" type="text" value={Exame.funcionario.nome} 
                    onChange={(e) => getValueField(e)} name="funcionario" placeholder='funcionario...'/>
                </div>
                <div className="btns">
                    <button type="button" className="btn btn-success" onClick={() => salvar()}>Salvar</button>
                    <Link to="/">
                        <button type="button" className="btn btn-secondary" onClick="{() => clear()}">Cancelar</button>
                    </Link>
                </div>
        </div>)
        {/*<div className="formulario">

            <div className=" form-group row mb-3">
                    <div className="mb-3">
                        <label className="form-label">Código:</label>
                        <input className='form-control' onChange={(e) => setCodigo(e.target.value)}
                        name="codigo"
                        value={codigo} type="text" placeholder='codigo funcionario'/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nome Exame:</label>
                        <input className='form-control' onChange={(e) => setNome(e.target.value)} 
                        name="nomeExame"
                        value={nomeExame} type="text" placeholder='sangue...'/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Data Exame:</label>
                        <input className='form-control' onChange={(e) => setData(e.target.value)}
                        name="data" 
                        value={data} type="datetime-local" placeholder='dd/mm/aa'/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nome Funcionario:</label>
                        <input className='form-control' onChange={(e) => setNomeFuncionario(e.target.value)} 
                        name="nomeFuncionario"
                        value={nomeFuncionario} type="text" placeholder='funcionario'/>
                    </div>
                    <div className="div-btn">
                        <button onClick={() => salvar(exame)} className="btn btn-success m-2" type='submit'>Salvar</button>
                        <a href='/'>
                            <button type="button" className="btn btn-secondary m-2">Cancelar</button>
                        </a>
                    </div>
            </div>
        </div>
    */}
}