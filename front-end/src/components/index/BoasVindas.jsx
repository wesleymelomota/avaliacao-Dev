import './boasVindas.css'

export default () => {
    return(
        <div className="frases">
            <h1>Bem Vindo 😊</h1>
            <h3>Este sistema voçê pode...</h3>
            <ul>
                <li>Agendar Exames <a className='links' href='/exames'>Consulta</a></li>
                <li>Cadastrar, Atualizar, Excluir e Visualizar a lista de funcionarios <a className='links' href='/funcionarios'>Funcionarios</a></li>
                <li>Cadastrar, Atualizar, Excluir e Visualizar a lista de Exames <a className='links' href='/addexame'>Exames</a></li>
                <li>Visualizar o Relatorio de algum periodo ? <a className='links' href='/relatorio'>Relatorio</a></li>
                
            </ul>
        </div>

    )
}