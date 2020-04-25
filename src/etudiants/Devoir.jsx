import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Devoir.css'

class Devoir extends Component {
    state={
        idEtudiant:1,
        idEvaluation:'',
        newPropositions:[],
    }

    getAllIdCours=()=>{
        let theEtudiant = this.props.etudiants.find(etudiant=>etudiant.idEtudiant===this.state.idEtudiant)
        let theClasse =this.props.classes.find(classe=>classe.idClasse===theEtudiant.idClasse)
        theClasse=theClasse.filiere.nomFiliere +' '+ theClasse.niveau
        let cours = this.props.cours.filter(cour=>cour.classe.includes(theClasse))
        return cours.map(cour=>cour.idCour)
    }

    getAllDueDevoirs=()=>{
        let subjectIDs=this.getAllIdCours()
        let devoirs = subjectIDs.map(idSubject=>this.props.evaluations.filter(evaluation=>evaluation.idCour===idSubject && new Date(evaluation.deadLine)>new Date()))
        let theDevoirs = []
        devoirs.map(subjectDevoir=>subjectDevoir.map(devoir=>theDevoirs.push(devoir)))
        return theDevoirs
    }

    onEnvoyerClick=(e)=>{
        /*
            1. Get the copie with id: toSubmitCopie.idCopie
            2. change its propositions with this.state.newPropositions
            3. change its submitted to true.
            4. then update this copie in the backend

            5. if the copie doesn't exit, then create a new copie
            6. then add this copie to the backend.
        */
    }

    onContinuerClick=(e)=>{
        
         this.setState({idEvaluation:Number(e.target.id.split('_')[1])})
         let copie = this.props.copies.find(copie=>copie.idEvaluation===Number(e.target.id.split('_')[1]) && copie.idEtudiant===this.state.idEtudiant)
         this.setState({newPropositions:copie.propositions})
        /*
            1. get the copie with idEvaluation and idEtudiant equal to this.state.idEvaluation and this.state.idEtudiant
            2. get the propositions of this copie and put them in this.state.newPropositions
            3. get the evaluation with id this.state.idEvaluation
            4. display the questions and the corresponding propositions that exist.
        */
    }

    onDoClick=(e)=>{
        this.setState({idEvaluation:Number(e.target.id.split('_')[1])})
        /*
            1. get the evaluation with id this.state.idEvaluation
            2. display the questions
        */
    }

    handlePropositionChange=(e)=>{
        let questionProp = this.state.newPropositions.find(proposition=>proposition.index===Number(e.target.id.split('_')[1]))
        questionProp.proposition=e.target.value
        let tempProps =this.state.newPropositions.filter(proposition=>proposition.index!==Number(e.target.id.split('_')[1]))
        tempProps.push(questionProp)
        this.setState({newPropositions:tempProps})
    }

    displayQuestions=()=>{
        if(this.state.idEvaluation!==''){
            let evaluation = this.props.evaluations.find(evaluatn=>evaluatn.idEvaluation===this.state.idEvaluation)
            let index = 0
            let theQuestions = evaluation.questions.map(question=>{
                let optionIndex=0
                let questionType = this.props.typeQuestions.find(typeQuestion=>typeQuestion.idTypeQuestion===Number(question.idTypeQuestion)).nomTypeQuestion
                let questionProposition = this.state.newPropositions!==undefined?this.state.newPropositions.find(proposition=>proposition.index===++index):undefined
                questionProposition= questionProposition!==undefined?(questionProposition.proposition):''
                return(
                    <div className="askedQuestion" key={index}>
                        <span className='askedQuestionHeader'>Question {index}</span>
                        <span className='askedQuestionIndications'>{question.indications}</span>
                        <span className='askedQuestionIndications'>{question.question}</span>
                        {/* upload and image and display here on a 100 x 100 scale if there is a ref to this question */}
                        {questionType==='QCM'?(
                            <form  className="displayOptions">
                                {question.options.map(option=>(
                                    <label htmlFor={'option_'+index+'_'+optionIndex} key={optionIndex}>
                                        <input type='radio' onChange={this.handlePropositionChange} id={'option_'+index+'_'+optionIndex} key={optionIndex++} name={'question_'+index} value={option} checked={questionProposition===option} />
                                        {option}
                                    </label>
                                ))}
                            </form>
                        ):(
                            <textarea className='askedQuestionAnswer' id={index+'_proposition'} onChange={this.handlePropositionChange} placeholder='Entrez la reponse' value={questionProposition} />
                        )
                        }
                    </div>
                )
            })
            return theQuestions
        }else return null
    }

