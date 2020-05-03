import React, { Component } from 'react'
import { connect } from 'react-redux'

import './CorrigerEvaluation.css'

class CorrigerExamen extends Component {
    state={
        idPersonnel:1,

        idCour:'',
        evalType:'',
        idEvaluation:'',
        idClasse:'',
        idEtudiant:'',
        studentPropositions:[]
    }

    handleTypeEvalClick=(e)=>{
        this.setState({
            idCour:Number(e.target.id.split('_')[1]),
            evalType:Number(e.target.id.split('_')[2])
        })
    }

    displayTeacherSubjects=()=>{
        if(this.state.idCour==='' && this.state.evalType===''){
            let cours = this.props.cours.filter(cour=>cour.idEnseignant === this.state.idPersonnel)
            return cours.map(cour=>{
                //on clicking a type evaluation, it is supposed to send up the id of the subject, and the id of typeEvaluation
                return <div key={cour.idCour} className="corrigerSubject">
                    displayTeacherSubjects
                    <span>{cour.nomCours}</span>
                    <div className="corrigerTypeEvaluation">
                        {this.props.typeEvaluations.map(evalType=><span key={evalType.idTypeEvaluation} className='evalType' onClick={this.handleTypeEvalClick} id={'evalType_'+cour.idCour+'_'+evalType.idTypeEvaluation}>{evalType.nomTypeEvaluation}</span>)}
                    </div>
                </div>
            })
        }else return null
    }

    handleEvalClick=(e)=>{
        this.setState({idEvaluation:Number(e.target.id.split('_')[1])})
    }

    getConcernedSubjectEvaluation=()=>{
        if(this.state.idCour!=='' && this.state.evalType!=='' && this.state.idEvaluation===''){
            let subjectEvaluations = this.props.evaluations.filter(evaluation=>evaluation.idCour===this.state.idCour && evaluation.idTypeEvaluation===this.state.evalType)
            let theEvaluation=[]
            if(this.state.evalType===3){
                let devoirList = subjectEvaluations.sort((a,b)=>new Date(a.deadLine)>new Date(b.deadLine)?-1:1)
                
                theEvaluation = devoirList.map(devoir=>{
                    let cour = this.props.cours.find(cour=>cour.idCour===devoir.idCour)
                    let classes = cour.classe.map(classe=><span className='composClassCorriger'>{classe}</span>)
                    return <div className="chooseCorrigerDevoir" id={'eval_'+devoir.idEvaluation} onClick={this.handleEvalClick} >
                        <span className='nameEvalType'>Devoir De {cour.nomCours}</span>
                        <div className="corrigerEpreuveClasse">
                            <span className='corrigerClasses'>{'Classe(s): '}{classes}</span>
                        </div>
                        <span className='deadLineEval'>Date limite: {new Date(devoir.deadLine).toDateString()}</span>
                    </div>
                })
            }else{
                let nameEval=''
                switch(this.state.evalType){
                    case 1:
                        nameEval='CC'
                        break
                    case 2:
                        nameEval='Examen'
                        break
                    case 4:
                        nameEval='Rattrapage'
                        break
                    default:
                        break
                }
                let evalList = subjectEvaluations.sort((a,b)=>new Date(a.dateTime)>new Date(b.dateTime)?-1:1)
                theEvaluation = evalList.map(evaln=>{
                    let cour = this.props.cours.find(cour=>cour.idCour===evaln.idCour)
                    let classes = cour.classe.map(classe=><span key={classe} className='composClassCorriger'>{classe}</span>)
                    return <div key={evaln.idEvaluation} className="corrigerEvaluation" onClick={this.handleEvalClick} id={'eval_'+evaln.idEvaluation}>
                        <span className='nameEvalType'>{nameEval+' De '+cour.nomCours}</span>
                        <div className="corrigerEpreuveClasse">
                            <span className='corrigerClasses'>{'Classe(s): '}{classes}</span>
                        </div>
                        <span className='deadLineEval'>De: {new Date(evaln.dateTime).toDateString()}</span>
                    </div>
                })
            }

            return (
                <div className="theEvaluation">
                    getConcernedSubjectEvaluation
                    <i className='fa fa-arrow-left' onClick={this.goBackToChooseSubjectEvalType} />
                    {theEvaluation}
                </div>
            )
        }else return null
    }

    goBackToChooseSubjectEvalType=()=>{
        this.setState({idCour:'', evalType:''})
    }

    handleCorrigerbuttonClick=(e)=>{
        this.setState({idClasse:Number(e.target.id.split('_')[1])})
    }

    goBackToChooseEvaluation=()=>{
        this.setState({idEvaluation:''})
    }

