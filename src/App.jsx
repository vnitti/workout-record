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
        console.log(routine.exercises);
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

            {/* Display routines if it's true*/}
            {routines && (
                <div>
                    {routines.map((rou) => (
                        <li key={nanoid()} className="routine-container">
                            <h2>{rou.name}</h2>
                            <div>
                                {rou.exercises.map((exe) => (
                                    <li key={nanoid()} className="exercise-container">
                                        {exe.name}
                                    </li>
                                ))}
                            </div>
                        </li>
                    ))}
                </div>
            )}
        </>
    );
}

export default App;