import React from "react";
import ProdutoService from '../../app/produtoService';
import {withRouter} from 'react-router-dom'; //componente que permite a passagem de parametro pela URL

import Card from '../../components/card'

const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    sucesso: false,
    errors: [],
    atualizando : false
   
}


class CadastroProduto extends React.Component{

    state = estadoInicial;
  

    constructor(){
        super()
        this.service = new ProdutoService();
    }

    // esse onChange recebe o evento da tecla, pega o campo que disparou o evento e pega o valor que foi digitado la, atualizando o state com a propriedade que é referente aquele campo
    onChange = (event) =>{
        const valor = event.target.value //pega o valor do campo através do value
        const nomeCampo = event.target.name //pega o nome do campo através do name

        this.setState({ [nomeCampo]: valor })//dessa forma o js vai ver que é um campo dinamico, com chaves
    }

    //pra saber se os valores foram capturados corretamente, imprime cada objeto
    onSubmit = (event) =>{
        event.preventDefault();//previne que execute o submite normal do formulário.
        
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor
        }

        try {
            this.service.salvar(produto)
            this.limpaCampos()
            this.setState({sucesso: true})
        } catch (erro) {
            const errors = erro.errors
            this.setState({errors:errors})
        }

        //manda para o salvar no service pra, de la, mandar pro localstorage
        
    }

    onCloseMessageSucess =() =>{
        this.setState({sucesso: false})
    }


    limpaCampos =() =>{
        this.setState(estadoInicial)
    }

    componentDidMount(){
        const sku = this.props.match.params.sku

        if(sku){
            const resultado = this.service.obterProduto().filter(produto => produto.sku === sku)//o objeto filter filtra os elementos entre parentes da lista de obterProduto
            
            if(resultado.length === 1){
                const produtoEncontrado = resultado[0]
                this.setState({ ...produtoEncontrado, atualizando: true })///... é do ecmascript, pega as propriedades do objeto, extrai e joga no state
            }
        }
    }

    render(){
        
        return(
            <Card header={this.state.atualizando ? 'Edição de Produto ' : 'Cadastro de Produto'}>
               
                <form id="frmProduto" onSubmit={this.onSubmit}>
                    { this.state.sucesso && 
                            
                            <div className="alert alert-dismissible alert-success">
                                <strong>Sucesso</strong> Cadastro realizado com sucesso!.
                                <button  onClick={this.onCloseMessageSucess} type="button" className="close" data-dismiss="alert">X</button>
                            </div>
                        
                    }      

                    { this.state.errors.length > 0 &&
                        
                        this.state.errors.map( msg => {
                            return (
                                <div className="alert alert-dismissible alert-danger">
                                    <button type="button" className="close" data-dismiss="alert">X</button>
                                    <strong>Erro!</strong> {msg}
                                </div>
                            )
                        })                       
                        
                    }       

                        <div className="row">
                            <div className="col-md-6">
                                {/* form-group no bootstrap é um label com algum campo */}
                                <div className="form-group">
                                    <label>Nome: *</label>

                                    <input type="text" 
                                    name="nome" 
                                    onChange={this.onChange}
                                    value={this.state.nome} 
                                    className="form-control"/>
                                </div>
                            
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>SKU: *</label>
                                    <input type="text" 
                                    name="sku" 
                                    disabled = {this.state.atualizando}
                                    onChange={this.onChange}
                                    value={this.state.sku} 
                                    className="form-control"/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Descrição: *</label>
                                    <textarea name="descricao" 
                                    onChange={this.onChange}
                                    value={this.state.descricao} 
                                    className="form-control"/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Preço: *</label>
                                    <input type="text" 
                                    name="preco" 
                                    onChange={this.onChange}
                                    value={this.state.preco} 
                                    className="form-control"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Fornecedor: *</label>
                                    <input type="text" 
                                    name="fornecedor" 
                                    onChange={this.onChange}
                                    value={this.state.fornecedor} 
                                    className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-md-1">
                                <button type="submit" className="btn btn-success">
                                    {this.state.atualizando ? 'Editar' : 'Salvar'}
                                </button>
                            </div>

                            <div className="col-md-1">
                                <button onClick={this.limpaCampos} className="btn btn-primary">Limpar</button>
                            </div>
                        </div>
                </form>
            </Card>
         
        )
    }
}

export default withRouter(CadastroProduto);