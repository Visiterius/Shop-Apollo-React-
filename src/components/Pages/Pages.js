import React from "react";
import './Pages.scss'
import logo from "../Category/images/icon-cart.svg";
import ProductPage from "../ProductPage/ProductPage";
import CartWindow from "../CartWindow/CartWindow";

class Pages extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            ProductState:null,
        }
    }


    render() {
        return(
               <div>
                    <div className='product-list'>
                        {this.state.ProductState===null&&this.props.data.categories
                            [this.props.switch.ClothesClicked ? 1 : 2].products.map(el=>(
                                <div>
                                    <div onClick={()=>this.setState({ProductState:el})} key={el.id} className='product'>

                                        {el.inStock?
                                            <img className='tech-pic' src={el.gallery[0]} alt='photo'/>
                                            :
                                            <figure>
                                                <figcaption className='test56'>OUT OF STOCK</figcaption>
                                                <img className='tech-pic-out' src={el.gallery[0]} alt='photo'/>
                                            </figure>}



                                        <h2>{el.name}</h2>
                                        <h3>{el.prices[this.props.CurrencyIndex].currency.symbol
                                            +
                                            el.prices[this.props.CurrencyIndex].amount}</h3>
                                    </div>
                                    <div className='logo' onClick={()=>window.localStorage
                                        .setItem(el.id,JSON
                                            .stringify(el))}>
                                        <img src={logo} alt='logo'/>
                                    </div>
                                </div>
                            ))}
                    </div>
                   {this.state.ProductState!==null && <ProductPage CurrencyIndex={this.props.CurrencyIndex}
                                                                   switch={this.props.switch.CartClicked}
                                                                   data={this.state.ProductState}/>}
                   {this.props.handle ? this.state.ProductState=null:null}
                   {this.props.switch.CartClicked && <CartWindow CurrencyIndex={this.props.CurrencyIndex}
                                                                 data={this.props.data}/>}
                </div>
        )
        }
}
export default Pages
