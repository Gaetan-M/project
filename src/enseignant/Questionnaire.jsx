import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Questionnaire.css';

class Questionnaire extends Component {
    state={
        idConnectedPersonnel:1,

        concernedSubject:'',
        concernedTypeEvaluation:'',
        newEvaluation:false,
        optionInput:'hello',
        mark:2,
        new:true,


        editableEvaluation:{idEvaluation:'', idPersonnel:'', idCour:'', duree:'', idTypeEvaluation:'', questions:[], published:false},
    }

    newEvaluation={idEvaluation:'', idPersonnel:'', idCour:'', duree:'', idTypeEvaluation:'', questions:[], published:false}

    handleCreerEvaluation=()=>{
        let newEvaluation = {...this.state.editableEvaluation, idCour:this.concernedSubject, idTypeEvaluation:1}
        this.setState({editableEvaluation:newEvaluation})
    }

    handleSaveEvaluation=()=>{
        let evaluationToCreate={...this.state.editableEvaluation, idEvaluation:this.props.evaluations.length+1}
        /*
            In the evaluation collection, the new document to create is: evaluationToCreate

            create this evaluation and fetch evaluation collection back into the redux state.
        */
        this.setState({editableEvaluation:this.newEvaluation},()=>alert('Created a new evaluation'))
    }

    handleEvaluationTypeChange=(e)=>{
        let newEvaluation = {...this.state.editableEvaluation, idTypeEvaluation:e.target.value}
        this.setState({editableEvaluation:newEvaluation})
    }

    createNewEvaluation=()=>{
        if(this.state.concernedSubject!==''){
            return this.state.editableEvaluation.idCour===''?<input type='button' value='Nouvelle Evaluation' onClick={this.handleCreerEvaluation} />
            :(this.state.editableEvaluation.idCour!=='' && this.state.editableEvaluation.idEvaluation==='')?(
                <div className='newEvaluationHeader'>
                    <input type='button' onClick={this.handleSaveEvaluation} value='Save evaluation' id={'saveEvaluation'} />
                    <select onChange={this.handleEvaluationTypeChange}>
                        {<option hidden value=''>{this.props.typeEvaluations.find(type=>type.idTypeEvaluation===1).nomTypeEvaluation}</option>}
                        {this.props.typeEvaluations.map(evaluationType=><option key={evaluationType.idTypeEvaluation} value={evaluationType.idTypeEvaluation}>{evaluationType.nomTypeEvaluation}</option>)}
                    </select>
                </div>
            ):<input type='button' onClick={this.handleSaveClick} value='Save' id={'save'} />
        }
    }

    handleOpenClick=(e)=>{
        let idEditableEvaluation = Number(e.target.id.split('_')[0])
        let getEditableEvaluation = this.props.evaluations.find(evaluation=>evaluation.idEvaluation===idEditableEvaluation)

        this.setState({editableEvaluation:getEditableEvaluation})
    }

    handleCancelClick=()=>{
        this.setState({editableEvaluation:this.newEvaluation})
    }

    handleDeleteClick=(e)=>{
        let idDeleteObject = Number(e.target.id.split('_')[0])
        /*
            In the evaluation collection, delete the object with idEvaluation : idDeleteObject
        */
       alert('Object with id: '+idDeleteObject+' has been deleted.')
    }
    
    handleSaveClick=()=>{
        /*
            In the evaluation collection, the object to update(save) has idEvaluation: this.state.editableEvaluation.idEvaluation
            and it is to be updated with the object: this.state.editableEvaluation
        */
       this.setState({editableEvaluation:this.newEvaluation})
    }

