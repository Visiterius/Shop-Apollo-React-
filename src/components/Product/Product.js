import React from "react";
import './Product.scss'

class Product extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            QuantityClicker:1,
            SizesButtons:['XS','S','M','L'],
            ColorsButton:['#D3D2D5','#2B2B2B','#0F6450']
        }
        this.IncrementHandleClick=this.IncrementHandleClick.bind(this)
        this.DecrementHandleClick=this.DecrementHandleClick.bind(this)
    }
    IncrementHandleClick(){
        this.setState(prevValue => ({
            QuantityClicker: prevValue.QuantityClicker + 1,
        }));
    }
    DecrementHandleClick(){
        this.setState(prevValue => ({
            QuantityClicker: prevValue.QuantityClicker - 1,
        }));
    }
    render() {
        return (
            <div className='items-order'>
                <div className='items'>
                    <hr className='line'/>
                    <h4 >{this.props.el.name}</h4>
                    <h4>{this.props.el.prices[this.props.CurrencyIndex].currency.symbol
                        +
                        this.props.el.prices[this.props.CurrencyIndex].amount}
                    </h4>
                    {this.props.el.category==='clothes'&&
                        <div>
                            <h4>Size :</h4>
                            <button className='cart-sizes'>{JSON.parse(window.sessionStorage.getItem(this.props.el.name))}</button>
                            <h4>Color : </h4>
                            <button style={{backgroundColor:JSON.parse(window.sessionStorage.getItem(this.props.el.id))}} className='cart-colors'></button>
                        </div>}
                        {/*{this.props.el.category==='clothes'&& <div><h4>Size :</h4>*/}
                    {/*    {this.state.SizesButtons.map(el=>(*/}
                    {/*        <button key={el} className='cart-sizes'>{el}</button>))}*/}
                    {/*    <h4>Color :</h4>*/}
                    {/*    {this.state.ColorsButton.map(el=>(*/}
                    {/*        <button key={el} style={{backgroundColor:el}} className='cart-colors'></button>))}</div>}*/}
                </div>
                <div className='quant-wrap'>
                    <div className='quantity'>
                        <button onClick={()=>this.IncrementHandleClick()}>+</button>
                        <h4>{this.state.QuantityClicker}</h4>
                        <button onClick={()=>this.DecrementHandleClick()}>-</button>
                    </div>
                    <img className='cart-img' src={this.props.el.gallery[0]} alt='image'/>
                </div>
            </div>
        );
    }
}
export default Product