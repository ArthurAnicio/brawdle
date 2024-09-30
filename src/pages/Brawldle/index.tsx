import { useState, useEffect } from 'react';
import './styles.css';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import brawlersData from '../../../public/brawlers.json';
import { Brawler } from '../../models/Brawler';

function Brawldle() {
    const [brawlers, setBrawlers] = useState<Brawler[]>([]);
    const [brawlerCerto, setBrawlerCerto] = useState<Brawler | null>(null);
    const [tentativa, setTentativa] = useState('');
    const [tentativas, setTentativas] = useState<Brawler[]>([]);
    const [sugestoes, setSugestoes] = useState<Brawler[]>([]); // Novo estado para as sugestões

    useEffect(() => {
        const data = brawlersData.brawlers;
        setBrawlers(data);

        const randomIndex = Math.floor(Math.random() * data.length);
        const randomBrawler: Brawler = data[randomIndex];
        setBrawlerCerto(randomBrawler);
    }, []);

    function validar() {
        const brawlerEncontrado = brawlers.find((brawler: Brawler) => brawler.nome.toLowerCase() === tentativa.toLowerCase());
    
        if (brawlerEncontrado) {
            setTentativas((prevTentativas) => [brawlerEncontrado, ...prevTentativas]);
            setTentativa('');
            setSugestoes([]); // Limpa sugestões após validação
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;
        setTentativa(valor);

        // Filtrar brawlers para sugestões
        if (valor) {
            const sugestoesFiltradas = brawlers.filter(brawler =>
                brawler.nome.toLowerCase().includes(valor.toLowerCase())
            );
            setSugestoes(sugestoesFiltradas);
        } else {
            setSugestoes([]); // Limpa sugestões se input estiver vazio
        }
    };

    const selecionarSugestao = (nome: string) => {
        setTentativa(nome);
        setSugestoes([]); // Limpa sugestões ao selecionar uma
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
                    <input type="text" id='tentativaTxt' value={tentativa} onChange={handleInputChange} />
                    <button onClick={validar}> 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
                    </button>
                </div>

                {/* Renderiza sugestões abaixo do input */}
                {sugestoes.length > 0 && (
                    <ul id='sugestoes'>
                        {sugestoes.map((brawler, index) => (
                            <li key={index} onClick={() => selecionarSugestao(brawler.nome)}>
                                <img src={brawler.imagem} alt="" />
                                {brawler.nome}
                            </li>
                        ))}
                    </ul>
                )}

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
                                <td><img id='imagem-padrao' src={brawler.imagem} alt={brawler.nome} width="50" /></td>
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
                
                <div id='teste'>
                    <h1>Brawler</h1>
                    <img src={brawlerCerto?.imagem} alt="" />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Brawldle;