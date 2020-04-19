import React, {Component} from 'react';
import malzemeler from "../../constants/malzemeler";

class HamburgerApp extends Component {
    constructor(props){
        super(props);

        this.state = {
            secilenMalzemeler: []
        }
    }

    malzemeEkle = (malzeme) =>{
        const varMi = this.state.secilenMalzemeler.find((secilenMalzeme) => secilenMalzeme.id === malzeme.id);
        if(varMi){
            this.setState({
                secilenMalzemeler: this.state.secilenMalzemeler.map((secilenMalzeme) => {
                    if(secilenMalzeme.id === malzeme.id){
                        return {...secilenMalzeme, count: secilenMalzeme.count + 1}
                    }else{
                        return secilenMalzeme;
                    }
                })
            })
        }else{
            this.setState({
                secilenMalzemeler: [...this.state.secilenMalzemeler, {...malzeme, count: 1}]
            })
        }
    }

    render() {
        const {secilenMalzemeler} = this.state;
        return (
            <div>
                <h2>Hamburgerdeki Malzemler</h2>
                <div>
                    <ul>
                        {
                            secilenMalzemeler.map((malzeme) => {
                                return <li key={malzeme.id}>{malzeme.name} Sayi: {malzeme.count}</li>
                            })
                        }
                    </ul>
                </div>

                <h2>Eklenecek Malzemeler</h2>
                <ul>
                    {
                        malzemeler.map((malzeme) => {
                            return <li key={malzeme.id}>
                                {malzeme.name}
                                <button onClick={() => {
                                    this.malzemeEkle(malzeme)
                                }}>Ekle</button>
                            </li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default HamburgerApp;