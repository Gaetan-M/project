import React, { Component } from 'react'
import { connect } from 'react-redux'

class StudentNotes extends Component {
    state={
        idEtudiant:1,
    }

    getStudentNotes=()=>this.props.notes.filter(note=>note.idEtudiant===this.state.idEtudiant)

    displayNotes=()=>{
        let studentNotes = this.getStudentNotes()
        let index=0
        return studentNotes.map(note=>(
            <div className="aStudentNote" key={note.idNote}>
                <span>{++index}</span>
                <span>{this.props.cours.find(cour=>cour.idCour===note.idCour).nomCours}</span>
                <span>{this.props.cours.find(cour=>cour.idCour===note.idCour).nomEnseignant.split(' ')[0]+' '+this.props.cours.find(cour=>cour.idCour===note.idCour).nomEnseignant.split(' ')[1]}</span>
                <span>{(note.notes.CC.published)?(note.notes.CC.note):('N/A')}</span>
                <span>{(note.notes.Examen.published)?(note.notes.Examen.note):('N/A')}</span>
            </div>
        ))
    }

    displayNotesHeader=()=>(
        <div className='displayStudentNotesHeader'>
            <span>No</span>
            <span>Matieres</span>
            <span>Enseignant</span>
            <span>CC</span>
            <span>Examen</span>
        </div>
    )

    render() {
        return (
            <div>
                {this.displayNotesHeader()}
                {this.displayNotes()}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        notes: state.Note.notes,
        cours: state.Cour.cours,
    }
}

export default connect(mapStateToProps)(StudentNotes)