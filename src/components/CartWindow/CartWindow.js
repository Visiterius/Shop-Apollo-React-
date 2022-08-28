import React from "react"
import CartPage from "../CartPage/CartPage";
import './CartWindow.scss'
import Product from "../Product/Product";

class CartWindow extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            CartClicked:false,
            items:this.props.data.categories[0].products
                .map(el=>el.id)
                .map(el=>localStorage
                .getItem(el))
                .filter(el=>el!==null),
            SizesButtons:['XS','S','M','L'],
            ColorsButton:['#D3D2D5','#2B2B2B','#0F6450']
        }
    }

    CartHandleClick(){
        this.setState((prevState)=>{
            return {
                CartClicked:!prevState.CartClicked
            }
        })
    }

    render(){

        return(
            <div className='overlay'>
                {this.state.CartClicked
                    ?
                    <CartPage CurrencyIndex={this.props.CurrencyIndex}
                              sizeBtn={this.state.SizesButtons}
                              colorBtn={this.state.ColorsButton}
                              data={this.state.items}/>
                    :
                    <div className='my-bag'>
                    <h2 className='bag-header'>My Bag, {this.state.items.length} items</h2>

                    <div className='cart-wrapper'>
                        <div className='hidden-scroll'>
                            {this.state.items.map(el=>JSON.parse(el)).map(el=>(
                                <Product CurrencyIndex={this.props.CurrencyIndex} key={el.id} el={el}/>
                            ))}
                        </div>
                    </div>
                    <div className='container-total'>
                        <h2 className='total'>Total</h2>
                            <h2 className='total-amount'>{JSON.parse(this.state.items[0])
                                .prices[this.props.CurrencyIndex].currency.symbol} {Math.round(this.state.items
                                .map(el=>JSON.parse(el))
                                .map(el=>el.prices[this.props.CurrencyIndex].amount)
                                .reduce((a,b)=>a+b))}
                            </h2>
                    </div>
                    <div className='cart-btns'>
                        <button onClick={()=>this.CartHandleClick()} className='view-bag'>VIEW BAG</button>
                        <button className='checkout'>CHECK OUT</button>
                    </div>

                </div>}
            </div>
        )
    }
}
export default CartWindow