    handleCancelClick=(e)=>{
        this.setState({idEvaluation:'', newPropositions:[]})
    }

    onSaveClick=(e)=>{
        let findCopie = this.props.copies.find(copie=>copie.idEvaluation === this.state.idEvaluation && copie.idEtudiant===this.state.idEtudiant)

        if(findCopie!==undefined){
            findCopie.propositions=this.state.newPropositions
            findCopie.submitted=e.target.id==='sendCopie'
            /*
                being here means that the copie exist. so just update the copie's propositions

                1. change the copie with idCopie: findCopie.idCopie with findCopie
            */

            console.log(findCopie)
            alert('Changes have been saved to copie: '+findCopie.idCopie)
        }else{
            let toBeUploadedCopie = {idCopie:this.props.copies.length,
                idEvaluation:this.state.idEvaluation,
                idEtudiant:this.state.idEtudiant,
                dateRemis:new Date().toDateString(),
                propositions:this.state.newPropositions,
                submitted:e.target.id==='sendCopie'}
            /*
                being here means that the copie doesn't exist. so we need to create a new copie.
                
                1. the new copie to be created is toBeUploadedCopie
            */
           console.log(toBeUploadedCopie)

        }
        this.setState({newPropositions:[], idEvaluation:''})
    }


    styleAllDevoirs=()=>{
        let devoirs = this.getAllDueDevoirs()
        return devoirs.map(devoir=>{
            let nomCour= this.props.cours.find(cour=>cour.idCour===devoir.idCour).nomCours
            let dateLimite = new Date(devoir.deadLine).toDateString()
            let brouillon = this.props.copies.find(copie=>copie.idEvaluation===devoir.idEvaluation && copie.idEtudiant===this.state.idEtudiant)
            let display = brouillon!==undefined?(brouillon.submitted):null
            brouillon = brouillon!==undefined?('brouillon'):null

            return display?null:(
                <div className="styledDevoir" key={devoir.idEvaluation}>
                    <div className="styledDevoirHeader">
                        <span className='devoirTitreCours'>{nomCour}</span>
                        <span className='devoirBrouillon'>{brouillon}</span>
                    </div>
                    <span className='devoirDeadline'>Delai: {dateLimite}</span>
                    <div className="devoirActionBtns">
                        {this.state.idEvaluation===devoir.idEvaluation?<button className='devoirFaire' id='saveCopie' onClick={this.onSaveClick}>Save</button>:(
                            brouillon==='brouillon'?<button className='devoirFaire' id={'devoir_'+devoir.idEvaluation} onClick={this.onContinuerClick}>Continuer</button>:<button onClick={this.onDoClick} id={'devoir_'+devoir.idEvaluation} className='devoirFaire'>Faire</button>)}
                        {this.state.idEvaluation===devoir.idEvaluation?<button className='devoirEnvoyer' onClick={this.handleCancelClick}>Cancel</button>:<button className='devoirEnvoyer' id='sendCopie' onClick={this.onSaveClick}>Envoyer</button>}
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                {this.styleAllDevoirs()}
                {this.displayQuestions()}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        etudiants: state.Etudiant.etudiants,
        evaluations: state.Evaluation.evaluations,
        cours: state.Cour.cours,
        classes: state.Classe.classes,
        copies: state.Copie.copies,
        typeQuestions: state.TypeQuestion.typeQuestions
    }
}

export default connect(mapStateToProps)(Devoir)