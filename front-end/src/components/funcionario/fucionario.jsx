import { useState, useEffect } from 'react'
import Button from '../uteis/Button'
import "./funcionario.css"
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"


export default() => {
    
    //states que armazena os objetos vindo do backend e os dados do formulario
    const [funcionario, setFuncionario] = useState({codigo: '', nome: ''})
    const [listFuncionario, setList] = useState([])
    
    //fazendo requesição no back-end e inserindo os dados no listFuncionario criando uma lista de objs
    useEffect(() => {
        axios.get("http://localhost:8080/funcionario/obterFuncionarios", {headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
            "Content-Type": "application/json;charset=UTF-8"
        }
    }).then(({data}) => {
            setList(data)
        }).catch((err) => console.log(`ERRO! ${err}`))
    }, [listFuncionario])

    //obj com o stado inicial
    const initialState = {
        codigo: "",
        nome: ''   
    }

    const getValueField = (e) => {
        const usuario = {...funcionario}
        usuario[e.target.name] = e.target.value
        setFuncionario(usuario)
        
    }

    //função que seta o initialstate nos campos do formulario o limpando
    const clear = () => {
        setFuncionario(initialState)
    }

    //fução que renderiza o formulario
    const renderForm = () => {
        return(
            <div className="form-group row mb-1 p-2">
                <div className="mb-1">
                    <label className="form-label">Código:</label>
                    <input className='form-control' value={funcionario.codigo}  onChange="{(e) => getValueField(e)}" type="number" name="codigo"/>
                </div>
                <div className="mb-1">
                    <label className="form-label">Nome:</label>
                    <input className="form-control" type="text" value={funcionario.nome} onChange={(e) => getValueField(e)} name="nome" placeholder='nome...'/>
                </div>
                <div className="btns">
                    <button type="button" className="btn btn-success" onClick={() => save(funcionario)}>Salvar</button>
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
                    <th>Nome</th>
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

    //função de renderizar as linhas
    const renderRow = () => {
        return listFuncionario.map((dado) => {
            return(
                <tr key={dado.codigo}>
                    <td>{dado.codigo}</td>
                    <td>{dado.nome}</td>
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
    const save = async (funcionario) => {
        
        const BaseUrl = funcionario.codigo ? `http://localhost:8080/funcionario/atualizar/${funcionario.codigo}` : `http://localhost:8080/funcionario/criar`
            const method = funcionario.codigo ? 'put' : 'post'
            const {data} = await axios[method](BaseUrl, funcionario, {headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Authorization",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
                
            }
        } )
        clear()
        alert(data)
    }

    const enviar = async (exame) => {
        
        const BaseUrl = `http://localhost:8080/exame/add/exame/funcionario`
        const {data} = await axios.put(BaseUrl, exame, {headers: {
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
        const {data} = await axios.delete(`http://localhost:8080/funcionario/excluir/${dado.codigo}`)
        alert(data)
    }

    //essa função pega os dados da tabela e renderiza no formulario
    const updateField = (funcionario) => {
        initialState.codigo = funcionario.codigo
        initialState.nome = funcionario.nome
        setFuncionario(initialState)
    }
 
    return(
        <div className="funcionario">
            <div>
                <h1 className="heade">Cadastro de Usuarios</h1>
                <div className="btn-home">
                    <a href="/">
                        <Button  cor="grey">Home</Button>
                    </a>
                </div>
            </div>
                <div className='formContent'>
                {
                    renderForm()
                }
                </div>
                {renderTable()}
            
        </div>
    )
}
