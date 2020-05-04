import React, { Component } from 'react'

import './ClasseCoordo.css'

export default class ClasseCoordo extends Component {

    

    handleTimeFocus=()=>{
        document.getElementById('thatTime').type='time'
    }

    styleClasses =()=>{
        return this.props.classes.map(classe=>(
            <div className='coordoTimetableClasse' key={classe}>
                <span>{classe}</span>
                <div className="coordoClassBtns">
                    <input type='submit' value='Definir' className='classeOptions' id={classe.split(' ')[0]+'_'+classe.split(' ')[1]} onClick={this.props.handleDefinirClick}/>
                    <input type='submit' value='Modifier' className='classeOptions' id={classe.split(' ')[0]+'_'+classe.split(' ')[1]} onClick={this.props.handleModifierClick}/>
                </div>
            </div>
        ))
    }

    render() {
        return (
                this.styleClasses()
        )
    }
}
