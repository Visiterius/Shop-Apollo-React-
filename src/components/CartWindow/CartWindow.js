import React from "react"
import CartPage from "../CartPage/CartPage";
import './CartWindow.scss'
import Product from "../Product/Product";

class CartWindow extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            QuantityClicker:[1],
            CartClicked:false,
            items:this.props.data.categories[0].products
                .map(el=>el.id)
                .map(el=>localStorage
                .getItem(el))
                .filter(el=>el!==null),
        }
        this.handleQuantityChange=this.handleQuantityChange.bind(this)
    }

    CartHandleClick(){
        this.setState((prevState)=>{
            return {
                CartClicked:!prevState.CartClicked
            }
        })
    }

    handleQuantityChange=(quantity)=>{
        this.setState({
            QuantityClicker:[...this.state.QuantityClicker,quantity]
        })
    }
    render(){
        return(
            <div className='overlay'>
                {this.state.CartClicked
                    ?
                    <CartPage handleQuantityChange={this.handleQuantityChange}
                              QuantityClicker={this.state.QuantityClicker}
                              CurrencyIndex={this.props.CurrencyIndex}
                              data={this.state.items}/>
                    :
                    <div className='my-bag'>
                    <h2 className='bag-header'>My Bag, {this.state.items.length} items</h2>

                    <div className='cart-wrapper'>
                        <div className='hidden-scroll'>
                            {this.state.items.map(el=>JSON.parse(el)).map(el=>(
                                <Product handleQuantityChange={this.handleQuantityChange}
                                         CurrencyIndex={this.props.CurrencyIndex} key={el.id} el={el}/>
                            ))}
                        </div>
                    </div>
                    <div className='container-total'>
                        <h2 className='total'>Total</h2>
                            <h2 className='total-amount'>{JSON.parse(this.state.items[0])
                                .prices[this.props.CurrencyIndex].currency.symbol} {(this.state.items
                                .map(el=>JSON.parse(el))
                                .map(el=>el.prices[this.props.CurrencyIndex].amount)
                                .reduce((a,b)=>a+b)+this.state.QuantityClicker
                                .reduce((a,b)=>a+b)-1)
                                .toFixed(2)}
                            </h2>
                    </div>
                    <div className='cart-btns'>
                        <button onClick={()=> {
                            this.CartHandleClick();this.props.update()
                        }} className='view-bag'>VIEW BAG</button>
                        <button className='checkout'>CHECK OUT</button>
                    </div>
                </div>}
            </div>
        )
    }
}
export default CartWindow

