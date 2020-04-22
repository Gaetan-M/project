import React, { Component } from 'react'

import './StudentForum.css'
import { connect } from 'react-redux'

class StudentForum extends Component {
    state={
        idEtudiant:1,
        idCour:1,
        message:'',
        refFile:'',
    }

    fileTypeIcons = {
        "mov":"file-video", "qt":"file-video", "rm":"file-video", "wmn":"file-video", "wmf":"file-video", "mkv":"file-video", "mka":"file-video", "mks":"file-video", "mk3d":"file-video",
        "mp4":"file-video", "mp4a":"file-video", "mp4v":"file-video", "m4p":"file-video", "m4v":"file-video", "mpg":"file-video", "mpeg":"file-video", "m2p":"file-video", "ps":"file-video",
        "ts":"file-video", "tsv":"file-video", "tsa":"file-video", "asf":"file-video", "wma":"file-video", "wmv":"file-video", "flv":"file-video", "ogg":"file-video", "ogv":"file-video", "oga":"file-video",
        "ogx":"file-video", "ogm":"file-video", "3gp":"file-video", "3g2":"file-video", "m2ts":"file-video", "mts":"file-video", "vob":"file-video", "mpe":"file-video", "mpv":"file-video", "xvid":"file-video",
        
        "mp3":"file-audio", "wav":"file-audio", "aac":"file-audio", "midi":"file-audio", "flac":"file-audio", "pls":"file-audio", "mpa":"file-audio", "m3u":"file-audio", 

        "py":"file-code", "lua":"file-code", "java":"file-code", "c":"file-code", "cpp":"file-code", "m":"file-code", "cs":"file-code", "cmd":"file-code", "sh":"file-code", "go":"file-code", 
        "js":"file-code", "html":"file-code", "htm":"file-code", "jsx":"file-code", "xml":"file-code", "xhtml":"", "net":"file-code", "css":"file-code",


        "doc":"file-word", "dot":"file-word", "docx":"file-word", "ott":"file-word", "fodt":"file-word", "uot":"file-word",

        "ppt":"file-powerpoint", "pptx":"file-powerpoint", "pps":"file-powerpoint", "ppsx":"file-powerpoint", "pot":"file-powerpoint", "potm":"file-powerpoint", "odp":"file-powerpoint","odg":"file-powerpoint",
        "otp":"file-powerpoint", "uog":"file-powerpoint",

        "xls":"file-excel", "xlsx":"file-excel", "xlt":"file-excel", "slk":"file-excel", "xlsm":"file-excel", "ots":"file-excel", "ods":"file-excel", "fods":"file-excel", "uos":"file-excel", "dif":"file-excel",
        "csv":"file-csv",

        "png":"file-image", "jpg":"file-image", "jpeg":"file-image", "ico":"file-image", "tif":"file-image", "bmp":"file-image", "gif":"file-image", "svg":"file-image",

        "zip":"file-archive", "rar":"file-archive", "gz":"file-archive", "xs":"file-archive", "iso":"file-archive", "tar":"file-archive", "7z":"file-archive",
        "txt":"file-text", "pdf":"file-pdf"
    }

    getForumMessages=()=>this.props.forums.find(forum=>forum.idCour===this.state.idCour).messages

    getForumChatDates=()=>{
        let forumMessages = this.getForumMessages()
        let differentDates = []
        forumMessages.map(message=>{
            if(!differentDates.includes(message.date)){
                differentDates.push(message.date)
            }

            return null
        })

        return differentDates.sort((a,b)=>{
            let c=new Date(a)
            let d = new Date(b)
            return c>d?1:-1
        })
    }

    displayMessage=(message, key)=>{
       let nomSender =''
       let messageClassName = ''
       if(message.isEnseignant) {
           nomSender = this.props.personnels.find(personnel=>personnel.idPersonnel===this.props.cours.find(cour=>cour.idCour===this.state.idCour).idEnseignant)
           messageClassName='teacherMessage'
        }else if(message.idEtudiant===this.state.idEtudiant){
            nomSender = {nom:'Moi', prenom:''}
            messageClassName='myMessage'
        }else{
            nomSender=this.props.etudiants.find(etudiant=>etudiant.idEtudiant===message.idEtudiant)
            messageClassName='othersMessage'
        }
        let messageTime = message.dateTime.split(' ')[4]
        nomSender= nomSender.nom +' '+ nomSender.prenom

        //if refFile is not empty, then it means there is a file for this message
        //if its an image, then display the image in the img tag
        //else make the ref downloadable on click
        //adjust the return below to either be an image or a link that downloads a ref on Click
        let refFile = message.refFile!==''?(<img src='' alt='hell' className='messageImage' />):null

        return (
            <div key={key} className={messageClassName+ ' message'}>
                <span className='messageSender'>{nomSender}</span>
                <span className='messageRef'>{refFile}</span>
                <span className='messageContent'>{message.message}</span>
                <span className='messageTime'>{messageTime}</span>
            </div>
        )
    }

