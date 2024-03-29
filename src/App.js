import React, {useState,useEffect} from 'react';
// import Navbar from './components/Navbar/Navbar';
// import Products from './components/Products/Products'
import {Products,Navbar,Cart,Checkout} from './components';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import {commerce} from './lib/commerce';

 const App = () => {
     const [products,setProducts] = useState([])
     const[cart,setCart] = useState({})
     const fetchProducts = async () => {
          const {data} = await commerce.products.list();

          setProducts(data);
     }
     const fetchCart = async () => {
         setCart(await commerce.cart.retrieve())
     }

     const handleAddToCart = async (productId,quantity) => {
           const {cart}= await commerce.cart.add(productId,quantity);
           setCart(cart);
     }

     const handleUpdateCartQty = async (productId, quantity) => {
        const response = await commerce.cart.update(productId, { quantity }); //const {cart} = await commerce.cart.update(productId,{quantity})
    
        setCart(response.cart); //setCart(cart)
      };

      const handleRemoveFromCart = async (productId) => {
        const response = await commerce.cart.remove(productId);
    
        setCart(response.cart);
      };

      const handleEmptyCart = async () => {
        const response = await commerce.cart.empty();
    
        setCart(response.cart);
      }

     useEffect(() => {
       fetchProducts()
       fetchCart()
     },[])
     console.log(cart);
    return (
        <Router>
        <div>
            <Navbar totalItems={cart.total_items}/>
            <Switch>
                <Route exact path="/">
                   <Products products={products} onAddToCart={handleAddToCart}/>
                </Route>
                <Route exact path="/cart">
                    <Cart cart={cart}
                     handleUpdateCartQty ={handleUpdateCartQty}
                     handleRemoveFromCart={handleRemoveFromCart}
                     handleEmptyCart={handleEmptyCart} />  
                </Route>
                <Route exact path="/checkout">
                  <Checkout/>
                </Route>
            
            </Switch>
           
        </div>
     </Router>
    )
}

export default App;
