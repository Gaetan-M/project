import { combineReducers } from 'redux'

import BatimentReducer from './BatimentReducer';
import ClasseReducer from './ClasseReducer';
import CoordonateurReducer from './CoordonateurReducer';
import CoursReducer from './CoursReducer';
import EtudiantReducer from './EtudiantReducer';
import EvaluationReducer from './EvaluationReducer';
import FacultyReducer from './FacultyReducer';
import ForumReducer from './ForumReducer';
import ModuleReducer from './ModuleReducer';
import NoteReducer from './NoteReducer';
import PersonnelReducer from './PersonnelReducer';
import RoleReducer from './RoleReducer';
import TeacherReducer from './TeacherReducer';
import TimetableReducer from './TimeTableReducer';
import TroncCommunReducer from './TroncCommunReducer';
import TypeEvaluationReducer from './TypeEvaluationReducer';
import TypeQuestionReducer from './TypeQuestionReducer';

const rootReducer = combineReducers({
    Batiment:BatimentReducer,
    Classe: ClasseReducer,
    Coordonateur: CoordonateurReducer,
    Cour: CoursReducer,
    Etudiant: EtudiantReducer,
    Evaluation: EvaluationReducer,
    Faculty: FacultyReducer,
    Forum: ForumReducer,
    Module: ModuleReducer,
    Note: NoteReducer,
    Personnel: PersonnelReducer,
    Role: RoleReducer,
    Teacher: TeacherReducer,
    Timetable: TimetableReducer,
    TroncCommun: TroncCommunReducer,
    TypeEvaluation: TypeEvaluationReducer,
    TypeQuestion: TypeQuestionReducer
})

export default rootReducer