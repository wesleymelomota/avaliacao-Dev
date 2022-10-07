import {Route, Redirect, Switch} from 'react-router-dom'


import Form from '../formulario/Form'
import Index from '../index/Index'
import Funcionario from '../funcionario/fucionario'

import Consulta from '../exame/Consulta'
import Relatorio from '../relatorio/Relatorio'
import ExameCrud from '../exame/ExameCrud'

export default () => {
    return (
        
        <Switch>
            <Route exact path='/' component={Index}/>
            <Route exact path='/funcionarios' component={Funcionario}/>
            <Route path='/addexame' component={ExameCrud}/>
            <Route path='/exames' component={Consulta}/>
            <Route path='/relatorio' component={Relatorio}/>
            <Redirect from='*' to='/'/>
        </Switch>
        
    )
}