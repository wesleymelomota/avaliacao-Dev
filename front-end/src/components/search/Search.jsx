import './search.css'
import { useState } from 'react'
import axios from 'axios'
import {getCodigo} from '../../redux/app/slice/CreateSlice'
import {useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPeopleGroup, faFile, faCalendarDay, faUserDoctor } from "@fortawesome/free-solid-svg-icons"


export default ({children}) => {
    const [codigo, setCodigo] = useState()
    
    const dispatch = useDispatch()
    
    
    //função que busca o user no db
    const getConsulta = () => {
        axios.get(`http://localhost:8080/consulta/obter/${codigo}`)
            .then(({data}) => dispatch(getCodigo(data)))
            .catch((err) => console.log(`ERRO ${err}`))
        
    }
    
    return(
        <div className="search">
            
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/exames">Agendar Exames <FontAwesomeIcon icon={faCalendarDay}/></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/funcionarios">Funcionarios <FontAwesomeIcon icon={faPeopleGroup}/></a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link active" href="/addexame">Exames <FontAwesomeIcon icon={faUserDoctor} /></a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link active" href="/relatorio">Relatorio <FontAwesomeIcon icon={faFile} /></a>
                        </li>
                        <li class="nav-item dropdown">
                        </li>
                        <li class="nav-item">
                        <a class="nav-link " href='/'>#</a>
                        </li>
                    </ul>
                    <div class="d-flex">
                        <input class="form-control me-2" onChange={(e) => setCodigo(e.target.value)} type="search" placeholder="Pesquisar Consulta por codigo" aria-label="Pesquise por codigo"/>
                        <Link to="/user">
                            <button class="btn btn-outline-success" onClick={() => getConsulta()} type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                        </Link>
                    </div>
                    </div>
                    
                </div>
                </nav>
                
        </div>
    )
}