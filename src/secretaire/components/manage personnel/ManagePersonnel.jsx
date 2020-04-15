import React, { Component } from 'react';
import { connect }  from 'react-redux';

import './ManagePersonnel.css';


class ManagePersonnel extends Component {
    state={
        inEditableState:'',
        editableObject:{},
        newCoordoClass:'',
        newPersonnelCoordoClass:'',
        newPersonnel:{matricule:'', nom:'', prenom:'', mail:'', tel:'', role:''},
        openNewPersonnel:false,
    }

    sortPersonnelWRTRoleAndName=()=>this.props.personnels.sort((a,b)=>(a.role>b.role)?1:(a.role===b.role)?((a.nom>b.nom)?1:(a.nom===b.nom)?((a.prenom>b.prenom)?1:-1):-1):-1)

    handlePersonnelEdit=(e)=>{
        this.setState({inEditableState:e.target.id,editableObject:this.props.personnels.find(personnel=>personnel.matricule===e.target.id)})
    }

    handlePersonnelDelete=(personnelMatricule)=>{
        /*
            1. Delete the personnel with this matricule
            2. fetch the personnel collection from the database and load the personnel part of redux
        */
        alert('deleted personnel with matricule: '+personnelMatricule)
    }

    handleEditChange=(e)=>{
        let tempObj={}
        switch(e.target.id){
            case 'managePersonnelMail':
                tempObj={...this.state.editableObject, mail:e.target.value}
                this.setState({editableObject:tempObj})
                break
            case 'managePersonnelTel':
                tempObj={...this.state.editableObject, tel:e.target.value}
                this.setState({editableObject:tempObj})
                break
            case 'managePersonnelRole':
                tempObj={...this.state.editableObject, role:e.target.value}
                this.setState({editableObject:tempObj})
                break
            case 'newCoordoClass':
                this.setState({newCoordoClass:tempObj})
                break
            default:
                break
        }
    }

    handleEditSave=(e)=>{
        if(this.state.editableObject.mail!=='' && this.state.editableObject.tel!=='' && this.state.role!==''){
            if(this.state.editableObject.role==='coordonateur' && this.state.newCoordoClass!==''){
                let coordoClasses = this.props.classes.filter(classe=>classe.filiere.nomFiliere===this.state.newPersonnelCoordoClass)
                let coordoUploadObject={matriculePersonnel:this.state.editableObject.matricule, classes:coordoClasses}
                /*
                    The document to change in the backend has matricule: e.target.id
                    and it should be updated with the object: this.state.editableObject
                    the new element to add in the coordo collection is: coordoUploadObject

    
                    Both should be created in a transaction (the update and the creation of the new coordo)
                    After having updated these field, fetch the personnel data back to the redux state so the interface can refresh
                */
            }else if(this.state.editableObject.role==='coordonateur' && this.state.newCoordoClass==='')alert('Invalid filiere.\nhoose a filiere and for the newly created coordo')
            else{
                /*
                    The document to change in the backend has matricule: e.target.id
                    and it should be updated with the object: this.state.editableObject

                    After having updated these field, fetch the personnel data back to the redux state so the interface can refresh
                */
            }

            this.handleEditCancel()

            alert('Saved the Changes made to the personnel with matricule: '+e.target.id)
        }
    }

    handleEditCancel=()=>{
        this.setState({editableObject:{}, inEditableState:'', newCoordoClass:''})
    }

