import { useSelector } from "react-redux"
import './index.css'
import Search from '../search/Search'
import BoasVindas from './BoasVindas'
import Conteudo from "./Content"
import { useState } from "react"

export default ({children}) => {
    const consulta = useSelector((state) => state.consulta)
    const render = consulta.consulta.codigo ? true : false
    
    return (
            <div className="index-container"> 
                <Search/>
                <div className="main">
                    {
                        render ? <Conteudo/> : <BoasVindas/> ? <BoasVindas/> : <Conteudo/>
                    }
                    {children}
                </div>
            </div>
        
    )
}