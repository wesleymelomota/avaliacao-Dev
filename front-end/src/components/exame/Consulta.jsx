import { useState, useEffect } from 'react'
import Button from '../uteis/Button'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import "./exame.css"
import "./consulta.css"
import { getConsultas } from '../../redux/app/slice/CreateSlice'
import {useDispatch} from 'react-redux'


export default (props) => {
    const [exame, setExame] = useState({codigo: 0,
    funcionario: {
        codigo: 0,
        nome: ""
    },
    data: "",
    exame: {
        codigo: 0,
        nomeExame: ""
    }    } )
    const [listConsultas, setList] = useState([])
    const [listExames, setListExames] = useState([])
    const [listFuncionario, setListFuncionario] = useState([])
    const dispatch = useDispatch();
    
    const [form, setForm] = useState(true)

    const initialState = {
            codigo: 0,
            funcionario: {
                codigo: 0,
                nome: ""
            },
            exame: {
                codigo: 0,
                nomeExame: ""
            },      
            data: 0
    }
    useEffect(() => {
        axios.get("http://localhost:8080/consulta/obter/", {headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
            "Content-Type": "application/json;charset=UTF-8"
        }
    } ).then(({data}) => {
            setList(data)
            dispatch(getConsultas(data))
        }).catch((err) => console.log(`ERRO! ${err}`))
    }, [listExames])

    useEffect(() => {
        axios.get("http://localhost:8080/funcionario/obterFuncionarios", {headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
            "Content-Type": "application/json;charset=UTF-8"
        }
    } ).then(({data}) => {
            setListFuncionario(data)
        }).catch((err) => console.log(`ERRO! ${err}`))
    }, [listFuncionario])

    useEffect(() => {
        axios.get("http://localhost:8080/exame/obter/exames", {headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
            "Content-Type": "application/json;charset=UTF-8"
        }
    } ).then(({data}) => {
            setListExames(data)
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
                    <label className="form-label">Código Exame:</label>
                    <input className='form-control' value={exame.exame.codigo}  
                    onChange="{(e) => getValueField(e)}" type="number" name="exame"/>
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Código Funcionario:</label>
                    <input className="form-control" type="number" value={exame.funcionario.codigo} 
                    onChange="{(e) => getValueField(e)}" name="funcionario" placeholder='codigo funcionario'/>
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Data Exame:</label>
                    <input className="form-control" type="date" value={exame.data} 
                    onChange={(e) => getValueField(e)} name="data" placeholder='dd/mm/aa'/>
                </div>
                <div className="btns">
                    <button type="button" className="btn btn-success" onClick={() => save(exame)}>Salvar</button>
                    <button type="button" className="btn btn-secondary" onClick={() => clear()}>Cancelar</button>
                </div>
            </div>
        )
    }


    //formulario para atualizar
    const renderFormUpdate = () => {
        return(
            <div className="form-group row mb-3">
                <div className="mb-3">
                    <label className="form-label">Código Consulta:</label>
                    <input className='form-control' value={exame.codigo}  
                    onChange="{(e) => getValueField(e)}" type="number" name="exame"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Código Exame:</label>
                    <input className='form-control' value={exame.exame.codigo}  
                    onChange={(e) => getValueField(e)} type="number" name="exame"/>
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Código Funcionario:</label>
                    <input className='form-control' value={exame.funcionario.codigo}  
                    onChange={(e) => getValueField(e)} type="number" name="funcionario"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Data Exame:</label>
                    <input className="form-control" type="date" value={exame.data} 
                    onChange={(e) => getValueField(e)} name="data" placeholder='dd/mm/aa'/>
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
                    <th>data do exame</th>
                    <th>funcionario</th>
                    <th>funcionario codigo</th>
                    <th>Ações</th>
                    <th>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {renderRow()}                
                </tbody>
            </table>
        )
    }

    const renderTableFuncionario = () => {
        return(
            <table className="table table-dark table-striped">
                <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {renderRowFuncionario()}                
                </tbody>
            </table>
        )
    }
    const renderTableExame = () => {
        return(
            <table className="table table-dark table-striped">
                <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {renderRowExame()}                
                </tbody>
            </table>
        )
    }

    //função que renderiza as linhas
    const renderRow = () => {
        return listConsultas.map((dado) => {
            
            return(
                <tr key={dado.codigo}>
                    <td>{dado.exame.codigo}</td>
                    <td>{dado.exame.nomeExame}</td>
                    <td>{dado.data}</td>
                    <td>{dado.funcionario.nome}</td>
                    <td>{dado.funcionario.codigo}</td>

                    <td className="linha">
                        <button type="button" onClick={() => excluir(dado.funcionario.codigo, dado.exame.codigo,
                            dado.codigo)} className="btn btn-danger"><FontAwesomeIcon icon={faTrash}/></button>
                        <button type="button" onClick={() => updateField(dado)} className="btn btn-primary m-2"><FontAwesomeIcon icon={faPencil}/></button>       
                    </td>
                    <td></td>
                </tr>
            ) 
        })
    }

    const renderRowFuncionario = () => {
        return listFuncionario.map((dado) => {
            
            return(
                <tr key={dado.codigo}>
                    <td>{dado.codigo}</td>
                    <td>{dado.nome}</td>
                    <td className="linha">
                        <button type="button" onClick={() => getIdFuncionario(dado)} className="btn btn-success m-2"><FontAwesomeIcon icon={faPlus}/></button>
                    </td>
                    
                </tr>
            ) 
        })
    }
    const renderRowExame = () => {
        return listExames.map((dado) => {
            
            return(
                <tr key={dado.codigo}>
                    <td>{dado.codigo}</td>
                    <td>{dado.nomeExame}</td>
                    <td className="linha">
                        <button type="button" onClick={() => getIdExame(dado)} className="btn btn-success m-2"><FontAwesomeIcon icon={faPlus}/></button>
                    </td>
                    
                </tr>
            ) 
        })
    }

    //função que salva os dados vindo do formulario
    const save = async (exame) => {
        const filterExames = listConsultas.find((element) => element.funcionario.codigo === exame.funcionario.codigo && 
        element.data === exame.data && element.exame.codigo === exame.exame.codigo)
        
        if(filterExames === undefined){
            const BaseUrl = exame.codigo ? `http://localhost:8080/consulta/atualizar` : `http://localhost:8080/consulta/criar`
            const method = exame.codigo ? 'put' : 'post'
            const {data} = await axios[method](BaseUrl, exame, {headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Authorization",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE"
                
            }
        } )       
            clear()
            alert(data)
        }else{
            alert("Consulta já cadastrada para esta data")
        }
        
    }
    
    //função que exclui a consulta pelo id 
    const excluir = async (codigoF, codigoE, codigo) => {
        const {data} = await axios.delete(`http://localhost:8080/consulta/excluir/${codigoF}/${codigoE}/${codigo}`)
        alert(data)
    }
    
    const getIdFuncionario = (dado) => {
        const consulta = {...exame}
        consulta.funcionario.codigo = dado.codigo
        setExame(consulta)
    }
    const getIdExame = (dado) => {
        const consulta = {...exame}
        consulta.exame.codigo = dado.codigo
        setExame(consulta)
    }

    //essa função pega os dados da tabela e renderiza no formulario
    const updateField = (dado) => {
        initialState.codigo = dado.codigo //consulta
        initialState.exame.codigo = dado.exame.codigo
        initialState.funcionario.codigo = dado.funcionario.codigo
        initialState.data = dado.data //consulta
        setForm(false)
        setExame(initialState)
    }
 
    return(
        <div className="contente-main">
            <div className="heade">
                <h1 className="align-texte-center">Exames</h1>
                <div className='btn-home m-2'>
                    <a href="/">
                        <Button  cor="grey">Home</Button>
                    </a>
                </div>
            </div>
                <div className="tabelas">
                    {renderTableExame()}
                    {renderTableFuncionario()}
                </div>
                <div className='formContent'>
                    {   
                    form ?  renderForm() : renderFormUpdate()       
                }
                </div>
                {renderTable()}
            
        </div>
    )
}
