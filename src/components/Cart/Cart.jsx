import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({cart,handleUpdateCartQty,handleRemoveFromCart,handleEmptyCart}) => {
   
    const classes = useStyles();
    
    const EmptyCart = () =>{
      return  (<Typography variant="subtitle1">Your Cart Is Empty!! 
        <Link to="/"> please Add Some Items</Link>!
        </Typography>)
    }
    const FilledCart =() => {
      return  (<>
        <Grid container spacing={3}>
           {cart.line_items.map((item) =>{
             return (<Grid item xs={12} sm={4} key={item.id} >
                 <CartItem item={item} onUpdateCartQty= {handleUpdateCartQty} onRemoveFromCart = {handleRemoveFromCart} />
                 {/* <div>{item.name}</div> */}
              </Grid>) 
           })}
        </Grid>
        <div className={classes.cardDetails}>
            <Typography variant="h4">SubTotal:{cart.subtotal.formatted_with_symbol}</Typography>
        </div>
        <div>
        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty cart</Button>
            <Button component={Link} to="/checkout" className={classes.checkoutButton}  size="large" type="button" variant="contained" color="primary">CheckOut</Button>
        </div>
        </>)
    }
    if (!cart.line_items) return 'loading....'
    return (
        <Container>
            <div className={classes.toolbar}/>
          <Typography className={classes.title} variant="h2" gutterBottom>Your Shopping Cart</Typography>
         {!cart.line_items.length ? <EmptyCart/> :<FilledCart/>}
        </Container>
    )
}

export default Cart
