import React, {Component} from 'react';
import malzemeler from "../../constants/malzemeler";
import "./styles.css";
import classnames from "classnames";
import {Hamburger} from "../../components";


class HamburgerApp extends Component {
    constructor(props){
        super(props);

        this.state = {
            secilenMalzemeler: []
        }
    }

    malzemeEkle = (malzeme) =>{
        // var mi yok mu kontrol ediyoruz
        const varMi = this.state.secilenMalzemeler.find((secilenMalzeme) => secilenMalzeme.id === malzeme.id);
        // var ise sayisini artircaz, yok ise arraye ekliyoruz
        console.log("var mi yok mu", varMi);
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

    malzemeCikar = (malzeme) => {
        /// olmadigi durumda azalta hic basilamayacagi icin bu satirda malzemenin secili olduguna eminim.
        const secilenMalzeme = this.state.secilenMalzemeler.find((secilen) => secilen.id === malzeme.id);
        const secilenMalzemeCount = secilenMalzeme.count;
        // sayi 1 ise secilenlerden tamamen cikartiyorum, 1 den buyuk ise bu sayiyi azaltiyorum
        if(secilenMalzemeCount > 1){
            this.setState({
                secilenMalzemeler: this.state.secilenMalzemeler.map((secilen) => {
                    if(secilen.id === malzeme.id){
                        return {...secilen, count: secilen.count - 1}
                    }
                    return secilen;
                })
            })
        }else{
            this.setState({
                secilenMalzemeler: this.state.secilenMalzemeler.filter((secilen) => {
                    return secilen.id !== malzeme.id
                })
            })
        }
    }

    render() {
        const {secilenMalzemeler} = this.state;
        return (
            <div>
                <Hamburger secilenMalzemeler={secilenMalzemeler}/>
                <h2>Eklenecek Malzemeler</h2>
                <ul>
                    {
                        malzemeler.map((malzeme) => {
                            // mazeleme seculi ise azalt butonu aktif, degilse disabled
                            const azaltButonunuGoster = secilenMalzemeler.find((secilenMalzeme) => secilenMalzeme.id === malzeme.id)
                            return <li key={malzeme.id}>
                                {malzeme.name}
                                <button onClick={() => {
                                    this.malzemeEkle(malzeme)
                                }} className="malzeme-ekle">Ekle</button>
                                <button onClick={() => {
                                    this.malzemeCikar(malzeme)
                                }}
                                className={classnames({
                                    "malzeme-cikar": true,
                                    "disabled": !azaltButonunuGoster,
                                    "enabled": azaltButonunuGoster
                                })}>Azalt</button>
                            </li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default HamburgerApp;