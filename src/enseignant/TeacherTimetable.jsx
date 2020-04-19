import React, { Component } from 'react'

import './TeacherTimetable.css'
import { connect } from 'react-redux'

class TeacherTimetable extends Component {
    state={
        /*
            Change this data with data from the local storage.
            what i mean by this is when the teacher connects himself, the token that comes with it should have th idPersonnel
            do something like componentDidMount(){this.setState(idConnectedPersonnel:localStorage.getItem(idPersonnel))}
            i don't know but sth like that.
        */
        idConnectedPersonnel:1,
    }

    getConnectedTeacher=()=>this.props.teachers.find(teacher=>teacher.idPersonnel===this.state.idConnectedPersonnel)
    getPersonnelObject=()=>this.props.personnels.find(personnel=>personnel.idPersonnel===this.state.idConnectedPersonnel)

    getToughtClassesTimetables=()=>{
        let toughtClasses=this.getConnectedTeacher().toughtClasses
        return toughtClasses.map(classe=>this.props.timetable.find(timetable=>timetable.classe.idClasse === classe.idClasse))
    }

    getClassWeekSubjects=()=>{
        let timetables=this.getToughtClassesTimetables()
        let mappedTimetable = timetables.map(timetable=>timetable.table.map(tableLine=>{
            let line=tableLine
            delete line.index
            delete line.debut
            delete line.fin
            return Object.keys(line).map(day=>line[day].cour+'-'+line[day].salle)
        }))

        let line=0;
        let hisTable =[]
        let personnelData=this.getPersonnelObject()

        mappedTimetable.map(aClassTable=>aClassTable.filter(aclassLine=>{
            let index = 0;
            line++
           aclassLine.map(elmt=>{
               if(Number(elmt.split('_')[1])===personnelData.idPersonnel){
                   let classIndex=0
                   let theLine=0
                   classIndex=Math.ceil(line/2)
                   theLine = line%2===0?2:1
                   let toughtClasses = this.getConnectedTeacher().toughtClasses
                   let subject = elmt.split('-')[0].split('_')[0]
                   let salle = elmt.split('-')[1]
                   ++index
                   let day=0
                   switch(index){
                       case 1:
                           day='mon'
                           break
                       case 2:
                           day='tue'
                           break
                       case 3:
                           day='wed'
                           break
                       case 4:
                           day='thur'
                           break
                       case 5:
                           day='fri'
                           break
                       case 6:
                           day='sat'
                           break
                       case 7:
                           day='sun'
                           break
                        default:
                            break
                   }
                   hisTable.push(toughtClasses[classIndex-1].nomClasse+'_'+theLine+'_'+day+'_'+subject+'_'+salle)
               }else ++index
               return null
            })
            return null
        }))

        return hisTable
        /*
            output: ["IRT 3_1_mon_IDE_B03", "IRT 3_1_tue_IDE_", "IRT 3_2_mon_IDE_", "IRT 2_2_thur_IDE_"]

            meaning: className_lineNumber_day_subject_salle
        */
    }

    generateTeacherTimetable=()=>{
        let representativeTable= this.getClassWeekSubjects()
        let table=[
            {index:1, debut:'08:00', fin:'12:00', mon:{classe:'', cour:'', salle:''}, tue:{classe:'', cour:'', salle:''}, wed:{classe:'', cour:'', salle:''}, thur:{classe:'', cour:'', salle:''}, fri:{classe:'', cour:'', salle:''}, sat:{classe:'', cour:'', salle:''}, sun:{classe:'', cour:'', salle:''}},
            {index:2, debut:'13:00', fin:'17:00', mon:{classe:'', cour:'', salle:''}, tue:{classe:'', cour:'', salle:''}, wed:{classe:'', cour:'', salle:''}, thur:{classe:'', cour:'', salle:''}, fri:{classe:'', cour:'', salle:''}, sat:{classe:'', cour:'', salle:''}, sun:{classe:'', cour:'', salle:''}}
        ]

        representativeTable.map(weekSubject=>{
            let lineIndex = Number(weekSubject.split('_')[1])-1
            let day = weekSubject.split('_')[2]
            table[lineIndex][day].classe=weekSubject.split('_')[0]
            table[lineIndex][day].cour=weekSubject.split('_')[3]
            table[lineIndex][day].salle=weekSubject.split('_')[4]
            return null
        })
        return table
    }

    getMonday=()=>{
        let today=new Date();
        if(today.getDay()!==1){
            today.setHours(-24*(today.getDay()-1))
            return today.toDateString()
        }else return today.toDateString()
    }

    getSunday=()=>{
        let monday=new Date(this.getMonday())
        monday.setDate(monday.getDate()+6)
        return new Date(monday).toDateString()
    }

    showTeacherTable=()=>{
        let teacherTable = this.generateTeacherTimetable()
        let days=['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun']
        return teacherTable.map(line=>(
        <div className='LineHolder' key={line.index}>
            <div className="columnTime">
                <span className='hmm'>
                    <h3>Debut: </h3><span id='fromTime'>{line.debut}</span>
                </span>
                <span>
                    <h3>Fin: </h3><span id='toTime'>{line.fin}</span>
                </span>
            </div>
            {days.map(day=> <div className="columnDay" key={line.index+day}>
                    <span id='mon_cours' >{line[day].classe}</span>
                    <span id='mon_cours' >{line[day].cour}</span>
                    <span id='mon_cours' >{line[day].salle}</span>
                </div>
            )}
        </div>
        ))
    }

    render() {
        return (
            <div>
                <div className='weekDate'>
                    <span>Semaine allant de: {this.getMonday()} - {this.getSunday()}</span>
                </div>
                {this.showTeacherTable()}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        teachers: state.Teacher.teachers,
        personnels: state.Personnel.personnels,
        timetable: state.Timetable.timetables
    }
}

export default connect(mapStateToProps)(TeacherTimetable)