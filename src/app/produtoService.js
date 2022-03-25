const PRODUTOS = '_PRODUTOS';

export function ErrorValidation(errors) {
        this.errors = errors;
}

export default class ProdutoService{

    validar = (produto) =>{
        const errors = []

        //valida cada propriedade
        if(!produto.nome){
            errors.push('O campo Nome é obrigatório.')
        }

        if(!produto.sku){
            errors.push('O campo SKU é obrigatório.')
        }

        if(!produto.descricao){
            errors.push('O campo Descrição é obrigatório.')
        }

        if(!produto.fornecedor){
            errors.push('O campo Fornecedor é obrigatório.')
        }

        if(!produto.preco || produto.preco <= 0){
            errors.push('O campo Preço deve ter um valor maior ou igual a zero(0).')
        }

      

        //caso der erro
      
        if(errors.length > 0){
            throw new ErrorValidation(errors)
        }
    }

    obterProduto = () => {
        const produtos = localStorage.getItem(PRODUTOS)
        if(!produtos){
            return [];
        }
        return JSON.parse(produtos)
    }

    //obtem o index do produto
    obterIndex = (sku) => {
        let index = null;
        this.obterProduto().forEach((produto, i) =>{
            if(produto.sku === sku){
                index = i;
            }
        })
        return index;
    }

    
    deletar = (sku) =>{

        const index = this.obterIndex(sku)

        if(index != null){

            const produtos = this.obterProduto()

            produtos.splice(index, 1)//metodo splice corta um array, que recebe o index e quantos arrays quer deletar

            localStorage.setItem(PRODUTOS, JSON.stringify(produtos))

            return produtos//pra tirar da lista
        }
    }

    //metodo
    salvar = (produto) =>{
        this.validar(produto);

         let produtos = localStorage.getItem(PRODUTOS)//uma variável pois o seu valor vai variar de acordo com a condição que entrar no if

         if(!produtos){
             produtos = []
         }else{
             produtos = JSON.parse(produtos) //parse transforma string em json
         }

         //se não encontrar o produto, adiciona ele, se encontrar, altera os dados.
         const index = this.obterIndex(produto.sku)

         if(index === null){ 
            produtos.push(produto);
         }else{
             produtos[index] = produto;
         }

         
         localStorage.setItem(PRODUTOS, JSON.stringify(produtos)) //stringify - array para string
    }


    
}