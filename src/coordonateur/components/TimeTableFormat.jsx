import React, { Component } from 'react'
import TimeTableLine from './TimeTableLine'

import './TimeTableFormat.css'
import { connect } from 'react-redux'
import ClasseCoordo from './ClasseCoordo'
import ClasseDefinir from './ClasseDefinir'

class TimeTableFormat extends Component {
    state={
        tableHeader:{weekStart:'', weekEnd:''},
        Table:[],
        //matriculeCoordo is data that is supposed to be gotten when a coordo signs in... after decrypting the jwt, just pump the data into the state on the matriculeCoordo
        matriculeCoordo:'babatas',
        theClasse:''
    }

    definirTable={
        tableHeader:{weekStart:'', weekEnd:''},
        table:[
            {index:1, debut:'08:00', fin:'12:00', mon:{cour:'', salle:''}, tue:{cour:'', salle:''}, wed:{cour:'', salle:''}, thur:{cour:'', salle:''}, fri:{cour:'', salle:''}, sat:{cour:'', salle:''}, sun:{cour:'', salle:''}},
            {index:2, debut:'13:00', fin:'17:00', mon:{cour:'', salle:''}, tue:{cour:'', salle:''}, wed:{cour:'', salle:''}, thur:{cour:'', salle:''}, fri:{cour:'', salle:''}, sat:{cour:'', salle:''}, sun:{cour:'', salle:''}}
        ]
    }

    findClassFaculty=()=>this.props.faculties.find(faculty=>{
        return faculty.filieres.find(filiere=>filiere.nomFiliere===this.state.theClasse.split(' ')[0])
    }).nomFaculty

    getSalleCours=()=>{
        let classeFaculty=this.findClassFaculty()
        return this.props.batiments.filter(batiment=>batiment.nomFaculty===classeFaculty).map(batiment=>(
            <optgroup key={batiment.nomBatiment} label={batiment.nomBatiment}>
                {batiment.salles.map(salle=><option key={salle.nomSalle}>{salle.nomSalle}</option>)}
            </optgroup>
        ))
    }

    getClasseCours=()=>this.props.cours.filter(cour=>cour.classe.includes(this.state.theClasse)).sort((a,b)=>(a.nomCours>b.nomCours)?1:-1).map(cour=>{
        return <option key={cour.codeCours} value={cour.nomCours+'_'+cour.idEnseignant+'_'+cour.nomEnseignant.split(' ')[0]}>{cour.nomCours+'_'+cour.nomEnseignant.split(' ')[0]}</option>
    })

    handleLineDataChange=(lineNumber, e)=>{
        // let Day=day.split('_')[0]
        // let block=day.split('_')[1]
        // console.log(lineNumber+' '+day.target.value)
        let lineObject=this.state.Table[lineNumber-1]
        switch(e.target.id.split('_')[0]){
            case 'mon':
                switch(e.target.id.split('_')[1]){
                    case 'cours':
                        lineObject={...lineObject, mon:{cour:e.target.value, salle:lineObject.mon.salle}}
                        console.log(lineObject.mon.cour)
                        break
                    case 'salle':
                        lineObject={...lineObject, mon:{cour:lineObject.mon.cour, salle:e.target.value}}
                        break
                    default:
                        break
                }
                break
            case 'tue':
                switch(e.target.id.split('_')[1]){
                    case 'cours':
                        lineObject={...lineObject, tue:{cour:e.target.value, salle:lineObject.tue.salle}}
                        break
                    case 'salle':
                        lineObject={...lineObject, tue:{cour:lineObject.tue.cour, salle:e.target.value}}
                        break
                    default:
                        break
                }
                break
            case 'wed':
                switch(e.target.id.split('_')[1]){
                    case 'cours':
                        lineObject={...lineObject, wed:{cour:e.target.value, salle:lineObject.wed.salle}}
                        break
                    case 'salle':
                        lineObject={...lineObject, wed:{cour:lineObject.wed.cour, salle:e.target.value}}
                        break
                    default:
                        break
                }
                break
            case 'thur':
                switch(e.target.id.split('_')[1]){
                    case 'cours':
                        lineObject={...lineObject, thur:{cour:e.target.value, salle:lineObject.thur.salle}}
                        break
                    case 'salle':
                        lineObject={...lineObject, thur:{cour:lineObject.thur.cour, salle:e.target.value}}
                        break
                    default:
                        break
                }
                break
            case 'fri':
                switch(e.target.id.split('_')[1]){
                    case 'cours':
                        lineObject={...lineObject, fri:{cour:e.target.value, salle:lineObject.fri.salle}}
                        break
                    case 'salle':
                        lineObject={...lineObject, fri:{cour:lineObject.fri.cour, salle:e.target.value}}
                        break
                    default:
                        break
                }
                break
            case 'sat':
                switch(e.target.id.split('_')[1]){
                    case 'cours':
                        lineObject={...lineObject, sat:{cour:e.target.value, salle:lineObject.sat.salle}}
                        break
                    case 'salle':
                        lineObject={...lineObject, sat:{cour:lineObject.sat.cour, salle:e.target.value}}
                        break
                    default:
                        break
                }
                break
            case 'sun':
                switch(e.target.id.split('_')[1]){
                    case 'cours':
                        lineObject={...lineObject, sun:{cour:e.target.value, salle:lineObject.sun.salle}}
                        break
                    case 'salle':
                        lineObject={...lineObject, sun:{cour:lineObject.sun.cour, salle:e.target.value}}
                        break
                    default:
                        break
                }
                break
            default:
                break
        }
        let tempTable=[]
        this.state.Table.map(tableLine=>{
            if(tableLine.index===lineNumber)tempTable.push(lineObject)
            else tempTable.push(tableLine)
            return null
        })

        this.setState({Table:tempTable})
    }