    publishClassNotes=()=>{
        let students = this.props.etudiants.filter(etudiant=>etudiant.idClasse===this.state.idClasse)
        students.map(student=>{
            let studentNote = this.props.notes.find(note=>note.idEtudiant===student.idEtudiant && note.idCour===this.state.idCour)
            let evalTypeName = ''
            let testt =false
            if(studentNote===undefined){
                testt = true
                studentNote = {idNote:this.props.notes.length, idEtudiant: this.state.idEtudiant, idCour: this.state.idCour, notes:{
                    CC:{note:'', published:false},
                    Examen:{note:'', published: false},
                    Projet:{note:'', published:false},
                    TD:{note:'', publshed:false},
                    Rattrapage:{note:'', published:false}
                }}
            }
            switch(this.state.evalType){
                case 1:
                    evalTypeName='CC'
                    studentNote.notes[evalTypeName].published=true
                    break
                case 2:
                    evalTypeName='Examen'
                    studentNote.notes[evalTypeName].published='inTransit'
                    break
                case 4:
                    evalTypeName='Rattrapage'
                    studentNote.notes[evalTypeName].published='inTransit'
                    break
                default:
                    break
            }

            if(testt){
                studentNote.notes[evalTypeName].note=0
                //Create a note object
                //the note object is studentNote
            }else{
                //update the note object with idNote: studentNote.idNote
                //the new object is studentNote
            }
        })
    }

    styleClasse=(composeEffectif, copiesWithClasses)=>{
        if( this.state.idEvaluation!=='' && this.state.idClasse===''){
            let theClasses = composeEffectif.map(aClass=>{
                let theArr = []
                let theCopies = copiesWithClasses.filter(copie=>copie.idClasse===aClass.idClasse)
                theCopies.map(copie=>theArr.push(copie.doneMarking))

                let note = theCopies.length !== 0 ? this.props.notes.find(note=>note.idEtudiant===theCopies[0].idEtudiant && note.idCour===this.state.idCour):'empty'

                let evalTypeName = ''
                switch(this.state.evalType){
                    case 1:
                        evalTypeName='CC'
                        break
                    case 1:
                        evalTypeName='Examen'
                        break
                    case 1:
                        evalTypeName='Rattrapage'
                        break
                    default:
                        break
                }

                note = note!==undefined && note!=='empty'?(note.notes[evalTypeName].published!==false?'Published':false):(note==='empty'?"Pas d'etudiant":false)

                let theClasse = this.props.classes.find(classe=>classe.idClasse===aClass.idClasse)
                theClasse = theClasse.filiere.nomFiliere+' '+theClasse.niveau
                return (
                    <div key={aClass.idClasse} className="displayCorrigerClasse">
                        <span className='displayCorrigerClasseHeader'>
                            <span>Copies de la classe de: {theClasse}</span>
                            {theArr.includes(false)?null:(note)?<span className='showPublished'>{note}</span>:<button onClick={this.publishClassNotes}>Publier les notes</button>}
                        </span>
                        <span>Effectif de la classe: {aClass.effectif}</span>
                        <span>Nombre de copies recu: {aClass.composed}</span>
                        <button className='corrigerBtn' onClick={this.handleCorrigerbuttonClick} id={'corriger_'+aClass.idClasse}>{theArr.includes(false)?'Corriger':'Voir les epreuves'}</button>
                    </div>
                )
            })
            return (
                <div className="theClases">
                    styleClasse
                    <i className='fa fa-arrow-left' onClick={this.goBackToChooseEvaluation}/>
                    {theClasses}
                </div>
            )
        }else return null
    }

    handleCorrigerEtudiantClick=(e)=>{
        this.setState({idEtudiant:Number(e.target.id.split('_')[1])},()=>{
            let studentPaper = this.props.copies.find(copie=>copie.idEvaluation===this.state.idEvaluation && copie.idEtudiant===this.state.idEtudiant && copie.idTypeEvaluation===this.state.evalType)
            this.setState({studentPropositions:studentPaper.propositions})
        })
    }

    goBackToChooseClasse=()=>{
        this.setState({idClasse:'', idEtudiant:''})
    }

    displayClassCopies=(copiesWithClasses)=>{
        if(this.state.idEvaluation!=='' && this.state.idClasse!==''){
            let copies = copiesWithClasses.filter(copie=>copie.idClasse===this.state.idClasse).sort((a,b)=>a.doneMarking>b.doneMarking?-1:1)
            let index = 1
            let studentsCopies = copies.map(copie => {
                let studentName = this.props.etudiants.find(etudiant=>etudiant.idEtudiant===copie.idEtudiant)
                studentName=studentName.nom+' '+studentName.prenom
                return <div key={copie.idCopie} className='studentCopie'>
                    <span className = 'studentCopieIndex'>{index++}</span>
                    {this.state.evalType===2 || this.state.evalType===4?(<span className = 'studentCopieName'>{copie.idCopie}</span>):(<span className='studentCopieName'>{studentName}</span>)}
                    {copie.doneMarking?<button className='dejaCorrigeEpreuveBtn' disabled >Deja corrige</button>:
                    <button className='corrigerEpreuveBtn' id={'etudiant_'+copie.idEtudiant} onClick={this.handleCorrigerEtudiantClick}>Corriger cet epreuve</button>}
                </div>
            })

            return (
                <div className="theStudentsCopies">
                    display Class Copies
                    <i className='fa fa-arrow-left' onClick={this.goBackToChooseClasse}/>
                    {studentsCopies}
                </div>
            )
        }else return null
    }

