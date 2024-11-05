import { useState } from 'react';
import { nanoid } from "nanoid";
import SubmitRoutine from './SubmitRoutine';
import './App.css';

function App() {
    const [showFormRoutine, setShowFormRoutine] = useState(false);
    const [routines, setRoutines] = useState([]);

    // Toggle form visibility
    function handleToggleForm() {
        setShowFormRoutine(prevShowForm => !prevShowForm);
    }

    // Handle receiving routine data from SubmitRoutine
    function handleRoutinesChange(routine) {
        const updatedRoutines = routines;
        updatedRoutines.push(routine);
        setRoutines(updatedRoutines);
        console.log("routines: ", routines);
        setShowFormRoutine(false); // Hide form after submission
    }

    return (
        <>
            <h1>Workout Record</h1>
            <button id="add-routine-btn" type="button" onClick={handleToggleForm}>
                Add Routine
            </button>

            {/* If showFormRoutine is truthy, the SubmitRoutine component will be displayed.
            The attribute onSubmitRoutine={handleRoutinesChange} is there so App.jsx can receive
            data from SubmitRoutine.jsx, such as routine name and the exercises data*/}
            {showFormRoutine && <SubmitRoutine onSubmitRoutine={handleRoutinesChange} />}

            {/* Display routines if it's an initialized array*/}
            {Array.isArray(routines) && (
                <div>
                    {routines.map((rou) => (
                        <li key={nanoid()}>
                            {rou.name}
                        </li>
                    ))}
                </div>
            )}
        </>
    );
}

export default App;

/*

<h2>Routine: {routineData.name}</h2>
                    <ul>
                        {routineData.exercises.map((exercise, index) => (
                            <li key={exercise.id}>
                                {exercise.name} - {exercise.type}
                            </li>
                        ))}
                    </ul>







                    
*/

