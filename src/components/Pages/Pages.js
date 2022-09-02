import React from "react";
import './Pages.scss'
import IconCart from "../Category/images/icon-cart.svg";
import ProductPage from "../ProductPage/ProductPage";
import CartWindow from "../CartWindow/CartWindow";


class Pages extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            ProductState:null,
        }
    }
    refresh = () => {
        this.setState({});
    }
    render() {
        return(
               <div>
                    <div className='product-list'>
                        {this.state.ProductState===null&&this.props.data.categories
                            [this.props.switch.AllClicked?0:this.props.switch.ClothesClicked?1:2].products.map(el=>(
                                <div className='page-wrapper' key={el.id} >
                                    <div onClick={()=>this.setState({ProductState:el})} className='product'>

                                        {el.inStock?
                                            <img className='tech-pic' src={el.gallery[0]} alt='photo'/>
                                            :
                                            <div className='figure'>
                                                <img className='figure__img' src={el.gallery[0]} alt='photo'/>
                                                <div className='figure__text'>OUT OF STOCK</div>
                                            </div>}

                                        <h2>{el.name}</h2>
                                        <h3>{el.prices[this.props.CurrencyIndex].currency.symbol
                                            +
                                            el.prices[this.props.CurrencyIndex].amount}</h3>
                                    </div>
                                    {JSON.stringify(el.attributes) === '[]' && <img className='logo' onClick={() => {
                                        window.localStorage
                                            .setItem(el.id, JSON
                                                .stringify(el));
                                        this.props.update()
                                    }} src={IconCart} alt='logo'/>}
                                </div>
                            ))}
                    </div>
                   {this.state.ProductState!==null && <ProductPage update={this.props.update}
                                                                   CurrencyIndex={this.props.CurrencyIndex}
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
