import React from "react";
import './CartPage.scss'
import Product from "../Product/Product";
import styled from "styled-components";

const CartWrapper = styled.section`
  .cart-img{
    height: unset;
  }
  .items-order {
    display: flex;
    padding: 10px;
    justify-content: space-evenly;
  }
  .quantity{
    width: 58px;
    height: 263px;
    padding-right: 23px;
  }
  .img-wrap{
    height: 208px;
    width: 208px;
    display: flex;
  }
  .quantity > button {
    height: 30px;
    width: 30px;
  }
  .items{
    width: 259px;
    font-size: 24px;
  }
  .cart-sizes{
    font-size: 20px;
  }
`

class CartPage extends React.Component{
    render() {
        return(
            <div className='props-wrapper'>
                <h1 className='props-header'>CART</h1>
                    <div className='scroller'>
                        {this.props.data.map(el=> JSON.parse(el)).map(el=>(
                                <CartWrapper key={el.id}>
                                    <Product update={this.props.update}
                                             handleQuantityChange={this.props.handleQuantityChange}
                                             data={this.props.data}
                                             CurrencyIndex={this.props.CurrencyIndex} key={el.id} el={el}/>
                                </CartWrapper>
                        ))}
                    </div>
                <div className='total-quantity'>
                    <h1>Quantity : {this.props.data.length}</h1>
                    <h1>Total : {JSON.parse(this.props.data[0])
                        .prices[this.props.CurrencyIndex].currency.symbol} {(this.props.data
                        .map(el=>JSON.parse(el))
                        .map(el=>el.prices[this.props.CurrencyIndex].amount)
                        .reduce((a,b)=>a+b)+this.props.QuantityClicker
                        .reduce((a,b)=>a+b)-1)
                        .toFixed(2)}</h1>
                    <button className='cart-order'>ORDER</button>
                </div>
            </div>
        )
    }
}
export default CartPage

