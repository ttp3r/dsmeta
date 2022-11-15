import logo from '../../assets/img/logo.svg'
import './styles.css'

function Header() {
    return (
        <header>
            <div className="dsmeta-logo-container">
                <img src= {logo} alt="Gráficos representativos" />
                    <h1>DSMeta</h1>
                    <p>Desenvolvido por 
                        <a href="https://www.instagram.com/talitape_r/"> @talipe_r</a>
                    </p>
            </div>
        </header>
    )
}

export default Header