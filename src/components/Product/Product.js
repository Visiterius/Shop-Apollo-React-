import React from "react";
import './Product.scss'

class Product extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            QuantityClicker:1,
            SessionStorage:window.sessionStorage,
        }
        this.IncrementHandleClick=this.IncrementHandleClick.bind(this)
        this.DecrementHandleClick=this.DecrementHandleClick.bind(this)
    }
    IncrementHandleClick(){
        this.setState(prevValue => ({
            QuantityClicker: prevValue.QuantityClicker + 1,
        }));
        this.props.handleQuantityChange(this.props.el.prices[this.props.CurrencyIndex].amount)
    }
    DecrementHandleClick(){
        this.setState(prevValue => ({
            QuantityClicker: prevValue.QuantityClicker - 1,
        }));
        this.props.handleQuantityChange(-this.props.el.prices[this.props.CurrencyIndex].amount)
    }

    render() {
        return (
                <div>
                    {this.state.QuantityClicker===0&&localStorage.removeItem(this.props.el.id)}
                    {this.state.QuantityClicker!==0?<div className='items-order'>
                        <div className='items'>
                            <hr className='line'/>
                            <h4 >{this.props.el.name}</h4>
                            <h4>{this.props.el.prices[this.props.CurrencyIndex].currency.symbol
                                +
                                (this.props.el.prices[this.props.CurrencyIndex].amount*this.state.QuantityClicker).toFixed(2)}
                            </h4>

                            <div>
                                {JSON.parse(window.sessionStorage
                                    .getItem(this.props.el.name))!==null&&<><h4>Attr :</h4>
                                    <div className='cart-sizes'><h1>{JSON.parse(this.state.SessionStorage
                                        .getItem(this.props.el.name))}</h1></div></>}
                                {JSON.parse(window.sessionStorage
                                    .getItem(this.props.el.id))!==null&&<><h4>Color : </h4>
                                    <div style={{backgroundColor:JSON.parse(this.state.SessionStorage
                                            .getItem(this.props.el.id))}} className='cart-colors'></div></>}

                            </div>
                        </div>
                        <div className='quant-wrap'>
                            <div className='quantity'>
                                <button onClick={()=>this.IncrementHandleClick()}>+</button>
                                <h4>{this.state.QuantityClicker}</h4>
                                {this.state.QuantityClicker>=1&&<button onClick={()=>this.DecrementHandleClick()}>-</button>}

                            </div>
                            <div className="img-wrap">
                                <img className='cart-img' src={this.props.el.gallery[0]} alt='image'/>
                            </div>
                        </div>
                    </div>:null}
                </div>
        );
    }
}
export default Product

