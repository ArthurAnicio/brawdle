import './styles.css';
import Button from '../Button';

function Paths() {
    return (
        <div id='paths'>
            <h1>
                Categorias
            </h1>
            <div id='routes'>
                <Button path='/algoz' label='Algoz'/>
                <Button path='/controle' label='Controle'/>
                <Button path='/destruidor' label='Destruidor'/>
                <Button path='/detonador' label='Detonador'/>
                <Button path='/suporte' label='Suporte'/>
                <Button path='/tanque' label='Tanque'/>
                <Button path='/tiro-preciso' label='Tiro Preciso'/>
            </div>
        </div>
    )
}

export default Paths;