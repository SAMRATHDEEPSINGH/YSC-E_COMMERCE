export function fetchAllProduct(any=1){
    return new Promise(async (resolve)=>{
        const response=await fetch('http://localhost:9000/products')
        const data =await response.json()
        resolve({data})
    });
}


export function fetchProductsByFilters(filter,sort,pagination){
    let queryString='';
    for (let key in filter) {
        const categoryValues=filter[key];
        if (categoryValues.length>0) {
            const lastCategoryValue=categoryValues[categoryValues.length-1]
            queryString+=`${key}=${lastCategoryValue}&`
        }
    }

    for(let key in sort){
        queryString+=`${key}=${sort[key]}&`
    }
    for(let key in pagination){
        queryString+=`${key}=${pagination[key]}&`
    }

    return new Promise(async (resolve)=>{
        const response=await fetch(`http://localhost:9000/products?${queryString}`)
        const data =await response.json()
        const totalItems=await response.headers.get('X-Total-Count')
        resolve({data:{
            products:data,totalItems:+totalItems
        }})
    });
}

export function fetchCategories(){
    return new Promise(async (resolve)=>{
        const response=await fetch('http://localhost:9000/category')
        const data =await response.json()
        resolve({data})
    });
}

export function fetchBrands(){
    return new Promise(async (resolve)=>{
        const response=await fetch('http://localhost:9000/brands')
        const data =await response.json()
        resolve({data})
    });
}
export function fetchProductById(id){
    return new Promise(async (resolve)=>{
        const response=await fetch(`http://localhost:9000/products/${id}`)
        const data =await response.json()
        resolve({data})
    });
}


export function createProduct(product){
    return new Promise(async (resolve)=>{
        const response=await fetch(`http://localhost:9000/products/`,{
            method:'POST',
            body:JSON.stringify(product),
            headers:{'content-type':'application/json'},
        });
        const data =await response.json()
        resolve({data})
    });
}


export function updateProduct(update){
    return new Promise(async (resolve)=>{
        const response=await fetch(`http://localhost:9000/products/${update.id}`,{
            method:'PATCH',
            body:JSON.stringify(update),
            headers:{'content-type':'application/json'}
        })
        const data =await response.json()
        resolve({data})
    });
}