    showLines=()=>this.state.Table.map(line=><TimeTableLine lineNumber={this.handleLineDataChange} line={line} cours={this.getClasseCours()} salles={this.getSalleCours()} key={line.index}/>)

    getCoordoObject=()=>this.props.coordonateurs.find(coordonateur=>coordonateur.matriculePersonnel===this.state.matriculeCoordo)

    handleDefinirClick=(e)=>{this.setState({theClasse:e.target.id.split('_')[0]+' '+e.target.id.split('_')[1], tableHeader:this.definirTable.tableHeader, Table:this.definirTable.table})}

    handleModifyEmtpy=()=>{this.setState({tableHeader:this.definirTable.tableHeader, Table:this.definirTable.table})}

    getClasseTimetable=()=>this.getCoordoObject().timetables.find(timetable=>timetable.classe===this.state.theClasse)

    handleModifierClick=(e)=>{
        this.setState({theClasse:e.target.id.split('_')[0]+' '+e.target.id.split('_')[1]},()=>{
            if (this.getClasseTimetable()===undefined || Object.keys(this.getClasseTimetable().timetable).length!==2)this.handleModifyEmtpy()
            else{
                let timetableObject= this.getClasseTimetable()
                this.setState({tableHeader:timetableObject.tableHeader, Table:timetableObject.table})
            }
        })
    }

    handleInputChange=(e)=>{
        let tempHeader = {...this.state.tableHeader, weekStart:e.target.value}
        this.setState({tableHeader:tempHeader},()=>this.fillToDate())
    }

    fillToDate=()=>{
        let tempHeader = new Date(this.state.tableHeader.weekStart)
        tempHeader = tempHeader.setDate(tempHeader.getDate()+6)
        tempHeader = new Date(tempHeader).toDateString()
        tempHeader={...this.state.tableHeader, weekEnd:tempHeader}
        this.setState({tableHeader:tempHeader})
    }

    handleEnregistrerClick=()=>{
        let uploadData ={tableHeader:this.state.tableHeader, table:this.state.Table}
        let concernedClass = this.state.theClasse
        let concernedCoordo = this.state.matriculeCoordo
        /*
            1. Go to the coordonateur collection and get the coordonateur with matricule: concernedCoordo (this is the coordonateur document to be updated)
            2. in this coordonateur's document gotten in 1, look for the timetable in its timetable array that has class: concernedClass (this is the class whose timetable field will be updated)
            3. when you already know the class, update the timetable of that class with : uploadData
            4. fetch the coordonateur collection and feed the coordonateur reducer with.
        */

        console.log(uploadData)
        console.log(concernedClass)
        console.log(concernedCoordo)
        console.log('those are the gururs to the functioning of this page')
        this.setState({theClasse:'', tableHeader:this.definirTable.tableHeader, Table:this.definirTable.table})
    }

    handlePublierClick=()=>{
        let uploadData ={tableHeader:this.state.tableHeader, table:this.state.Table}
        let concernedClass = this.state.theClasse
        let concernedCoordo = this.state.matriculeCoordo
        /*
            1. Go to the coordonateur collection and get the coordonateur with matricule: concernedCoordo (this is the coordonateur document to be updated)
            2. in this coordonateur's document gotten in 1, look for the timetable in its timetable array that has class: concernedClass (this is the class whose timetable field will be updated)
            3. when you already know the class, update the timetable of that class with : uploadData
            
            // this part is for the students to be able to see their timetables.
            4. Go to the timetables collection, and look for the class with classe: concernedClass
            5. when you already know the class, update the timetable of that class with : uploadData
            6. fetch the coordonateur collection and feed the coordonateur reducer with.
        */

        console.log(uploadData)
        console.log(concernedClass)
        console.log(concernedCoordo)
        console.log('updated data for both students and the coordo... the students can now see their timetable in the timetables collection.')
        this.setState({theClasse:'', tableHeader:this.definirTable.tableHeader, Table:this.definirTable.table})

    }

    render() {
        return (
            <div>
                <ClasseCoordo classes={this.getCoordoObject().classes.sort((a,b)=>(a>b)?1:-1)} handleDefinirClick={this.handleDefinirClick} handleModifierClick={this.handleModifierClick} />
                {this.state.theClasse!==''?<div className='timetableBottom'>
                    {console.log(this.findClassFaculty('IRT 2'))}
                    <ClasseDefinir theClasse={this.state.theClasse} handleInputChange={this.handleInputChange} fromDate={this.state.tableHeader.weekStart} toDate={this.state.tableHeader.weekEnd}/>
                    <TimeTableLine type='th' />
                    {this.showLines()}
                    <div className="timeTableBtns">
                        <input type='button' value='Enregistrer' className='enregistrerBtn' onClick={this.handleEnregistrerClick} />
                        <input type='button' value='Publier' className='publierBtn' onClick={this.handlePublierClick}/>
                    </div>
                </div>:null}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        coordonateurs: state.Coordonateur.coordonateurs,
        cours: state.Cour.cours,
        batiments: state.Batiment.batiments,
        classes: state.Classe.classes,
        faculties: state.Faculty.faculties,
        timetables: state.Timetable.timetables
    }
}

export default connect(mapStateToProps)(TimeTableFormat)