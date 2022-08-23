import React from "react";
import './ProductPage.scss'

class ProductPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            SizePick:false,
            ColorPick:false,
            PreviewState:this.props.data.gallery[0],
            SizesButtons:['XS','S','M','L'],
            ColorsButton:['#D3D2D5','#2B2B2B','#0F6450']
        }
    }
    SetColorSession(el){
        window.sessionStorage.setItem(this.props.data.id,JSON.stringify(el))
        this.setState({ColorPick:true})
    }
    SetSizeSession(el){
        window.sessionStorage.setItem(this.props.data.name,JSON.stringify(el))
        this.setState({SizePick:true})
    }

    render() {
        return(
            <div>
                <div className='gallery'>
                    <div className='preview'>
                        <div className='hide-scroll'>
                        {this.props.data.gallery.map((el,index)=>(
                            <img key={index}
                                 onClick={()=>this.setState({PreviewState:el})}
                                 className='gall-el'
                                 src={el}
                                 alt='preview'/>))}
                        </div>
                    </div>
                        <img className='main-image' src={this.state.PreviewState} alt="main"/>
                        <div className="options">
                            <h1>{this.props.data.name}</h1>
                            <div className='options__description' dangerouslySetInnerHTML={{__html:this.props.data.description}}/>
                            <div className='wrap-size'>
                                {this.props.data.category==='clothes'&&
                                    <div>
                                        <h4>SIZE :</h4>
                                        {this.state.SizesButtons.map((el,index)=>(
                                            <button onClick={()=>this.SetSizeSession(el)} key={index}
                                                    className='options__sizes'>{el}</button>))}

                                        <h4>COLOR :</h4>
                                        {this.state.ColorsButton.map((el,index)=>(
                                        <button onClick={()=>this.SetColorSession(el)} key={index}
                                                style={{backgroundColor:el}} className='options__colors'/>))}
                                    </div>
                                }
                                <h4>PRICE :</h4>
                                <h3>{this.props.data.prices[this.props.CurrencyIndex].currency.symbol
                                    +
                                    this.props.data.prices[this.props.CurrencyIndex].amount}</h3>
                            </div>
                            {this.props.data.category==='clothes'?this.state.ColorPick&&this.state.SizePick&&<button
                                onClick={()=>window.localStorage.setItem(this.props.data.id,JSON
                                .stringify(this.props.data))} className='add-to-cart'>
                                ADD TO CART
                            </button>:<button
                                onClick={()=>window.localStorage.setItem(this.props.data.id,JSON
                                    .stringify(this.props.data))} className='add-to-cart'>
                                ADD TO CART
                            </button>}
                        </div>
                </div>
            </div>

        )
    }
}
export default ProductPage
