import { useState, useEffect } from 'react'
import Button from '../uteis/Button'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import "./exame.css"

export default (props) => {
    const [exame, setExame] = useState({nomeExame: "", codigo: ""} )
    const [listExames, setList] = useState([])
    
    const [listConsultas, setListConsulta] = useState([])

    /*
    {
        "codigo": 2,
        "funcionario": {
            "codigo": 97,
            "nome": "dante"
        },
        "data": "2022-10-10",
        "exame": {
            "codigo": 62,
            "nomeExame": "Sangue"
        }
    }
    */

    //fazendo requesição no back-end e inserindo os dados no listExames criando uma lista de objs
    /*useEffect(() => {
        axios.get("http://localhost:8080/exame/obter/exames", {headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
            "Content-Type": "application/json;charset=UTF-8"
        }
    } ).then(({data}) => {
            setList(data)
        }).catch((err) => console.log(`ERRO! ${err}`))
    }, [listExames])
    

    //obj com o stado inicial
    const initialState = {
        codigo: "",
        nomeExame: "",
        funcionario: {
            codigo: "",
            nome: ""
        },
        data: ""        
    }*/
    const initialState = {
        codigo: "",
        nomeExame: ""        
    }
    useEffect(() => {
        axios.get("http://localhost:8080/exame/obter/exames", {headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
            "Content-Type": "application/json;charset=UTF-8"
        }
    } ).then(({data}) => {
            setList(data)
        }).catch((err) => console.log(`ERRO! ${err}`))
    }, [listExames])

    useEffect(() => {
        axios.get("http://localhost:8080/consulta/obter/", {headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
            "Content-Type": "application/json;charset=UTF-8"
        }
    } ).then(({data}) => {
            setListConsulta(data)
            
        }).catch((err) => console.log(`ERRO! ${err}`))
    }, [listExames])

    const getValueField = (e) => {
        const Exame = {...exame}
        Exame[e.target.name] = e.target.value
        setExame(Exame)
        
    }

    //função que seta o initialstate nos campos do formulario o limpando
    const clear = () => {
        setExame(initialState)
    }

    //fução que renderiza o formulario
    const renderForm = () => {
        return(
            <div className="form-group row mb-3">
                <div className="mb-3">
                    <label className="form-label">Código:</label>
                    <input className='form-control' value={exame.codigo}  
                    onChange="{(e) => getValueField(e)}" type="number" name="codigo"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Nome exame:</label>
                    <input className="form-control" type="text" value={exame.nomeExame} 
                    onChange={(e) => getValueField(e)} name="nomeExame" placeholder='exame...'/>
                </div>
                <div className="btns">
                    <button type="button" className="btn btn-success" onClick={() => save(exame)}>Salvar</button>
                    <button type="button" className="btn btn-secondary" onClick={() => clear()}>Cancelar</button>
                </div>
            </div>
        )
    }

    //função de renderizar a tabela 
    const renderTable = () => {
        return(
            <table className="table table-dark table-striped">
                <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome Exame</th>
                    <th>Ações</th>
                    <th>
                        <a href="/">
                            <Button  cor="grey">Home</Button>
                        </a>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {renderRow()}                
                </tbody>
            </table>
        )
    }

    //função de renderizar as linhas
    const renderRow = () => {
        return listExames.map((dado) => {
            
            return(
                <tr key={dado.codigo}>
                    <td>{dado.codigo}</td>
                    <td>{dado.nomeExame}</td>
                    <td className="linha">
                        <button type="button" onClick={() => excluir(dado)} className="btn btn-danger"><FontAwesomeIcon icon={faTrash}/></button>
                        <button type="button" onClick={() => updateField(dado)} className="btn btn-primary m-2"><FontAwesomeIcon icon={faPencil}/></button>       
                    </td>
                    <td></td>
                </tr>
            ) 
        })
    }

    //função que salva os dados vindo do formulario
    const save = async (exame) => {
        const BaseUrl = exame.codigo ? `http://localhost:8080/exame/atualizar` : `http://localhost:8080/exame/criar`
        const method = exame.codigo ? 'put' : 'post'
        const {data} = await axios[method](BaseUrl, exame, {headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE"
            
        }
    } )       
        clear()
        alert(data)
    }
    
    //função que exclui um usuario pelo id 
    const excluir = async (dado) => {
        const filterExames = listConsultas.find((element) => element.exame.codigo === dado.codigo )
        console.log(filterExames)
        if(filterExames === undefined){
            const {data} = await axios.delete(`http://localhost:8080/exame/excluir/${dado.codigo}`)
            alert(data)
        }else{
            alert(`Existe Funcionario Agendado para este Exame ${dado.nomeExame} `)
        }
       
    }

    //essa função pega os dados da tabela e renderiza no formulario
    const updateField = (dado) => {
        initialState.codigo = dado.codigo
        initialState.nomeExame = dado.nomeExame
        
        setExame(initialState)
    }
 
    return(
        <div className="content">
            <div className="heade">
                <h1 className="align-texte-center">Exames</h1>
            </div>
                {renderTable()}
                <div className='formContent'>

                {
                     
                     renderForm() 
                
                }
                </div>
            
        </div>
    )
}
