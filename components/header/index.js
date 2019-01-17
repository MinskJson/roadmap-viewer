import React from 'react'
import cn from 'classnames'

import Roadmap from "../../src/basic.roadmap-extended.json";

import MenuButton from './menuButton'

class Header extends React.Component {
    state = {
        isMenuOpen: false
    }

    componentDidMount(){
        document.body.addEventListener('click', this.clickEvent)
    }

    componentWillUnmount(){
        document.body.removeEventListener('click', this.clickEvent)
    }

    clickEvent = (event) => {
        if(!document.getElementById('top-menu').contains(event.target) && this.state.isMenuOpen) {
            this.toggleMenu()
        }
    }

    toggleMenu = () => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        })
    }

    render() {
        return (
            <>
                <style jsx="true">{`
                    header {
                        display: flex;
                        justify-content: space-between;
                        position: relative;
                    }
                    nav ul {
                        max-height: 0;
                        transition: max-height .4s easy-in-out;
                        overflow: hidden;
                        list-style: none;
                        position: absolute;
                    }
                    nav.opened ul {
                        max-height: 500px;
                    }
                    a{
                        color: #000;
                        text-decoration: none;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                `}</style>
                <header>
                    <span>{/*Logotype*/}</span>
                    <div>{/*Search*/}</div>
                    <nav id="top-menu" className={cn({
                        'opened': this.state.isMenuOpen
                    })}>
                        <MenuButton onClick={this.toggleMenu} isActive={this.state.isMenuOpen}/>
                        <ul>
                            {/* TODO: 
                                redesign:
                                open menu under header in full width with items in slider 
                            */}
                            {Roadmap.roadmap.map((item, index) => <li key={`menu-item-${index}`}>
                                <a href={`/#${item.name}`} title={`link to ${item.name}`}>{item.name}</a>
                            </li>)}
                        </ul>
                    </nav>
                </header>
            </>
        )
    }
} 

export default Header