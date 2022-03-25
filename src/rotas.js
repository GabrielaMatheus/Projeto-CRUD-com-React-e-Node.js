import React from "react";

import {Switch , Route} from 'react-router-dom';

import Home from './views/home';
import CadastroProduto from './views/produtos/cadastro';
import ConsultaProdutos from './views/produtos/consulta';

//esse componente não tera nenhum componente extra, então pode ser como arrow function
//exact={true} - no react pode colocar só o exact. Quer dizer que quando acessar a rota/cadastro-produtos, imprime o CadasttroProduto
export default () =>{
    return (
        
            <Switch>
                
                <Route exact path="/cadastro-produtos/:sku?" component={CadastroProduto} />
                <Route exact path="/consulta-produtos" component={ConsultaProdutos} />
                <Route exact path="/" component={Home}/>
                
            </Switch>
        
    )
}