import { useState } from 'react';
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from 'react-redux';
import { addRoutine } from './redux/routineSlice';
import SubmitRoutine from './SubmitRoutine';
import './App.css';

function App() {
    const [showFormRoutine, setShowFormRoutine] = useState(false);
    //const [routines, setRoutines] = useState([]);
    const addRoutineBtnName = showFormRoutine ? "Cancel" : "Add Routine";

    /**
     * We access to the store, finds the routine slice and then to the routines array inside it.
     */
    const routines = useSelector((state) => state.routine.routines);
    const dispatch = useDispatch(); // To be able to dispatch our routines



    // Toggle form visibility
    function handleToggleForm() {
        setShowFormRoutine(prevShowForm => !prevShowForm);
    }

    // Handle receiving routine data from SubmitRoutine
    function handleRoutinesChange(routine) {
        /*
        const updatedRoutines = routines;
        updatedRoutines.push(routine);
        setRoutines(updatedRoutines);
        console.log("routines: ", routines);
        console.log(routine.exercises);
        */
        dispatch(addRoutine(routine)); // Triggers the action (send the routine data to the store)
        setShowFormRoutine(false); // Hide form after submission
        console.log("routines array: ", routines);
    }

    return (
        <>
            <h1>Workout Record</h1>
            <h2>v1.4</h2>
            {/* If showFormRoutine is truthy, the SubmitRoutine component will be displayed.
            The attribute onSubmitRoutine={handleRoutinesChange} is there so App.jsx can receive
            data from SubmitRoutine.jsx, such as routine name and the exercises data*/}
            {showFormRoutine && <SubmitRoutine onSubmitRoutine={handleRoutinesChange} />}
            {console.log("routines from selector: ", routines)}
            {/* Display routines if it's an array with more than 0 positions*/}
            {Array.isArray(routines) && routines.length > 0 && (
                <ul className="routines-list" key="ul-routines"> 
                    {routines.map((rou) => (
                        <li key={nanoid()} className="routine-container">
                            <h2>{rou.name}</h2>
                            <ul key="ul-exercises">
                                {rou.exercises.map((exe) => (
                                    <li key={nanoid()} className="exercise-container">
                                        <span>Name: {exe.name} </span>
                                        <span> --- </span> 
                                        <span>Type: {exe.type}</span>
                                    </li>
                                ))}
                            </ul>
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