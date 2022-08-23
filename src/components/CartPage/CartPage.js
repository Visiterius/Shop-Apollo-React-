import React from "react";
import './CartPage.scss'
import Product from "../Product/Product";

class CartPage extends React.Component{
    render() {
        return(
            <div className='props-wrapper'>
                <h1 className='props-header'>CART</h1>
                    <div className='scroller'>
                        {this.props.data.map(el=> JSON.parse(el)).map(el=>(
                            <Product CurrencyIndex={this.props.CurrencyIndex} key={el.id} el={el}/>
                        ))}
                    </div>
                <div className='total-quantity'>
                    <h1>Quantity : {this.props.data.length}</h1>
                    <h1>Total : {JSON.parse(this.props.data[0])
                        .prices[this.props.CurrencyIndex].currency.symbol} {Math.round(this.props.data
                        .map(el=>JSON.parse(el))
                        .map(el=>el.prices[this.props.CurrencyIndex].amount)
                        .reduce((a,b)=>a+b))}</h1>
                    <button className='cart-order'>ORDER</button>
                </div>
            </div>
        )
    }
}
export default CartPage

