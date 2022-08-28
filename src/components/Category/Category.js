import React from "react";
import Pages from "../Pages/Pages";
import './Category.scss'
import image from './images/a-logo.svg'
import cart from './images/e-cart.svg'

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update:false,
            AllClicked:false,
            CurrencyIndex:0,
            CurrencyClicked:false,
            ClothesClicked:false,
            TechClicked:false,
            ProductClicked:false,
            CartClicked:false,
            AnimationClicked:'$',
        }
        this.CurrHandleClick = this.CurrHandleClick.bind(this)
        this.TechHandleClick = this.TechHandleClick.bind(this)
        this.ClothesHandleClick = this.ClothesHandleClick.bind(this)
        this.ProductHandleClick = this.ProductHandleClick.bind(this)
        this.CartHandleClick = this.CartHandleClick.bind(this)
        this.AllHandleClick = this.AllHandleClick.bind(this)
        this.HandleUpdate = this.HandleUpdate.bind(this)
    }

    TechHandleClick(){
        this.setState({
            AllClicked:false,
            TechClicked:true,
            ClothesClicked:false,
            ProductClicked:false,
            CartClicked:false
        })
    }
    ClothesHandleClick(){
        this.setState({
            AllClicked:false,
            TechClicked:false,
            ClothesClicked:true,
            ProductClicked:false,
            CartClicked:false
        })
    }
    AllHandleClick(){
        this.setState({
            AllClicked:true,
            TechClicked:false,
            ClothesClicked:false,
            ProductClicked:false,
            CartClicked:false
        })
    }
    ProductHandleClick(){
        this.setState({
            AllClicked:false,
            ProductClicked:true,
            TechClicked:false,
            ClothesClicked:false,
            CartClicked:false
        })
    }
    CartHandleClick(){
        this.setState((prevState)=>{
           return {
                CartClicked:!prevState.CartClicked
            }
        })
    }
    CurrHandleClick(){
        this.setState((prevState)=>{
            return{
                CurrencyClicked:!prevState.CurrencyClicked
            }
        })
    }
    CurrencyIndexClick(index){
        this.setState({
            CurrencyIndex:index
        })
    }
    CurrAnimationClick(el){
        this.setState({
            AnimationClicked:el
        })
    }

    HandleUpdate(){
        this.setState(prev=>{
            return {
                update:!prev
            }
        })
    }

    render() {
        return (
            <div>
                <div className='header'>
                    <div className='header__btns'>
                        <button className='header__btns__tech' onClick={this.TechHandleClick}>TECH</button>
                        <button className='header__btns__clothes' onClick={this.ClothesHandleClick}>CLOTHES</button>
                        <button className='header__btns__tech' onClick={this.AllHandleClick}>All</button>
                    </div>

                    <img className='header__logo' src={image} alt='logo'/>

                    <div className='header__cart-currency'>
                        <div onClick={this.CurrHandleClick} className='currency'>
                            <h2 style={{cursor: 'pointer'}}>{this.state.AnimationClicked}</h2>
                        </div>
                        {this.state.CurrencyClicked
                            &&
                            <div className='currency-window'>
                                {this.props.data.categories[0].products[0].prices.map(el=>el.currency.symbol)
                                    .map((el,index)=>
                                    (<button key={index}
                                             onClick={()=>{this.CurrencyIndexClick(index);
                                                           this.CurrHandleClick();
                                                           this.CurrAnimationClick(el)}}
                                             id='curr-btns'>{el}
                                    </button>))
                                }
                            </div>
                        }
                        <div className='quantity-items'>
                            <div className='quantity-items__circle'>{localStorage.length}</div>
                            <img onClick={localStorage.length>0&&this.CartHandleClick} className='cart' src={cart} alt='cart'/>
                            {this.state.update&&this.render()}
                        </div>
                    </div>
                </div>
                {<Pages update={this.HandleUpdate}
                    switch={this.state}
                        data={this.props.data}
                        CurrencyIndex={this.state.CurrencyIndex}
                        handle={this.state.ProductClicked ? this.ClothesHandleClick : this.TechHandleClick}/>}
            </div>
        );
    }
}
export default Category