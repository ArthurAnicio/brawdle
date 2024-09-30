import React from 'react';
import './styles.css'

export interface Brawler{
    nome: string;
    imagem: string;
    raridade: string;
    classe: string;
    trio: string;
    lancamento: number;
    hipercarga: boolean;
}

interface BrawlerProps{
    brawler: Brawler;
}

const Card: React.FC<BrawlerProps> = ({ brawler }) => {
    var raridade=" "
    raridade = brawler.raridade
    
    return (
        <div className="brawler-card">
            <div className="linha" id={raridade}></div>
            <nav>
                <img src={brawler.imagem} alt={brawler.nome} />
                <section id='info'>
                    <h3>{brawler.nome}</h3>
                    <p id={`raridade-${raridade}`}>{brawler.raridade}</p>
                    <p>{brawler.classe}</p>
                </section>
            </nav>   
                
                
        </div>
    )
}

export default Card;

