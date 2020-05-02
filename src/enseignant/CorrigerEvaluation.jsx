import React, { Component } from 'react'
import { connect } from 'react-redux'

import './CorrigerExamen.css'

class CorrigerExamen extends Component {
    state={
        idPersonnel:1,
    }

    getTeacherSubjects=()=>{

    }

    getEvaluations=()=>{
        
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {

    }
}

export default connect(mapStateToProps)(CorrigerExamen)