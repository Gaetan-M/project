import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import './TeacherForum.css'
import { connect } from 'react-redux'

const socket=io.connect('http://localhost:3001')
class TeacherForum extends Component {
    state={
        /*
            Don't forget to make this link accessible only the the subject teacher.
            that is to say only the teacher of a subject can acces the url teacherforum/:idcour

            you decide which way to go. that is should the idcour be in the url (visible to any who's wise)
            or send it through jwt when a teacher tries to access this page

            according to me if it is sent through jwt, then it is more secure. only the teacher will be able to get to a specified forum
            given that this data is sent through a jwt... 
            
            dont' forget to sent the teacher(personnel) info in the jwt too.
        */
        idCour:1, //using it for frontend purposes. this data should be sent using jwt
        idPersonnel: 1, //using it for frontend purposes. this data should be sent using jwt

        refFile:'',
        message:'',
        newSupport:'',
        supports:[],
        messages:[],
        forum:{messages:[ ]},
        id:'5e9d91c4820e0b2fbf4747c0'
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

    getForumMessages=()=>this.state.forum.messages

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
           nomSender = this.props.personnels.find(personnel=>personnel.idPersonnel===this.state.idPersonnel)
           messageClassName='teacherMessage'
        }else{
            nomSender = this.props.etudiants.find(etudiant=>etudiant.idEtudiant===message.idEtudiant)
            messageClassName='studentMessage'
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
            
            socket.emit('newMessage',newMessage)
            let Forum=this.state.forum;
            Forum.messages.push(newMessage)
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
            <Link to='/hell'>Voir emploi de temps</Link>
        </div>
    )

    afficheCourHeader=()=>{
        let theCour = this.props.cours.find(cour=>cour.idCour===this.state.idCour)
        let classes = theCour.classe.map(classe=><span key={classe} className='nomClasseForum'>{classe}</span>)
        return (
            <div className='courHeader'>
                <span className='nomForumCour'>Intitule cours: {theCour.nomCours}</span>
                <span className='concernedClassesForum'>Classes: {classes}</span>
            </div>
        )
    }

    showSupportCours=()=>{
        // let supports = this.props.cours.find(cour=>cour.idCour===this.state.idCour).refSupports
         let supports=this.state.supports
         console.log(supports)
        return (
            <div className="supportsCours">
                {supports.map(support=>(
                    <div className='support' key={support.supports._id}>
                        <i className={'fa fa-'+(this.fileTypeIcons[support.supports.filename.split('.')[support.supports.filename.split('.').length-1]] || 'file' )+'-o'} />
                        <span className='nomSupport'><a href={"http://localhost:3001/files/"+support.supports.filename} >{support.supports.filename}</a></span>
                    </div>
                ))}
            </div>
        )

    }
    handleFileChange=(e)=>{
        this.setState({newSupport:e.target.files[0]})
    }

    uploadSupport=()=>{
        let formData = new FormData()
        formData.append(
            'file',
            this.state.newSupport
        )
        let coursObject=this.props.cours.find(cour=>cour.idCour===this.state.idCour)
        let ref =coursObject.codeCours+'_'+(coursObject.refSupports.length+1)
        let newFormRef = {nameFile:this.state.newSupport.name, ref:ref}
        
        fetch('http://localhost:3001/files/upload',{
        method:'POST',
        body:formData,
        // headers:{'content-type':'application/json'}
       }).then(response=>response.json())
       .then(data=>{
        console.log(data)
        })
       .catch(error=>console.log(error))
       console.log(this.state.newSupport.name)
        /*
            update the cours with idCour: this.state.idCour by adding newFormRef to its refSupport object
            add this.state.newSupport to the gridFS or i don't know what.
            The refName of this file to store in gridFS should be: ref
        */

        console.log(newFormRef)
        this.setState({newSupport:''})
    }

    showUploadFile=()=>{
        return (
            <div className='fileSupportCours'>
                <input type='file' onChange={this.handleFileChange}/>
                {this.state.newSupport!==''?(
                    <div className='newFileInfo'>
                        <span className='newFileName'>Nom fichier: {this.state.newSupport.name}</span>
                        <span className='newFileType'>Type fichier: {this.state.newSupport.type}</span>
                        <span className='newFileSize'>Taille fichier: {((Number(this.state.newSupport.size)/1024)/1024).toFixed(2)}Mb</span>
                        <div><button onClick={this.uploadSupport}><i className='fa fa-upload'/>uploadFile</button></div>
                    </div>
                ):null}
            </div>
        )
    }
    loadData(){
       fetch('http://localhost:3001/files',{
        method:'GET',
        headers:{'content-type':'application/json',id:this.state.id}
       }).then(response=>response.json())
       .then(data=>{this.setState({supports:data})
        console.log(data)
        })
       .catch(error=>console.log(error))
    }
        getData(){
        fetch('http://localhost:3001/forum',{
            method:'get',
            headers:{'content-type':'application/json'}
        })
        .then(res=>res.json())
        .then(async data=>{
           await this.props.dispatch({type: "CREATE_ETUDIANT", payload: data.personnel})
           await this.props.dispatch({type: "CREATE_BATIMENT", payload: data.Forum})
           await this.props.dispatch({type: "CREATE_COUR", payload: data.cours})
           await this.props.dispatch({type: "CREATE_PERSONNEL", payload: data.personnel})
            console.log(data)})
        .catch(error=>console.log(error))
    }
init(){

      socket.on('initilisation',async (data)=>{
        this.setState({forum:data.message[0]})
        console.log('state init',this.state.forum)
    })
  }
  onSocket(){
    let Forums=[{messages:[]}]
    let For:{};
    socket.on('newMessage',async (data)=>{
    console.log('broadcast',data)
    For=this.state.forum
    For.messages.push(data)
    this.setState({forum:For})
     }) 
}
componentDidMount(){
    console.log('componentDidMount',this.state.forum)
    this.getData()
    //on devra passer ici l'id du cour concerné
    socket.emit('idCour','5e9d91c4820e0b2fbf4747c0')
    this.onSocket()
    this.loadData()

}

    render() {
            this.init();
        return (
            <div>
                {
                this.afficheCourHeader()}
                {this.displayForumMessagesPerDatePerTime()}
                {this.writeMessage()}
                {this.showSupportCours()}
                {this.showUploadFile()}
            }
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        etudiants: state.Etudiant.etudiants,
        forums: state.Forum.forums,
        cours: state.Cour.cours,
        personnels: state.Personnel.personnels
    }
}


export default connect(mapStateToProps)(TeacherForum)