import malzemeler from "../../constants/malzemeler";
import React from 'react';
import classnames from "classnames";


const EklenecekMalzemeler = (props) => {
    // Kapsayici icin React fragment kullaniyoruz.
    const {secilenMalzemeler, malzemeCikar, malzemeEkle} = props;
    return (
        <>
         <h2>Eklenecek Malzemeler</h2>
                <ul>
                    {
                        malzemeler.map((malzeme) => {
                            // mazeleme seculi ise azalt butonu aktif, degilse disabled
                            const azaltButonunuGoster = secilenMalzemeler.find((secilenMalzeme) => secilenMalzeme.id === malzeme.id)
                            return <li key={malzeme.id}>
                                <span className="malzeme-ismi">{malzeme.name} Fiyat: {malzeme.price}</span>
                                <button onClick={() => {
                                    malzemeEkle(malzeme)
                                }} className="malzeme-ekle">Ekle</button>
                                <button onClick={() => {
                                    malzemeCikar(malzeme)
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
                <h2>Toplam: {secilenMalzemeler.reduce((accumulator, currentValue) => {
                    var suAnkiMalzeme = malzemeler.find(item => item.id === currentValue.id)
                    var currentPrice = suAnkiMalzeme.price * currentValue.count;
                    return accumulator + currentPrice
                }, 0)
                    
                }
                </h2>
        </>
    );
};

export default EklenecekMalzemeler;