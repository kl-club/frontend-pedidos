export const paymentService = {
    
    charge(){
        return new Promise( resolve => {
            setTimeout(() => resolve('approved'), 4000)
        })
    }
}