    displayPersonnelList=()=>{
        let key=0
        let personnelList=this.sortPersonnelWRTRoleAndName()
        return personnelList.map(personnel=>{
            return this.state.inEditableState!==personnel.matricule?(
            <div className="personnel" key={++key} >
                <span className='managePersonnelIndex'>{key}</span>
                <span className='managePersonnelMatricule'>{personnel.matricule}</span>
                <span className='managePersonnelNom'>{personnel.nom}</span>
                <span className='managePersonnelPrenom'>{personnel.prenom}</span>
                <span className='managePersonnelMail'>{personnel.mail}</span>
                <span className='managePersonnelTel'>{personnel.tel}</span>
                <span className='managePersonnelRole'>{personnel.role}</span>
                <input type='button' value='Edit' id={personnel.matricule} onClick={this.handlePersonnelEdit} className='managePersonnelActionBtnEdit' />
                <input type='button' value='Delete' onClick={()=>this.handlePersonnelDelete(personnel.matricule)} className='managePersonnelActionBtnDelete' /> 
            </div>
            ):(
            <div className="personnel" key={++key} >
                <span className='managePersonnelIndex'>{key}</span>
                <span className='managePersonnelMatricule'>{personnel.matricule}</span>
                <span className='managePersonnelNom'>{personnel.nom}</span>
                <span className='managePersonnelPrenom'>{personnel.prenom}</span>
                <input type='email' className='managePersonnelEditable' id='managePersonnelMail' value={this.state.editableObject.mail} onChange={this.handleEditChange} />
                <input type='text' className='managePersonnelEditable' id='managePersonnelTel' value={this.state.editableObject.tel} onChange={this.handleEditChange} />
                <select id='managePersonnelRole' onChange={this.handleEditChange}>
                    {this.props.roles.map(role=>{
                        if(role.nomRole!=='secretaire'){
                            return <option key={role.nomRole}>{role.nomRole}</option>
                        }return null
                    })}
                </select>
                {this.state.editableObject.role==='coordonateur'?(
                    <select id='newCoordoClass' onChange={this.handleEditChange}>
                        {
                            this.props.faculties.map(faculty=>(
                                <optgroup key={faculty.nomFaculty} label={faculty.nomFaculty}>
                                    {faculty.filieres.map(filiere=><option key={filiere.nomFiliere}>{filiere.nomFiliere}</option>)}
                                </optgroup>
                            ))
                        }
                    </select>
                ):null}
                <input type='button' value='Save' id={personnel.matricule} onClick={this.handleEditSave} className='managePersonnelActionBtnSave' />
                <input type='button' value='Cancel' onClick={this.handleEditCancel} className='managePersonnelActionBtnCancel' /> 
            </div>
            )
        })
    }

    handleChangeNewPersonnel=(e)=>{
        let tempObj={}
        switch(e.target.id){
            case 'newPersonnelMatricule':
                tempObj={...this.state.newPersonnel, matricule:e.target.value}
                this.setState({newPersonnel:tempObj})
                break;
            case 'newPersonnelNom':
                tempObj={...this.state.newPersonnel, nom:e.target.value}
                this.setState({newPersonnel:tempObj})
                break;
            case 'newPersonnelPrenom':
                tempObj={...this.state.newPersonnel, prenom:e.target.value}
                this.setState({newPersonnel:tempObj})
                break;
            case 'newPersonnelMail':
                tempObj={...this.state.newPersonnel, mail:e.target.value}
                this.setState({newPersonnel:tempObj})
                break;
            case 'newPersonnelTel':
                tempObj={...this.state.newPersonnel, tel:e.target.value}
                this.setState({newPersonnel:tempObj})
                break;
            case 'newPersonnelRole':
                tempObj={...this.state.newPersonnel, role:e.target.value}
                this.setState({newPersonnel:tempObj})
                break;
            case 'newPersonnelCoordoClass':
                this.setState({newPersonnelCoordoClass:e.target.value})
                break;
            default:
                break;
        }
    }
    timetables=[
        {classe:'IRT 1', timetable:{}},
        {classe:'IRT 2', timetable:{}},
        {classe:{idClasse:1, classe:'IRT 3'}, timetable:{}},
    ]

    handleCreerClick=(e)=>{
        e.preventDefault()
        if(this.state.newPersonnel.matricule!=='' && this.state.newPersonnel.nom!=='' && this.state.newPersonnel.prenom!=='' && this.state.newPersonnel.mail!=='' && this.state.newPersonnel.tel!=='' && this.state.newPersonnel.role!==''){
          if(this.state.newPersonnel.role==='coordonateur' && this.state.newPersonnelCoordoClass!==''){
              
            let coordoClasses = this.props.classes.filter(classe=>classe.filiere.nomFiliere===this.state.newPersonnelCoordoClass)
            
            /*
                I've prepared the timetables array in the format you requested for(using the id's ).
                so this particular one is not to be modified for the id
            */
            let timetables=this.props.classes.map(classe=>{
                if(classe.filiere.nomFiliere === this.state.newPersonnelCoordoClass){
                    let classeObject = {classe:{idClasse:classe.idClasse, classe:classe.nomFiliere.filiere+' '+classe.niveau}, timetable:{}}
                    return classeObject
                }else return null
            })

            let CoordoUploadObject={matriculePersonnel:this.state.newPersonnel.matricule, classes:coordoClasses, timetables:timetables}
            /*
                The object to be created in the personnel collection is: this.state.newPersonnel
                The object to be created in the coordonateur collection is:coordoUploadObject
                
                Both should be created in a transaction
                After the creation, fetch data back to the redux state so that the interface can refresh
            */
           console.log(this.state.newPersonnel)
           console.log(CoordoUploadObject)
           this.setState({openNewPersonnel:false, newPersonnel:{matricule:'', nom:'', prenom:'', mail:'', tel:'', role:''}, newPersonnelCoordoClass:''})
        }
        else if(this.state.newPersonnel.role==='coordonateur' && this.state.newPersonnelCoordoClass==='')alert('Choisir une classe pour le nouveau coordonateur')
        else{
            /*
            The object to be created in the personnel collection is: this.state.newPersonnel
            */
           console.log(this.state.newPersonnel)
           this.setState({openNewPersonnel:false, newPersonnel:{matricule:'', nom:'', prenom:'', mail:'', tel:'', role:''}, newPersonnelCoordoClass:''})
        }
       }else alert('Enter all the data to create a coordo.\nDetected presence of some empty fields.')
    }

