import {BrowserRouter} from 'react-router-dom'
import './app.css'
import Rotas from '../components/routes/Rotas'


export default () => {
    return(
        <BrowserRouter> 
            <div className="app back"> 
                <Rotas/>       
            </div>
        </BrowserRouter>
    )
};