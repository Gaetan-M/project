import React, { Component } from 'react'
import { connect } from 'react-redux'

class PublierNoteExamen extends Component {
    state={
        idPersonnel:6,

        idClasse:'',
    }

    getCoordoClasses=()=>this.props.coordonateurs.find(coordonateur=>coordonateur.idPersonnel===this.state.idPersonnel).classes

    getClassesObjects=()=>{
        let classes = this.getCoordoClasses()
        return classes.map(aclass=>this.props.classes.find(classe=>classe.filiere.nomFiliere+' '+classe.niveau===aclass))
    }

    handleSelectChange=(e)=>{
        this.setState({[e.target.id]:Number(e.target.value)})
    }

    displayClasseSelect=()=>{
        let classes = this.getClassesObjects()
        return (
            <select className='publierNoteChooseClasse' id='idClasse' onChange={this.handleSelectChange}>
                <option value='' hidden>Choisissez une classe</option>
                {classes.map(classe=><option key={classe.idClasse} value={classe.idClasse}>{classe.filiere.nomFiliere+' '+classe.niveau}</option>)}
            </select>
        )
    }
    
    handlePublierNotesCoordo=(e)=>{
        let module=this.props.modules.find(module=>module.idModule===Number(e.target.id.split('_')[1]))
        let moduleSubjects = module.matieres.map(matiere=>this.props.cours.find(cour=>cour.idCour===matiere.idCour))
        let notes = moduleSubjects.map(subject=>this.props.notes.filter(note=>note.idCour===subject.idCour))
        let noteArray = []
        notes.map(subjectNotes=>subjectNotes.map(note=>{
            let tempNote = note
            tempNote.notes.Examen.published=true

            //update the note with id: tempNote.idNote with tempNote
            noteArray.push(tempNote)
        }))
        console.log(noteArray)
        //for every subject in the module, get all the notes who's idCour's correspond to subject.idCour
        //change the published state of all these notes Examen and put it to true
        //update all these notes.
    }

    displayClassModules=()=>{
        if(this.state.idClasse!==''){
            let classModules = this.props.modules.filter(module=>module.idClasse === this.state.idClasse)

            //for every modules, get the courses.
            return classModules.map(module=>{
                let moduleSubjects = module.matieres.map(matiere=>this.props.cours.find(cour=>cour.idCour===matiere.idCour))
                let moduleState=[]

                let styledModuleSubjects = moduleSubjects.map(subject=>{

                    //for every course, find a note whose subject is this, then verify the published state of the examen mark
                    let subjectState = this.props.notes.find(note=>note.idCour===subject.idCour).notes.Examen.published
                    moduleState.push(subjectState)

                    //if the published !== false, then display (disponible) else display (non disponible)
                    return subjectState !==false?(
                        <div className="moduleSubjectState" key={subject.idCour}>
                            <span>{subject.nomCours}</span>
                            <span>Disponible</span>
                        </div>
                    ):(
                        <div className="moduleSubjectState" key={subject.idCour}>
                            <span>{subject.nomCours}</span>
                            <span>Non disponible</span>
                        </div>
                    )
                })

                return <div className="moduleState" key={module.idModule}>
                    <span className='ModuleStateName'>{module.nomModule}</span>
                    {styledModuleSubjects}
                    {/*
                        //if all subjects are inTransit, then the button should have value(Publier)
                        //else the button should be grey and disabled
                        //if the subjects have already been published, then no button
                    */}
                    {moduleState.includes(false)?(<button className='publierNoteExamBtn' disabled>Publier</button>)
                    :moduleState.includes('inTransit')?(<button className='publierNoteExamBtn' id={'module_'+module.idModule} onClick={this.handlePublierNotesCoordo} >Publier</button>):null}
                </div>
            })
        }else return null
    }


    render() {
        return (
            <div>
                {this.displayClasseSelect()}
                {this.displayClassModules()}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        modules: state.Module.modules,
        cours: state.Cour.cours,
        notes: state.Note.notes,
        classes: state.Classe.classes,
        coordonateurs: state.Coordonateur.coordonateurs,
        personnels: state.Personnel.personnels
    }
}

export default connect(mapStateToProps)(PublierNoteExamen)