import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Examen.css'
import ClasseDefinir from '../coordonateur/components/ClasseDefinir';

class Examen extends Component {
    state={
        idEtudiant:1,
        idEvaluation:'',
        newPropositions:[],
        questionOrder:[]
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getAllIdCours=()=>{
        let theEtudiant = this.props.etudiants.find(etudiant=>etudiant.idEtudiant===this.state.idEtudiant)
        let theClasse =this.props.classes.find(classe=>classe.idClasse===theEtudiant.idClasse)
        theClasse=theClasse.filiere.nomFiliere +' '+ theClasse.niveau
        let cours = this.props.cours.filter(cour=>cour.classe.includes(theClasse))
        return cours.map(cour=>cour.idCour)
    }

    timeToMins=(time)=>{
        var b = time.split(':');
        return b[0]*60 + +b[1];
      }
      
      // Convert minutes to a time in format hh:mm
      // Returned value is in range 00  to 24 hrs
      timeFromMins=(mins)=> {
        function z(n){return (n<0?'':(n<10)?'0':'') + n;}
        var h = (mins/60 |0) % 24;
        var m = mins % 60;
        return z(h) + ':' + z(m);
      }
      
      // Add two times in hh:mm format
      addTimes=(t0, t1)=>{
        return this.timeFromMins(this.timeToMins(t0) + this.timeToMins(t1));
      }
      

    getAllDueCompos=()=>{
        let subjectIDs=this.getAllIdCours()
        let compos = subjectIDs.map(idSubject=>this.props.evaluations.filter(evaluation=>{
            let theTime = evaluation.dateTime.split(' ')[4].split(':')
            theTime=theTime[0]+':'+theTime[1]
            theTime = this.addTimes(theTime, evaluation.duree)

            let theDate = evaluation.dateTime.split(' ')
            theDate[4]=theTime
            theDate=theDate[0]+' '+theDate[1]+' '+theDate[2]+' '+theDate[3]+' '+theDate[4]
            return evaluation.idCour===idSubject && new Date(theDate)>=new Date() && evaluation.published && evaluation.idTypeEvaluation!==3
        }))
        let theCompos = []
        compos.map(subjectCompos=>subjectCompos.map(compo=>theCompos.push(compo)))
        return theCompos
    }

    //this method helps get the compos of the day that is today.
    getDayCompos=()=>{
        let compos = this.getAllDueCompos()
        compos = compos.map(compo=>{
            let compoDate = compo.dateTime.split(' ')
            compoDate.pop()
            compoDate = compoDate[0]+' '+compoDate[1]+' '+compoDate[2]+' '+compoDate[3]
            if(compoDate === new Date().toDateString()) return compo
        })

        return compos[0]===undefined?[]:compos
    }

    handleComposerClick=(e)=>{
        this.setState({idEvaluation: Number(e.target.id.split('_')[1])},()=>{
            if(this.state.questionOrder.length===0){
                let evaluation = this.props.evaluations.find(evaluatn=>evaluatn.idEvaluation===this.state.idEvaluation)
                let questionOrder =[]
                while(questionOrder.length!==evaluation.questions.length){
                    let rand = this.randomInteger(1,evaluation.questions.length)
                    if(!questionOrder.includes(rand))questionOrder.push(rand)
                }
                this.setState({questionOrder:questionOrder})
            }
        })
    }

    styleAllCompos=()=>{
        let compos = this.getDayCompos()
        return compos.map(compo=>{
            let nomCour= this.props.cours.find(cour=>cour.idCour===compo.idCour).nomCours
            let timeLeft = compo.dateTime.split(' ')[4]

            let now = new Date()
            now = now+''.split(' G')[0]
            now = now.split(' ')[4]
            now = now.split(':')
            now = '-'+now[0]+':'+'-'+now[1]

            let compoTime = compo.dateTime.split(' ')[4]
            compoTime = compoTime.split(':')
            compoTime = compoTime[0]+':'+compoTime[1]

            let checkCopie = this.props.copies.find(copie=>copie.idEtudiant===this.state.idEtudiant && copie.idEvaluation===compo.idEvaluation && copie.idTypeEvaluation===compo.idTypeEvaluation)
            //verify time left to compos
            if(checkCopie!==undefined){
                timeLeft=<span className='late'>Vous avez deja remis votre epreuve</span>
            }else if(new Date(compo.dateTime)>=new Date()){
                timeLeft = this.addTimes(now, compoTime)
                let theSeconds = new Date()+''
                theSeconds = theSeconds.split(' G')[0]
                theSeconds = theSeconds.split(' ')[4]
                theSeconds = 60-Number(theSeconds.split(':')[2])
                theSeconds = theSeconds<10? '0'+theSeconds:theSeconds

                let theMinutes = 0
                theMinutes = Number(timeLeft.split(':')[1])-1

                timeLeft = <div className='timeleft'>
                    <span className='dans'>Dans: </span>
                    <span className='hours'>{timeLeft.split(':')[0]}H : </span>
                    <span className='minutes'>{theMinutes}M : </span>
                    <span className='seconds'>{theSeconds}S</span>
                </div>
            }else {
                //verify lateness rate(how many minutes late)
                let lateness = this.addTimes(compoTime, now)
                lateness = lateness.split(':')
                if(Number(lateness[0])===0 && Number(lateness[1])>=-15) timeLeft=<button id={'compo_'+compo.idEvaluation} className='composerBtn' onClick={this.handleComposerClick}>Composer</button>
                else timeLeft=<span className='late'>Vous etes en retard</span>
            }
            console.log(compo)
            //calculate time left to end of compos
            let compoType = ''
            switch(compo.idTypeEvaluation){
                case 1:
                    compoType='CC'
                    break
                case 2:
                    compoType='Examen'
                    break
                case 4:
                    compoType='Rattrapage'
                    break
                default:
                    break;
            }

            return (
                <div className="styledCompo" key={compo.idEvaluation}>
                    <div className="styledCompoHeader">
                        <span className='composTitreCours'>{compoType} de {nomCour}</span>
                        <span className='duree'>{compos.duree}</span>
                    </div>
                    {timeLeft}
                </div>
            )
        })
    }

    handlePropositionChange=(e)=>{
        let questionNumber = Number(e.target.id.split('_')[1])
        let questionProp = this.state.newPropositions.find(proposition=>proposition.index===questionNumber)
        questionProp===undefined? questionProp={index:questionNumber, proposition:e.target.value}:questionProp.proposition=e.target.value
        let tempProps =this.state.newPropositions.filter(proposition=>proposition.index!==Number(e.target.id.split('_')[1]))
        tempProps.push(questionProp)
        this.setState({newPropositions:tempProps})
    }

    randomInteger = (min, max)=> {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    displayQuestions=()=>{
        if(this.state.idEvaluation!==''){
            let evaluation = this.props.evaluations.find(evaluatn=>evaluatn.idEvaluation===this.state.idEvaluation)
            
            let theTime = evaluation.dateTime.split(' ')[4].split(':')
            theTime=theTime[0]+':'+theTime[1]
            theTime = this.addTimes(theTime, evaluation.duree)

            let now = new Date()
            now = now+''.split(' G')[0]
            now = now.split(' ')[4]
            now = now.split(':')
            let theSeconds = 60-Number(now[2])
            now = '-'+now[0]+':'+'-'+now[1]

            let composTimeLeft = this.addTimes(now, theTime)

            let index = 0
            let theQuestions = this.state.questionOrder.map(questionIndex=>{
                let question = evaluation.questions.find(question=>question.index===questionIndex)
                let optionIndex=0
                let questionType = this.props.typeQuestions.find(typeQuestion=>typeQuestion.idTypeQuestion===Number(question.idTypeQuestion)).nomTypeQuestion
                let questionProposition = this.state.newPropositions!==undefined?this.state.newPropositions.find(proposition=>proposition.index===question.index):undefined
                questionProposition= questionProposition!==undefined?(questionProposition.proposition):''
                return(
                    <div className="askedQuestion" key={++index}>
                        <span className='askedQuestionHeader'>Question {index}</span>
                        <span className='askedQuestionIndications'>{question.indications}</span>
                        <span className='askedQuestionIndications'>{question.question}</span>
                        {questionType==='QCM'?(
                            <form  className="displayOptions">
                                {question.options.map(option=>(
                                    <label htmlFor={'option_'+index+'_'+optionIndex} key={optionIndex}>
                                        <input type='radio' onChange={this.handlePropositionChange} id={'option_'+question.index+'_'+optionIndex} key={optionIndex++} name={'question_'+index} value={option} checked={questionProposition===option} />
                                        {option}
                                    </label>
                                ))}
                            </form>
                        ):(
                            <textarea className='askedQuestionAnswer' id={'option_'+question.index+'_'+optionIndex} onChange={this.handlePropositionChange} placeholder='Entrez la reponse' value={questionProposition} />
                        )
                        }
                    </div>
                )
            })
            let theMinutes = 0
            theMinutes = Number(composTimeLeft.split(':')[1]) - 1
            
            if(Number(composTimeLeft.split(':')[0])===0 && Number(composTimeLeft.split(':')[1])===0){
                this.handleRemettreClick()
            }else{
                return (<div className="questionPaper">
                    <div className="timeLeft">Temps restant: {composTimeLeft.split(':')[0]+':'+theMinutes+':'+theSeconds}</div>
                    {this.displayDoneBtn()}
                    {theQuestions}
                </div>)
            }
        }else return null
    }

    

    handleRemettreClick= ()=>{
        let evaluation = this.props.evaluations.find(evaluation=>evaluation.idEvaluation===this.state.idEvaluation)
        let finalPropositions=[]
        evaluation.questions.map(question=>{
            let questionProp = this.state.newPropositions.find(proposition=>proposition.index===question.index)
            let tempProps={}
            if(questionProp===undefined){
                tempProps = {index:question.index, proposition:'', score:0}
                finalPropositions.push(tempProps)
            }else{
                let typeQuestion= this.props.typeQuestions.find(type=>type.idTypeQuestion===question.idTypeQuestion).nomTypeQuestion
                if(typeQuestion==='QCM'){
                    let tempScore = questionProp.proposition===question.answer?question.mark:0
                    tempProps={...questionProp, score:tempScore}
                    finalPropositions.push(tempProps)
                }else {
                    tempProps={...questionProp, score:''}
                    finalPropositions.push(tempProps)
                }
            }
        })

        let toBeUploaded = {idCopie:this.props.copies.length, idEvaluation:this.state.idEvaluation, idEtudiant:this.state.idEvaluation, idTypeEvaluation:evaluation.idTypeEvaluation, propositions:finalPropositions}
        /*
            The collection of interest here is the Copies collection. 
            1. The object to be uploaded to the Copies collection is: toBeUploaded

        */
       console.log(toBeUploaded)
       this.setState({idEvaluation:'', newPropositions:[], questionOrder:[]})
    }

    displayDoneBtn=()=>(
        <button id='remettreEpreuveBtn' onClick={this.handleRemettreClick}>Remettre ma copie</button>
    )

    render() {
        return (
            <div>
                {this.state.idEvaluation!==''?null:this.styleAllCompos()}
                {this.displayQuestions()}                
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        etudiants: state.Etudiant.etudiants,
        classes: state.Classe.classes,
        cours: state.Cour.cours,
        evaluations: state.Evaluation.evaluations,
        typeQuestions: state.TypeQuestion.typeQuestions,
        copies: state.Copie.copies
    }
}

export default connect(mapStateToProps)(Examen)