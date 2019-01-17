import React from 'react'
import cn from 'classnames'

const MenuButton = ({ isActive, onClick }) => (
    <>
        <style jsx="true">{`
            button {
                background: transparent;
                border: 0;
            }
            button .line{
                width: 50px;
                height: 5px;
                background-color: #ecf0f1;
                display: block;
                margin: 8px auto;
                -webkit-transition: all 0.3s ease-in-out;
                -o-transition: all 0.3s ease-in-out;
                transition: all 0.3s ease-in-out;
            }
            button.isActive  .line:nth-child(2){
                opacity: 0;
            }
            button.isActive  .line:nth-child(1){
                transform: translateY(13px) rotate(45deg);
            }
            
            button.isActive  .line:nth-child(3){
                transform: translateY(-13px) rotate(-45deg);
            }
        `}</style>
        <button type="button" onClick={onClick} className={cn({
            isActive: isActive
        })}>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
        </button>
    </>
)

export default MenuButton