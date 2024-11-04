import { useState } from 'react';
import './styles.css';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import brawlersData from '../../../public/brawlers.json';
import { Brawler } from '../../models/Brawler';

function Brawldle() {
    const [tentativa, setTentativa] = useState('');
    const [tentativas, setTentativas] = useState<Brawler[]>([]);
    const [sugestoes, setSugestoes] = useState<Brawler[]>([]);
    const [ganhou, setGanhou] = useState(false);

    const calcularBrawlerCerto = (): Brawler => {
        const data = brawlersData.brawlers;
    
        const hoje = new Date();
        const diaDoAno = Math.floor((hoje.getTime() - new Date(hoje.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    
        const indexBrawler = diaDoAno % data.length;
        return data[indexBrawler];
    };

    const brawlerCerto = calcularBrawlerCerto();

    function validar() {
        const brawlerEncontrado = brawlersData.brawlers.find((brawler: Brawler) => brawler.nome.toLowerCase() === tentativa.toLowerCase());
        
        if (brawlerEncontrado) {
            const jaTentado = tentativas.some(tentativa => tentativa.nome === brawlerEncontrado.nome);
            
            if (!jaTentado) {
                setTentativas((prevTentativas) => [brawlerEncontrado, ...prevTentativas]);
                setTentativa('');
                setSugestoes([]);
            }
        }

        if (brawlerEncontrado && brawlerEncontrado.nome === brawlerCerto.nome) {
            setGanhou(true);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;
        setTentativa(valor); 
        if (valor) {
            const sugestoesFiltradas = brawlersData.brawlers
                .filter(brawler => 
                    brawler.nome.toLowerCase().includes(valor.toLowerCase())
                )
                .filter(brawler => 
                    !tentativas.some(tentativa => tentativa.nome === brawler.nome)
                );
            setSugestoes(sugestoesFiltradas);
        } else {
            setSugestoes([]); 
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (sugestoes.length > 0) {
                setTentativa(sugestoes[0].nome);
                validar();
            } else {
                validar();
            }
        }
    }

    const selecionarSugestao = (nome: string) => {
        setTentativa(nome);
        setSugestoes([]);
    };

    const getCellClass = (tentadoValue: string | number | boolean | undefined, certoValue: string | number | boolean | undefined) => {
        if (tentadoValue === certoValue) return 'certo';
        return 'errado';
    };

    return (
        <div>
            <Header />
            <div id="content">
                <h1 id="titulo">
                    Adivinhe o Brawler
                    <span>Digite o nome de um brawler</span>
                </h1>
                <div id="tentativa">
                    <input 
                        type="text" 
                        disabled={ganhou} 
                        id='tentativaTxt' 
                        value={tentativa} 
                        onChange={handleInputChange} 
                        onKeyDown={handleKeyDown} 
                    />
                    <button onClick={validar}> 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
                    </button>
                </div>
                {sugestoes.length > 0 && (
                    <ul id='sugestoes'>
                        {sugestoes.map((brawler, index) => (
                            <li key={index} onClick={() => {selecionarSugestao(brawler.nome)}}>
                                <img src={brawler.imagem} alt="" />
                                {brawler.nome}
                            </li>
                        ))}
                    </ul>
                )}

                {ganhou && (
                    <div className="ganhou">
                        <h2>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M400 0L176 0c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8L24 64C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9L192 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-26.1 0C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24L446.4 64c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112l84.4 0c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6l84.4 0c-5.1 66.3-31.1 111.2-63 142.3z"/></svg>
                            <span>Você acertou!</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M400 0L176 0c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8L24 64C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9L192 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-26.1 0C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24L446.4 64c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112l84.4 0c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6l84.4 0c-5.1 66.3-31.1 111.2-63 142.3z"/></svg>
                        </h2>
                        <img src={brawlerCerto!.imagem} alt={brawlerCerto!.nome} />
                        <h3>{brawlerCerto!.nome}</h3>
                    </div>
                )}
                <div id="tabela-container">
                    <table id='tabela'>
                        <thead>
                            <tr>
                                <td>Imagem</td>
                                <td>Gênero</td>
                                <td>Espécie</td>
                                <td>Raridade</td>
                                <td>Classe</td>
                                <td>Trio</td>
                                <td>Lançamento</td>
                                <td>HiperCarga</td>
                            </tr>  
                        </thead>
                        <tbody>
                            {tentativas.map((brawler, index) => (
                                <tr key={index}>
                                    <td className='img'><img id='imagem-padrao' src={brawler.imagem} alt={brawler.nome} width="50" /></td>
                                    <td className={getCellClass(brawler.genero, brawlerCerto?.genero)}>{brawler.genero}</td>
                                    <td className={getCellClass(brawler.especie, brawlerCerto?.especie)}>{brawler.especie}</td>
                                    <td className={getCellClass(brawler.raridade, brawlerCerto?.raridade)}>{brawler.raridade}</td>
                                    <td className={getCellClass(brawler.classe, brawlerCerto?.classe)}>{brawler.classe}</td>
                                    <td className={getCellClass(brawler.trio, brawlerCerto?.trio)}>{brawler.trio}</td>
                                    <td className={getCellClass(brawler.lancamento, brawlerCerto?.lancamento)}>{brawler.lancamento}</td>
                                    <td className={getCellClass(brawler.hipercarga ? "Tem" : "Não tem", brawlerCerto?.hipercarga ? "Tem" : "Não tem")}>{brawler.hipercarga ? "Tem" : "Não tem"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Brawldle;
