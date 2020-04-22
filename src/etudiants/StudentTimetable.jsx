import React, { Component } from 'react'

import './StudentTimetable.css'

import { connect } from 'react-redux'

class StudentTimetable extends Component {
    state={
        idEtudiant:1
    }

    getStudentTimetable=()=>{
        let student = this.props.etudiants.find(etudiant=>etudiant.idEtudiant===this.state.idEtudiant)
        return this.props.timetables.find(timetable=>timetable.classe.idClasse === student.idClasse)
    }

    showTimetableHeader=()=>{
        let studentHeader=this.getStudentTimetable().tableHeader
        let weekStart=new Date(studentHeader.weekStart).toDateString()

        return (
            <div className='studentTimeTableHeader'>
                {weekStart} - {studentHeader.weekEnd}
            </div>
        )

    }

    showStudentTable=()=>{
        let studentTable = this.getStudentTimetable().table
        let days=['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun']
        return studentTable.map(line=>(
        <div className='LineHolder' key={line.index}>
            <div className="columnTime">
                <span className='hmm'>
                    <h3>Debut: </h3><span id='fromTime'>{line.debut}</span>
                </span>
                <span>
                    <h3>Fin: </h3><span id='toTime'>{line.fin}</span>
                </span>
            </div>
            {days.map(day=> <div className="columnDay" key={line.index+day}>
                    <span id='mon_cours' >{line[day].cour.split('_')[0]}</span>
                    <span id='mon_cours' >{line[day].cour.split('_')[2]}</span>
                    <span id='mon_cours' >{line[day].salle}</span>
                </div>
            )}
        </div>
        ))
    }

    render() {
        return (
            <div>
                {this.showTimetableHeader()}
                {this.showStudentTable()}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        timetables: state.Timetable.timetables,
        etudiants: state.Etudiant.etudiants,
        personnels: state.Personnel.personnels,
    }
}

export default connect(mapStateToProps)(StudentTimetable)