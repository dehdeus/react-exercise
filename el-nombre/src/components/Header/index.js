import React, { useState } from 'react'
import logo from '../../logo.svg';
import './style.css'

const Header = () => {
    const [tema, setTema] = useState('dark')

    const toggleTema = () => {
        /* if(tema ==='dark') {
            novoTema = 'light'
        } else if (tema === 'light') {
            novoTema = 'dark'
        } */
        let novoTema = tema === 'dark' ? 'light' : 'dark'
        setTema(novoTema)
    }

    return (
        <header className={`App-link App-header--${tema}`}>
            <img 
                src={logo}
                className="App-logo"
                alt="logo"
                onClick={() => toggleTema()}
            />   
        <h1>{tema}</h1>
        <a
            className={`App-link--${tema}`}
            href="https://github.com/dehdeus/react-exercise"
            target="_blank"
            rel="noopener noreferrer"
        >
            Acessar Repositório
        </a>
        </header>
    )
}

export default Header