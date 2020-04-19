import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Questionnaire.css';

class Questionnaire extends Component {
    state={
        idConnectedPersonnel:1,

        concernedSubject:'',
        concernedTypeEvaluation:'',
        newEvaluation:false,
        idEditableEvaluation:'',
        new:true,


        newEvaluation:{idEvaluation:'', idPersonnel:'', idCour:'', duree:'', idTypeEvaluation:'', questions:[]},
        editableEvaluation:{idEvaluation:'', idPersonnel:'', idCour:'', duree:'', idTypeEvaluation:'', questions:[]},
    }

    handleOpenClick=(e)=>{
        let idEditableEvaluation = Number(e.target.id.split('_')[0])
        let getEditableEvaluation = this.props.evaluations.find(evaluation=>evaluation.idEvaluation===idEditableEvaluation)

        this.setState({editableEvaluation:getEditableEvaluation})
        this.setState({idEditableEvaluation:Number(e.target.id.split('_')[0])})
    }

    manageInterfaceDisplay=()=>{
        this.state.editableEvaluation.idEditableEvaluation!==''?(
            <div className="hello">
            </div>
        ):(
            <div className="showNewEvaluation">
                <input type='button' value='Nouvelle evaluation' onClick={this.handleNewEvaluationClick} />
            </div>
        )
    }

    handleSelectChange=(e)=>{
        this.setState({[e.target.id]:e.target.value})
    }

    getToughtSubjects=()=>{
        let cours = this.props.cours.filter(cour=>cour.idEnseignant===this.state.idConnectedPersonnel).sort((a,b)=>a.nomCours>b.nomCours?1:-1)
        cours = cours.map(cour=><option key={cour.codeCours} value={cour.idCour+'_'+cour.nomCours}>{cour.nomCours}</option>)

        return (
            <select id='concernedSubject' onChange={this.handleSelectChange}>
                <option hidden value=''>Choisir une matiere</option>
                {cours}
            </select>
        )
    }

    getTypeEvaluations=()=>{
        let typeEvaluations = this.props.typeEvaluations.sort((a,b)=>a.nomTypeEvaluation>b.nomTypeEvaluation?1:-1).map(typeEvaluation=>(
        <option key={typeEvaluation.idTypeEvaluation} value={typeEvaluation.idTypeEvaluation+'_'+typeEvaluation.nomTypeEvaluation}>{typeEvaluation.nomTypeEvaluation}</option>
        ))

        return (
            <select id='concernedTypeEvaluation' onChange={this.handleSelectChange}>
                <option hidden value=''>Type Evaluation</option>
                {typeEvaluations}
            </select>
        )
    }

    showConcernedClasses=()=>{
        return this.props.cours.find(cour=>cour.idCour===Number(this.state.concernedSubject.split('_')[0])).classe.map(nomClasse=><span key={nomClasse}>{nomClasse}</span>)
    }

    getSubjectEvaluation=()=>this.props.evaluations.filter(evaluation=>evaluation.idCour===Number(this.state.concernedSubject.split('_')[0]))

    showEvaluationList=()=>{
        let evaluationList=this.getSubjectEvaluation().sort((a,b)=>a.idTypeEvaluation>b.idTypeEvaluation?1:-1)
        return evaluationList.map(evaluation=>{
            let subject = this.props.cours.find(cour=>cour.idCour===evaluation.idCour)
            let subjectClassList=subject.classe.map(aclass=><span key={aclass}>{aclass}</span>)

            return <div className='evaluationListElement' key={evaluation.idEvaluation}>
                <span>{subject.nomCours}</span>
                <span>{subjectClassList}</span>
                <span>{this.props.typeEvaluations.find(typeEvaluation=>typeEvaluation.idTypeEvaluation===evaluation.idTypeEvaluation).nomTypeEvaluation}</span>
                <input type='button' value='Open' id={evaluation.idEvaluation+'_Open'}/>
                <input type='button' value='Delete' />
                <input type='button' value='Publier' />
            </div>
        })
    }

    handleToggleDate=()=>{
        let element = document.getElementById('deadLine')
        if(element.type==='text'){
            element.type='date'
        }else element.type='text'
    }

    handleNewEvaluationClick=()=>{
        this.setState({newEvaluation:true})
    }

    render() {
        return (
            <div>
                {this.getToughtSubjects()}
                {this.state.concernedSubject!==''?
                <div className="chosenSubject">
                    <span>{this.showConcernedClasses()}</span>
                    {this.showEvaluationList()}
                </div>:null}
                {this.state.newEvaluation?
                <div className="newEvaluation">
                    {this.getTypeEvaluations()}
                    {this.state.concernedTypeEvaluation.split('_')[1]!=='Devoir'?
                    <input type='number' id='duree' onChange={this.handleSelectChange} placeholder='Duree(Minutes)' />:(
                    <input type='text' placeholder='Date limite' onFocus={this.handleToggleDate} onBlur={this.handleToggleDate} onChange={this.handleSelectChange} id='deadLine' />
                    )}
                </div>:null}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        typeEvaluations: state.TypeEvaluation.typeEvaluations,
        classes: state.Classe.classes,
        teachers: state.Teacher.teachers,
        evaluations: state.Evaluation.evaluations,
        cours: state.Cour.cours
    }
}

export default connect(mapStateToProps)(Questionnaire)