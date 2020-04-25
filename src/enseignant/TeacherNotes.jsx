import React, { Component } from 'react'

import './TeacherNotes.css'
import { connect } from 'react-redux'

class TeacherNotes extends Component {
    state={
        idPersonnel:1,
        personnelCours:[],
        idCour:'',
        idClasse:'',
        typeEvaluation:'',
        noteAction:'',
        editableNote:{idNote:'', idEtudiant:'', idCour:'', notes:{
            CC:{note:'', published:false},
            Examen:{note:'', published:false},
            Projet:{note:'', published:false},
            TD:{td:'', note:false},
            Rattrapage:{note:'', published:false}
        }},
    }
    componentDidMount(){
        this.setState({personnelCours:this.getPersonnelSubjects()})
    }

    getPersonnelSubjects=()=>this.props.cours.filter(cour=>cour.idEnseignant===this.state.idPersonnel)

    handleSelectChange=(e)=>{
        this.setState({[e.target.id]:e.target.value})
    }

    personnelSubjectSelect=()=>{
        return <select id='idCour' onChange={this.handleSelectChange}>
            <option hidden value=''>choisissez une matiere</option>
            {this.getPersonnelSubjects().map(subject=><option key={subject.idCour} value={subject.idCour}>{subject.nomCours}</option>)}
        </select>
    }

    subjectClassesSelect=()=>{
        if(this.state.idCour!==''){
            let classes = this.props.cours.find(cour=>cour.idCour===Number(this.state.idCour)).classe
            classes = classes.map(classe=>this.props.classes.find(aclass=>aclass.filiere.nomFiliere+' '+aclass.niveau===classe))
            return <select id='idClasse' onChange={this.handleSelectChange}>
                <option hidden value=''>Choissisez une classe</option>
                {classes.map(classe=><option key={classe.idClasse} value={classe.idClasse}>{classe.filiere.nomFiliere+' '+classe.niveau}</option>)}
            </select>
        }else return null
    }

    typeEvaluationSelect=()=>{
        let types = this.props.typeEvaluations.map(typeEvaluation=>{
            if(typeEvaluation.nomTypeEvaluation !=='Devoir'){
                return <option key={typeEvaluation.idTypeEvaluation} value={typeEvaluation.nomTypeEvaluation}>{typeEvaluation.nomTypeEvaluation}</option>
            }else return null
        })

        return this.state.idClasse!==''?(
            <select id='typeEvaluation' onChange={this.handleSelectChange}>
                <option hidden value=''>Choissisez un evaluation</option>
                {types}
            </select>
        ):null
    }

    handleNoteBtnClick=(e)=>{
        this.setState({noteAction:e.target.id})
    }

    showActionBtns=()=>{
        return this.state.typeEvaluation!==''?(
            <div className='noteBtns'>
                <button id='enter' onClick={this.handleNoteBtnClick}>Entrer notes</button>
                <button id='view' onClick={this.handleNoteBtnClick}>Voir notes</button>
            </div>
        ):null
    }

    getStudentSubjectNotes=()=>{
        if(this.state.idClasse!==''){
            let students = this.props.etudiants.filter(etudiant=>etudiant.idClasse===Number(this.state.idClasse))
            console.log(this.props.notes)
            return students.map(student=>this.props.notes.find(note=>note.idEtudiant===student.idEtudiant && note.idCour===Number(this.state.idCour)))
        }else return null
    }

    handleNoteChange=(e)=>{
        console.log(e.target.value)
    }

    displayNotes=()=>{
        if(this.state.noteAction!==''){
            let index=0
            
            return this.state.noteAction==='view'?(
                <div className="displayTeacherNotes">
                    <div className="displayTeacherNotesHeader">
                        <span>No</span>
                        <span>Matricule</span>
                        <span>Nom et prenoms</span>
                        <span>CC</span>
                        <span>Examen</span>
                        <span>Rattrapage</span>
                    </div>
                    <div className="displayTeacherGivenNotes">
                        {
                            this.getStudentSubjectNotes().map(studentMark=><div key={studentMark.idEtudiant} className='studentNote'>
                                <span>{++index}</span>
                                <span>{this.props.etudiants.find(etudiant=>etudiant.idEtudiant===studentMark.idEtudiant).matricule}</span>
                                <span>{this.props.etudiants.find(etudiant=>etudiant.idEtudiant===studentMark.idEtudiant).nom+' '+this.props.etudiants.find(etudiant=>etudiant.idEtudiant===studentMark.idEtudiant).prenom}</span>
                                <span>{studentMark.notes.CC.note}</span>
                                <span>{studentMark.notes.Examen.note}</span>
                                <span>{studentMark.notes.Rattrapage.note}</span>
                            </div>)
                        }
                    </div>
                </div>
            ):(
                <div className="displayTeacherNotes">
                    <div className="displayTeacherNotesHeader">
                        <span>No</span>
                        <span>Matricule</span>
                        <span>Nom et prenoms</span>
                        <span>{this.state.typeEvaluation}</span>
                    </div>
                    <div className="displayTeacherGivenNotes">
                        {
                            this.getStudentSubjectNotes().map(studentMark=><div key={studentMark.idEtudiant} className='studentNote'>
                                <span>{++index}</span>
                                <span>{this.props.etudiants.find(etudiant=>etudiant.idEtudiant===studentMark.idEtudiant).matricule}</span>
                                <span>{this.props.etudiants.find(etudiant=>etudiant.idEtudiant===studentMark.idEtudiant).nom+' '+this.props.etudiants.find(etudiant=>etudiant.idEtudiant===studentMark.idEtudiant).prenom}</span>
                                <input type='number' placeholder='Entrer une note' onChange={this.handleNoteChange} id={studentMark.idEtudiant} value={studentMark.notes[this.state.typeEvaluation].note} />
                            </div>)
                        }
                    </div>
                </div>
            )

        }else return null
    }

    render() {
        return (
            //You have done everything asked by the interface. but the one thing this interface prevents the teacher from doing is publishing
            //his notes. if the teacher cannot publish his notes, then rest assured
            //neither the students nor the coordo will be able to see any notes. 
            //hence you have to work out the problem of teachers publishing their notes.
            //PS: Boston always finds a way out ;)
            <div>
                {this.personnelSubjectSelect()}
                {this.subjectClassesSelect()}
                {this.typeEvaluationSelect()}
                {this.showActionBtns()}
                {this.displayNotes()}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        classes: state.Classe.classes,
        cours: state.Cour.cours,
        etudiants: state.Etudiant.etudiants,
        personnels: state.Personnel.personnels,
        typeEvaluations: state.TypeEvaluation.typeEvaluations,
        notes: state.Note.notes
    }
}

export default connect(mapStateToProps)(TeacherNotes)