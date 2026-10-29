import {api} from '/.api';

export const menuRepository = {
    getCategories(){
        return api('/categories')
    }, 

    getProdutos(categoryId){
        if(categoryId){
            return api(`/products?categoryId=${categoryId}`);
    }
    return api('/´products');
}, 
}