    displayForumMessagesPerDatePerTime=()=>{
        let chatDates = this.getForumChatDates()
        let messages = this.getForumMessages()
        let key=0
        return chatDates.map(chatDate=>{
            let dateMessages = messages.filter(message=>message.date===chatDate).sort((a,b)=>{
                let c=new Date(a.dateTime)
                let d = new Date(b.dateTime)
                return c>d?1:-1
            })

            return (
                <div className='dateMessagesBlock' key={chatDate}>
                    <span className='dateMessagesHeader'>{chatDate}</span>
                    <div className='dateMessages'>
                        {dateMessages.map(message=>this.displayMessage(message, ++key))}
                    </div><br />
                </div>
            )
        })
    }

    handleNewMessageChange=(e)=>{
        this.setState({message:e.target.value})
    }

    handleSendMessage=()=>{
        if(this.state.refFile!=='' || this.state.message!==''){
            let date = new Date()
            date = date.toDateString()
            let dateTime = new Date()+' '
            dateTime = dateTime.split(' G')[0]
            let newMessage = {date:date, dateTime:dateTime, isEnseignant:true, message:this.state.message, refFile:this.state.refFile, idEtudiant:''}
            //In the forum collection, update the forum with id: this.state.idCours
            //add the message: newMessage to the messages array of this forum
            //After adding the message, fetch the data back to the forums in the state.
            //If there was the possibility to fetch only that forum back so as not to use the user's data

            //in the componentDidMount of this page, make it fetch the forum's page every second... or i don't know if mongo has a realtime db
            //that will do automatic fetches if the db changes..

            console.log(newMessage)
            this.setState({message:'', refFile:''})
        }else alert('write a message or send a file')
    }

    handleAttachFile=(e)=>{
        e.preventDefault()
    }

    writeMessage=()=>(
        <div>
            <form className='newMessage'>
                <button onClick={this.handleAttachFile}><i className='fa fa-paperclip'/></button>
                <input type='text' className='newMessageInput' value={this.state.message} placeholder='Type your message' onChange={this.handleNewMessageChange} />
                <i className='fa fa-send' onClick={this.handleSendMessage}/>
            </form>
            {/* <Link to='/hell'>Voir emploi de temps</Link> */}
        </div>
    )

    showSupportCours=()=>{
        let supports = this.props.cours.find(cour=>cour.idCour===this.state.idCour).refSupports
        return (
            <div className="supportsCours">
                {supports.map(support=>(
                    <div className='support' key={support.ref}>
                        <i className={'fa fa-'+(this.fileTypeIcons[support.nameFile.split('.')[support.nameFile.split('.').length-1]] || 'file' )+'-o'} />
                        <span className='nomSupport'>{support.nameFile}</span>
                        <i className='fa fa-download' />
                    </div>
                ))}
            </div>
        )

    }

    displayCoursHeader=()=>{
        let coursData = this.props.cours.find(cour=>cour.idCour===this.state.idCour)

        return(
            <div className="studentCourHeader">
                <span className='classesOfferingCours'>{'Classe(s): '}{coursData.classe.map(classe=><span key={classe}>{classe}</span>)}</span>
                <span className='studentCoursTeacher'>{coursData.nomEnseignant}</span>
                <span className='studentIntituleCour'>{coursData.nomCours}</span>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.displayCoursHeader()}
                {this.displayForumMessagesPerDatePerTime()}
                {this.writeMessage()}
                {this.showSupportCours()}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        forums: state.Forum.forums,
        etudiants: state.Etudiant.etudiants,
        cours: state.Cour.cours,
        personnels: state.Personnel.personnels
    }
}

export default connect(mapStateToProps)(StudentForum)