    getEvaluationCopies=()=>{
        if(this.state.idEvaluation!==''){
            let evaluation = this.props.evaluations.find(evaluation=>evaluation.idEvaluation===this.state.idEvaluation)
            let copies = this.props.copies.filter(copie=>copie.idEvaluation===this.state.idEvaluation && copie.idTypeEvaluation===this.state.evalType)
            let cour = this.props.cours.find(cour=>cour.idCour===evaluation.idCour)
            let classes = cour.classe.map(classe=>this.props.classes.find(aClass=>aClass.filiere.nomFiliere+' '+aClass.niveau===classe).idClasse)
            let students = classes.map(idClasse=>{
                return this.props.etudiants.filter(etudiant=>etudiant.idClasse === idClasse)
            })

            let nbrOfStuds = 0
            let index=0
            let classEffectif = students.map(student=>{
                nbrOfStuds+=student.length
                let tempEffectif = {idClasse:classes[index], effectif:student.length}
                index+=1
                return tempEffectif
            })
            
            let copiesWithClasses = copies.map(copie=>{
                let studentClass = this.props.etudiants.find(etudiant=>etudiant.idEtudiant===copie.idEtudiant).idClasse
                let tempCopie = {...copie, idClasse:studentClass}
                return tempCopie
            })
            
            let composeEffectif = classEffectif.map(aClasse=>{
                let numberComposedPerClass = copiesWithClasses.filter(copie=>copie.idClasse===aClasse.idClasse)
                let tempObject = {...aClasse, composed:numberComposedPerClass.length}
                return tempObject
            })

            return(
                <div className="theEvaluationCopies">
                    {this.styleClasse(composeEffectif, copiesWithClasses)}
                    {this.displayClassCopies(copiesWithClasses)}
                </div>
            )
        }else return null
    }

    handleInputQuestionMark=(e)=>{
        let tempProps = this.state.studentPropositions.find(aProp=>aProp.index===Number(e.target.id.split('_')[1]))
        let questionPaper = this.props.evaluations.find(evaln=>evaln.idEvaluation===this.state.idEvaluation).questions
        let theQuestion = questionPaper.find(question=>question.index===Number(e.target.id.split('_')[1]))
        tempProps.score = Number(e.target.value)>theQuestion.mark?tempProps.score:Number(e.target.value)
        let temp =this.state.studentPropositions.filter(aProp=>aProp.index!==tempProps.index)
        let theArr =[...temp, tempProps]
        this.setState({studentPropositions:theArr})
    }

    handleTerminerClick=(e)=>{
        let studentPaper = this.props.copies.find(copie=>copie.idEvaluation===this.state.idEvaluation && copie.idEtudiant===this.state.idEtudiant && copie.idTypeEvaluation===this.state.evalType)
        studentPaper = {...studentPaper, propositions:this.state.studentPropositions, doneMarking:e.target.id==='true'}
        /*
            1. update the copie with idCopie: studentPaper.idCopie
            2. update it with: studentPaper
            3. fetch data back to the state.

        */
        /*
            Prepare what will be going to the note reducer.
            1. verify if student notes for the cour: this.state.idCour exists
            2. if it doesnt exist, create one and if it does exist start verifying the notes.
            3. 
        */
       if(studentPaper.idTypeEvaluation!==3){
           let verifyNote = this.props.notes.find(note=>note.idCour===this.state.idCour && note.idEtudiant===this.state.idEtudiant)
           let doesItExist=false
           if(verifyNote===undefined){
               verifyNote = {idNote:this.props.notes.length, idEtudiant: this.state.idEtudiant, idCour: this.state.idCour, notes:{
                   CC:{note:'', published:false},
                   Examen:{note:'', published: false},
                   Projet:{note:'', published:false},
                   TD:{note:'', publshed:false},
                   Rattrapage:{note:'', published:false}
                }}
            }else doesItExist=true

            let evalTypeName=''
            let totalScore = 0
            studentPaper.propositions.map(proposition=>totalScore+=proposition.score)
            switch(studentPaper.idTypeEvaluation){
                case 1:
                    verifyNote.notes.CC.published===false?verifyNote.notes.CC.note=totalScore:alert('You are trying to change notes that are already published or in transit')
                    evalTypeName='CC'
                    break
                case 2:
                    verifyNote.notes.Examen.published===false?verifyNote.notes.Examen.note=totalScore:alert('You are trying to change notes that are already published or in transit')
                    evalTypeName='Examen'
                    break
                case 4:
                    verifyNote.notes.Rattrapage.published===false?verifyNote.notes.Rattrapage.note=totalScore:alert('You are trying to change notes are that already published or in transit')
                    evalTypeName='Rattrapage'
                    break
                default:
                    break
            }
            if(doesItExist){
                if(verifyNote.notes[evalTypeName].published===false){
                    //update the note with id: verifyNote.idNote
                    //the new object to replace with is: verifyNote
                }
            }else{
                //create a new note
                //the object that is created is: verifyNote
            }
        }       
       this.setState({idEtudiant:''})
    }

