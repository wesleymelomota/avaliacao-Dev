import {configureStore} from '@reduxjs/toolkit'
import Slice from './slice/CreateSlice'

const store = configureStore({
    reducer: {
        consulta: Slice
    }
})

export default store