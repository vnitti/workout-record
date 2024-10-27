import { useState } from 'react';
import SubmitRoutine from './SubmitRoutine';
import './App.css';

function App() {
    const [showFormRoutine, setShowFormRoutine] = useState(false);
    const [routineData, setRoutineData] = useState(null);

    // Toggle form visibility
    function handleToggleForm() {
        setShowFormRoutine(prevShowForm => !prevShowForm);
    }

    // Handle receiving routine data from SubmitRoutine
    function handleRoutineSubmit(routine) {
        //console.log(routine)
        setRoutineData(routine);
        setShowFormRoutine(false); // Hide form after submission
        //console.log("end of handleRoutineSubmit()")
        //console.log(routine ? "routine true!" : "routine false!")
    }

    return (
        <>
            <h1>Workout Record</h1>
            <button id="add-routine-btn" onClick={handleToggleForm}>
                Add Routine
            </button>

            {/* If showFormRoutine is truthy, the SubmitRoutine component will be displayed.
            The attribute onSubmitRoutine={handleRoutineSubmit} is there so App.jsx can receive
            data from SubmitRoutine.jsx, such as routine name and the exercises data*/}
            {showFormRoutine && <SubmitRoutine onSubmitRoutine={handleRoutineSubmit} />}

            {/* Display submitted routine if routineData becomes truthy, meaning, it received
            data from SubmitRoutine.jsx */}
            {routineData && (
                <div>
                    <h2>Routine: {routineData.name}</h2>
                    <ul>
                        {routineData.exercises.map((exercise, index) => (
                            <li key={index}>
                                {exercise.name} - {exercise.type}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default App;