    handleCreerCancel=()=>{
        this.setState({openNewPersonnel:false, newPersonnel:{matricule:'', nom:'', prenom:'', mail:'', tel:'', role:''}})
    }

    enableCreation=(e)=>{
        if(this.state.openNewPersonnel===false){
            this.setState({openNewPersonnel:true})
        }else alert('finish creating the current element or cancel the creation')
    }

    addNewPersonnel=()=>{
        return (
            <div className="newPersonnelCreationPane">
                {this.state.openNewPersonnel?(
                <form className='newPersonnelForm' onSubmit={this.handleCreerClick}>
                    <span className='managePersonnelIndex'>{this.props.personnels.length+1}</span>
                    <input className='newPersonnelInput' id='newPersonnelMatricule' onChange={this.handleChangeNewPersonnel} value={this.state.newPersonnelMatricule} />
                    <input className='newPersonnelInput' id='newPersonnelNom' onChange={this.handleChangeNewPersonnel} value={this.state.newPersonnelMatricule} />
                    <input className='newPersonnelInput' id='newPersonnelPrenom' onChange={this.handleChangeNewPersonnel} value={this.state.newPersonnelMatricule} />
                    <input className='newPersonnelInput' id='newPersonnelMail' onChange={this.handleChangeNewPersonnel} value={this.state.newPersonnelMatricule} />
                    <input className='newPersonnelInput' id='newPersonnelTel' onChange={this.handleChangeNewPersonnel} value={this.state.newPersonnelMatricule} />
                    <select id='newPersonnelRole' onChange={this.handleChangeNewPersonnel}>
                        {this.props.roles.map(role=>{
                            if(role.nomRole!=='secretaire'){
                                return <option key={role.nomRole}>{role.nomRole}</option>
                            }return null
                        })}
                    </select>
                    {this.state.newPersonnel.role==='coordonateur'?(
                        <select id='newPersonnelCoordoClass' onChange={this.handleChangeNewPersonnel}>
                            {
                                this.props.faculties.map(faculty=>(
                                    <optgroup key={faculty.nomFaculty} label={faculty.nomFaculty}>
                                        {faculty.filieres.map(filiere=><option key={filiere.nomFiliere}>{filiere.nomFiliere}</option>)}
                                    </optgroup>
                                ))
                            }
                        </select>
                    ):null}
                    <input type='submit' value='Creer' id={this.state.newPersonnel.matricule} onClick={this.handleCreerClick} className='createPersonnelActionBtnCreer' />
                    <input type='button' value='Cancel' onClick={this.handleCreerCancel} className='createPersonnelActionBtnCancel' />
                </form>):null}
                <div className="newPersonnelOpening" onClick={this.enableCreation}>
                    <i className='fa fa-plus-circle' id='enableCreateNewPersonnel' />
                    <span className='newPersonnelPhrase'>Nouveau personnel</span>
                </div>
            </div>
        )
    }

    personnelListHeader=()=>(
        <div className='displayPersonnelListHeader'>
            <span className='displayPersonnelListHeaderElement'>No</span>
            <span className='displayPersonnelListHeaderElement'>Matricule</span>
            <span className='displayPersonnelListHeaderElement'>Nom</span>
            <span className='displayPersonnelListHeaderElement'>Prenom</span>
            <span className='displayPersonnelListHeaderElement'>Email</span>
            <span className='displayPersonnelListHeaderElement'>Telephone</span>
            <span className='displayPersonnelListHeaderElement'>Role</span>
            <span className='displayPersonnelListHeaderElement'>ACTIONS</span>
        </div>
    )

    render() {
        return (
            <div>
                {this.personnelListHeader()}
                {this.displayPersonnelList()}
                {this.addNewPersonnel()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        personnels: state.Personnel.personnels,
        faculties: state.Faculty.faculties,
        roles: state.Role.roles,
        classes: state.Classe.classes
    }
}

export default  connect(mapStateToProps)(ManagePersonnel)