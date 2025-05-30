import { useState } from 'react';
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from 'react-redux';
import { addRoutine } from './redux/routineSlice';
import SubmitRoutine from './SubmitRoutine';
import SubmitRecord from './SubmitRecord';
import './App.css';

function App() {
    const [showFormRoutine, setShowFormRoutine] = useState(false);
    const [showFormRecord, setShowFormRecord] = useState(false);
    //const [routines, setRoutines] = useState([]);
    const addRoutineBtnName = showFormRoutine ? "Cancel" : "Add Routine";

    /** We access to the store, finds the routine slice and then to the routines array inside it. */
    const routines = useSelector((state) => state.routine.routines);
    const dispatch = useDispatch(); // To be able to dispatch our routines

    /** Toggle form visibility */     
    function handleToggleForm() {
        setShowFormRoutine(prevShowForm => !prevShowForm);
    };

    /** Handle receiving routine data from SubmitRoutine */
    function handleRoutinesChange(routine) {
        /*
        const updatedRoutines = routines;
        updatedRoutines.push(routine);
        setRoutines(updatedRoutines);
        console.log("routines: ", routines);
        console.log(routine.exercises);
        */
        dispatch(addRoutine(routine)); // Triggers the action (sends the routine data to the store)
        setShowFormRoutine(false); // Hide form after submission
    };

    function handleToggleRecordForm() {
        setShowFormRecord(prevState => !prevState)
    };

    return (
        <>
            <h1>Workout Record</h1>
            <h2>v1.4</h2>
            {/* If showFormRoutine is truthy, the SubmitRoutine component will be displayed.
            The attribute onSubmitRoutine={handleRoutinesChange} is there so App.jsx can receive
            data from SubmitRoutine.jsx, such as routine name and the exercises data*/}
            {showFormRoutine && <SubmitRoutine
                onSubmitRoutine={handleRoutinesChange}
            />}
            {/* Display routines if it is an array with more than 0 positions*/}
            {Array.isArray(routines) && routines.length > 0 && (
                <ul className="routines-list" key="ul-routines"> 
                    {routines.map((rou) => (
                        <li key={nanoid()} className="routine-container">
                            <h2>{rou.name}</h2>
                            <ul key="ul-exercises">
                                {rou.exercises.map((exe) => (
                                    <li key={nanoid()} className="exercise-container">
                                        <div className='exercise-rendered'>
                                            <span className='exercise-name'>{exe.name} </span>
                                            <span>Type: </span><span className='exercise-data'>{exe.type}</span>
                                            <span>Weight: </span><span className='exercise-data'>{exe.weight}</span>
                                            <span>Reps: </span><span className='exercise-data'>{exe.reps}</span>
                                            <span>Sets: </span><span className='exercise-data'>{exe.sets}</span>
                                            <span>Notes: </span><span className='exercise-notes'>{exe.exeNotes}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <button type="button" className='btn-green' onClick={handleToggleRecordForm}>Add Record</button>
                            { showFormRecord && < SubmitRecord rou={rou} /> }
                        </li>
                    ))}
                </ul>
            )}
            <button id="add-routine-btn" type="button" onClick={handleToggleForm}>
                {addRoutineBtnName}
            </button>
        </>
    );
}

export default App;