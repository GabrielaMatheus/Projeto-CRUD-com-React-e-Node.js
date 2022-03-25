import React from "react";
import ProdutoService from "../../app/produtoService";
import {withRouter} from "react-router-dom";

import Card from '../../components/card'
import ProdutosTable from './produtosTable'

// //ATUALIZAÇÃO DA VERSÃO DO REACT: withRouter não existe mais, mas pode ser usado com a seguinte função:
// import { useNavigate } from "react-router";
// export const withRouter = (Component) => {
// 	const Wrapper = (props) => {
// 		const history = useNavigate();
// 		return <Component history={history} {...props} />;
// 	};
// 	return Wrapper;
// };



class ConsultaProdutos extends React.Component{

    state = {
        produtos : []
    }

    //instanciar é criar constructor
    constructor(){
        super()
        this.service = new ProdutoService();
    }
    //listando a tabela de produtos com os componentes do ciclo de vida do react
    componentDidMount(){
        const produtos = this.service.obterProduto();
        this.setState({produtos }) //poderia ser produtos : produtos, mas no ecmascript, quando a variavel tem o mesmo nome do valor, pode ser só assim.
    }

    preparaEditar = (sku) =>{
        console.log('sku para editar',sku)
        //redireciona para a tela de cadastro enviando o sku como parâmetro com react-router
        this.props.history.push(`/cadastro-produtos/${sku}`)
    }

    deletar = (sku) =>{
        const produtos = this.service.deletar(sku)
        this.setState({produtos})
    }

    render(){
        return(
            <>

            {/* componente */}
             <Card header={'Consulta de Produtos'}>

                {/* componente */}
                <ProdutosTable 
                produtos={this.state.produtos} 
                editarAction={this.preparaEditar} 
                deletarAction={this.deletar}
                /> 

            </Card>
        </>
        )
    }
}

export default withRouter(ConsultaProdutos)