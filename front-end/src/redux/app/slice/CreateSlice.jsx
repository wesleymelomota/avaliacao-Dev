import {createSlice} from '@reduxjs/toolkit'

export const CreateSlice = createSlice({
    name: "consultas",
    initialState: {
        consulta: {
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
        },
        msg: '',
        listConsultas: []
    },
    reducers: {
        getCodigo(state, {payload}) {
            return {...state, consulta: payload}
        },

        getConsultas(state, {payload}){
            return {...state, listConsultas: payload}
        }
        
    }
})

export const { getCodigo, getConsultas } = CreateSlice.actions
export default CreateSlice.reducer