    handlePublierClick=(e)=>{
        let idToBePublishedObject = Number(e.target.id.split('_')[0])
        let toBePublishedObject= this.props.evaluations.find(evaluation=>evaluation.idEvaluation===idToBePublishedObject)
        toBePublishedObject ={...toBePublishedObject, published:true}
        /*
        In the evaluation collection, the item to be puslished has id: idToBePublishedObject
        
        publishing an evaluation is based on the typeEvaluation. if it is a devoir, then it will be published in the devoir collection else it will be published in the epreuve collection.
        
        the publishing will be done in a transaction. i.e. writing to the evaluation and epreuve/devoir collection should either all succeed or all fail.
        */
       let typeEvaluation = this.props.typeEvaluations.find(typeEvaluation=>typeEvaluation.idTypeEvaluation===toBePublishedObject.idTypeEvaluation)
       if(typeEvaluation.nomTypeEvaluation==='devoir'){
           /*
           update the evaluation collection
           then create a new document in the devoir collection.
           
           these in a transaction
           */
        }else{
            /*
            update the evaluation collection
            then create a new document in the epreuve collection.
            
            these in a transaction.
            */
        }
        console.log(this.state.editableEvaluation)
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

    showConcernedClasses=()=>this.props.cours.find(cour=>cour.idCour===Number(this.state.concernedSubject.split('_')[0])).classe.map(nomClasse=><span key={nomClasse}>{nomClasse}</span>)

    getSubjectEvaluation=()=>this.props.evaluations.filter(evaluation=>evaluation.idCour===Number(this.state.concernedSubject.split('_')[0]))

    showEvaluationList=()=>{
        let evaluationList=this.getSubjectEvaluation().sort((a,b)=>a.idTypeEvaluation>b.idTypeEvaluation?1:-1)
        return evaluationList.map(evaluation=>{
            let subject = this.props.cours.find(cour=>cour.idCour===evaluation.idCour)

            return <div className='evaluationListElement' key={evaluation.idEvaluation}>
                <span>{subject.nomCours}</span>
                <span>{this.showConcernedClasses()}</span>
                <span>{this.props.typeEvaluations.find(typeEvaluation=>typeEvaluation.idTypeEvaluation===evaluation.idTypeEvaluation).nomTypeEvaluation}</span>
                {this.state.editableEvaluation.idEvaluation===evaluation.idEvaluation?(
                    <span className="actionBtns">
                        <input type='button' onClick={this.handleSaveClick} value='Save' id={evaluation.idEvaluation+'save'} />
                        <input type='button' onClick={this.handleCancelClick} value='Cancel' id={evaluation.idEvaluation+'cancel'} />
                    </span>
                ):(
                    <span className="actionBtns">
                        <input onClick={this.handleOpenClick} type='button' value='Open' id={evaluation.idEvaluation+'_open'}/>
                        <input onClick={this.handleDeleteClick} type='button' value='Delete' id={evaluation.idEvaluation+'_delete'} />
                        {evaluation.published?<input type='button' value='published' disabled />:<input onClick={this.handlePublierClick} type='button' value='Publier' id={evaluation.idEvaluation+'_publier'} />}
                    </span>
                )}
            </div>
        })
    }

    handleToggleDate=()=>{
        let element = document.getElementById('deadLine')
        if(element.type==='text'){
            element.type='date'
        }else element.type='text'
    }

    
    removeOption=(option, questionIndex)=>{
        console.log(questionIndex)
        let newOptions = this.state.editableEvaluation.questions[questionIndex-1].options.filter(anOption=>anOption!==option)
        let newQuestion = {...this.state.editableEvaluation.questions[questionIndex-1], options:newOptions}
        let newQuestions = [...this.state.editableEvaluation.questions]
        newQuestions[questionIndex-1]=newQuestion
        let newEvaluation = {...this.state.editableEvaluation, questions:newQuestions}
        // console.log(newEvaluation)
        this.setState({editableEvaluation:newEvaluation})
    }

    addOption=(e)=>{
        let questionIndex = Number(e.target.id.split('_')[0])
        let optionIndex = Number(this.state.optionInput.split('_')[0])
        if(this.state.optionInput!=='' && (optionIndex===questionIndex)){
            let newOptions = this.state.editableEvaluation.questions[questionIndex-1].options
            newOptions.push(this.state.optionInput.split('_')[1])
            let newQuestion = {...this.state.editableEvaluation.questions[questionIndex-1], options:newOptions}
            let newQuestions = [...this.state.editableEvaluation.questions]
            newQuestions[questionIndex-1]=newQuestion
            let newEvaluation = {...this.state.editableEvaluation, questions:newQuestions}
            // console.log(newEvaluation)
            this.setState({editableEvaluation:newEvaluation, optionInput:''})
            document.getElementById(e.target.id.split('_')[0]+'_optionInput').value=''
        }else alert('Enter a valid option. the option is empty')
    }

    showOptions = (options, questionIndex) =>{
        return options.map(option => (
            <div className="tagged" key={option}>
                {option}<i className='fa fa-close' onClick={()=>this.removeOption(option, questionIndex)} />
            </div>
        ))
    }

    handleMarkChange=(e)=>{
        let questionIndex = Number(e.target.id.split('_')[0])
        let newMark = Number(e.target.value)
        let newQuestion = {...this.state.editableEvaluation.questions[questionIndex-1], mark:newMark}
        let newQuestions = [...this.state.editableEvaluation.questions]
        newQuestions[questionIndex-1]=newQuestion
        let newEvaluation = {...this.state.editableEvaluation, questions:newQuestions}
        // console.log(newEvaluation)
        this.setState({editableEvaluation:newEvaluation})
    }

    handleOptionInputChange=(e)=>{
        this.setState({[e.target.id.split('_')[1]]:e.target.id.split('_')[0]+'_'+e.target.value})
    }

    handleTextareaChange=(e)=>{
        let questionIndex = Number(e.target.id.split('_')[0])
        let textarea=e.target.id.split('_')[1]

        let newQuestion = {...this.state.editableEvaluation.questions[questionIndex-1], [textarea]:e.target.value}
        let newQuestions = [...this.state.editableEvaluation.questions]
        newQuestions[questionIndex-1]=newQuestion
        let newEvaluation = {...this.state.editableEvaluation, questions:newQuestions}
        this.setState({editableEvaluation:newEvaluation})
    }

    handleDisplayQuestions=()=>{
        if(this.state.editableEvaluation.idCour!==''){
            let index=0
            let theQuestions = this.state.editableEvaluation.questions.map(question=>{
                let questionType=this.props.typeQuestions.find(typeQuestion=>typeQuestion.idTypeQuestion===Number(question.idTypeQuestion)).nomTypeQuestion
                return <div className="question" key={++index}>
                    <div className='questionHeader'>
                        <span>Question {' '+index}</span>
                        <select id={index+'_idTypeQuestion'} onChange={this.handleTextareaChange}>
                            <option hidden>{questionType}</option>
                            {this.props.typeQuestions.map(questionType=>(<option key={questionType.idTypeQuestion} value={questionType.idTypeQuestion}>{questionType.nomTypeQuestion}</option>))}
                        </select>
                    </div>
                    <textarea className='indications' placeholder='Indications' id={index+'_indications'} onChange={this.handleTextareaChange} value={question.indications} />
                    <textarea className='theQuestion' placeholder='Entrer la question' id={index+'_question'} onChange={this.handleTextareaChange} value={question.question} />
                    {/* Upload and image and display the image on a 100 x 100 format here */}
                    <textarea className='answer' id={index+'_answer'} onChange={this.handleTextareaChange}placeholder='Entrer la repose a cette question' value={question.answer} />
                    {
                        questionType==='QCM'?(
                            <div className='taggedInput'>
                                {this.showOptions(question.options, index)}
                                <input className="option" id={index+'_optionInput'} required onChange={this.handleOptionInputChange} placeholder="Entrez l'option" type='text' /><br />
                                <input type='button' id={index+'_validerBtn'} onClick={(e) => this.addOption(e)} className='newOption' value='Valider' />
                            </div>
                        ):null
                    }
                    <input type='number' id={index+'_markInput'} value={question.mark} placeholder='/pts' min={0} max={20} onChange={(e) => this.handleMarkChange(e)} />
                </div>
            })

            return (
                <div>
                    {theQuestions}
                    {this.addNewQuestion()}
                </div>

            )
        }
    }

    handleAddNewQuestion=()=>{
        let questionObject = {index:'', idTypeQuestion:1, indications:'', question:'', options:[], answer:'', refFiles:[], mark:0}
        let newQuestions = this.state.editableEvaluation.questions
        newQuestions.push(questionObject)
        let newEvaluation = {...this.state.editableEvaluation, questions:newQuestions}
        this.setState({editableEvaluation:newEvaluation})

    }

    addNewQuestion=()=><i className='fa fa-plus-circle' onClick={this.handleAddNewQuestion} />

    render() {
        return (
            //As good as we can add questions to a questionnaire, it will be very good if we could also delete a question.
            //As of now, there is no mechanism put in place to delete a question from a questionnaire.
            //You'll need to work that out
            //PS: Boston always finds a way out ;)

            //You haven't handled the duree of an evaluation or the date limit of a devoir. you'll have to add that.
            <div>
                {this.getToughtSubjects()}
                {this.state.concernedSubject!==''?
                <div className="chosenSubject">
                    <span>{this.showConcernedClasses()}</span>
                    {this.showEvaluationList()}
                </div>:null}
                {this.createNewEvaluation()}
                {this.handleDisplayQuestions()}
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
        cours: state.Cour.cours,
        typeQuestions: state.TypeQuestion.typeQuestions
    }
}

export default connect(mapStateToProps)(Questionnaire)