    displayStudentCopieForCorrection=()=>{
        if(this.state.evalType!=='' && this.state.idEtudiant!=='' && this.state.idEvaluation!==''){
            let questionPaper = this.props.evaluations.find(evaln=>evaln.idEvaluation===this.state.idEvaluation)
            let subject = this.props.cours.find(cour=>cour.idCour===questionPaper.idCour)
            let typeEval = this.props.typeEvaluations.find(tpe=>tpe.idTypeEvaluation===this.state.evalType).nomTypeEvaluation
            let subjectClasses = subject.classe.map(aClass=><span key={aClass} className='correctedPaperHeaderClasse'>{' '+aClass}</span>)
            let studentPaper = this.props.copies.find(copie=>copie.idEvaluation===this.state.idEvaluation && copie.idEtudiant===this.state.idEtudiant && copie.idTypeEvaluation===this.state.evalType)
            let student = this.props.etudiants.find(etudiant=>etudiant.idEtudiant===this.state.idEtudiant)
            let finalScore = 0
            let maxScore = 0
            studentPaper.propositions.map(aProp=>finalScore+=aProp.score)
            questionPaper.questions.map(question=>maxScore+=question.mark)
            // if you have time to play, make another student interface where you show the correction of his papers (devoirs, cc)

            return (
                <div className="displayPaperToBeCorrected">
                    displayStudentCopieForCorrection
                    <div className="toBeCorrectedPaperHeader">
                        {typeEval+' de '+subject.nomCours}
                        {'Classe(s): '}{subjectClasses}
                        {'Le: '+new Date(questionPaper.dateTime).toDateString()}
                        {'Duree: '+questionPaper.duree.split(':')[0]+'h:'+questionPaper.duree.split(':')[1]+'m'}
                        {"Nom de l'etudiant: "+student.nom+' '+student.prenom}
                    </div>
                    
                    {questionPaper.questions.map(question=>{
                        let studProposition = this.state.studentPropositions.find(proposition=>proposition.index===question.index)
                        studProposition = studProposition===undefined?{index:question.index, proposition:'', score:0}:studProposition
                        return(
                            <div key={question.index} className="toBeCorrectedPaper">
                                <span className='questionPaperIndex'>Question {question.index}</span>
                                <span className='questionPaperQuestion'>Q: {question.question}</span>
                                <span className='questionProposition'>R: {studProposition.proposition}</span>
                                <div className="inputMark">
                                    {question.idTypeQuestion===2?<input className='givenScore' type="number" min={0} max={question.mark} value={studProposition.score} step={0.01} id={'question_'+question.index} onChange={this.handleInputQuestionMark}/>:
                                    <span className='givenScore' >{studProposition.score}</span>}
                                    <span className='slash'>/{question.mark}</span>
                                </div>
                            </div>
                        )
                    })}

                    <div className="toBeCorrectedPaperFooter">
                        <span className='finalScore'>Final score: {finalScore} / {maxScore}</span>
                        <button onClick={this.handleTerminerClick} id='false'>Sauvegarder a ce niveau</button>
                        <button onClick={this.handleTerminerClick} id='true'>Correction Termine</button>
                    </div>
                </div>
            )
        }else return null
    }

    render() {
        return (
            <div>
                {this.displayTeacherSubjects()}
                {this.getConcernedSubjectEvaluation()}
                {this.getEvaluationCopies()}
                {this.displayStudentCopieForCorrection()}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        evaluations: state.Evaluation.evaluations,
        cours: state.Cour.cours,
        copies: state.Copie.copies,
        classes: state.Classe.classes,
        etudiants: state.Etudiant.etudiants,
        typeEvaluations: state.TypeEvaluation.typeEvaluations,
        notes: state.Note.notes
    }
}

export default connect(mapStateToProps)(CorrigerExamen)