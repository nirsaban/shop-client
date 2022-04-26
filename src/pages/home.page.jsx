import React, { useEffect, useState } from 'react'
import Product from '../components/product/product'
import httpRequest from '../classes/httpRequest'
import apiRoutes from '../config/routesApi.json'
import { MDBContainer ,MDBBtn} from 'mdb-react-ui-kit';
import { split_array } from '../helpers/functionUtils';
import ProductsCollection from '../components/ProductsCollection/ProductsCollection'
import PackagesCollection from '../components/PackagesCollection/PackagesCollection'
import { MDBRating } from 'mdbreact';
import SearchTool from '../components/searchTool/searchTool'
import Contact from '../components/contact/contact'
import About from '../components/about/about'
const Home = () => {
    const [state, setState] = useState({ products: [], packages: [] })
    const [filterData, setFilterData] = useState(state.products)
    useEffect(() => {
        if (state['products'].length === 0) {
            (async () => {
                try {
                    const promiseProducts = (new httpRequest(apiRoutes.product.GET_PRODUCTS).get())
                    const promisePackages = (new httpRequest(apiRoutes.package.GET_PACKAGES).get())
                    const [responseProducts, responsePackages] = await Promise.all([promiseProducts, promisePackages]);
                    let productsSplit = split_array(responseProducts.data, 4);
                    setState(p => ({ ...p, ["products"]: productsSplit, ["packages"]: responsePackages.data }))
                    console.log(productsSplit)
                    setFilterData(productsSplit)
                } catch (error) {
                  
                    setState(p => ({ ...p, ["error"]: error.response.data }))
                }
            })()
        }
    }, [])
    const handleSearch = (event) => {
        let value = event.target.value.toLowerCase();
        let result = [];
       
        result = state.products.map(arr => arr.filter(product => product.product_name.includes(value))).filter(arr => arr.length > 0).filter(x =>x.length > 0).sort((a,b) => b.length-a.length)
        setFilterData(result)
    }
    const joinProductsToPackage = (products,packages) => {
       
        let productsObj = {};
        products.forEach((pr,index) => {
            productsObj[pr.id] = pr.product_name;
        })
        for(let i = 0; i < packages.length; i++){
            let productsArr = JSON.parse(packages[i].products);
            packages[i]['products'] = productsArr.map(product => {
                return productsObj[product]
            })
        }
       
        return packages
    }

    return (
        <MDBContainer fluid  className='bg' >
         <About id="About">about</About>
            <header >
                <div className='p-5 text-center bg-light header'>
                    <h1 className='mb-3  display-1'>Top Packages</h1>
                    {
                    state.packages.length > 0 ?
                        <PackagesCollection packages={state.packages} />
                        : null
                      }
                
                </div>
                
            </header>
            <MDBContainer >     
                 <SearchTool handleSearch={handleSearch}/>
            </MDBContainer>

            {
                state.products.length > 0 ?
                    <ProductsCollection products={filterData }  className = "d-flex justify-content-center" />
                    : null
            }
           
            <Contact id ="contact"/>
           

        </MDBContainer>
    )


}


export default Home