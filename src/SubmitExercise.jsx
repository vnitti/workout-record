import { useState } from 'react';

function SubmitExercise({ exerciseNumber, onExerciseChange, onDeleteExercise, id }) {
    const [exerciseName, setExerciseName] = useState('');
    const [exerciseType, setExerciseType] = useState('');
    const [exerciseWeight, setExerciseWeight] = useState('');

    // Handles name and type changes and pass data up to the parent
    /* Since it is attached to the handle event onChange, these two functions will be
    triggered every time the user changes the value of the inputs of name and type of the
    exercise */
    function handleExeNameChange(event) {
        const newName = event.target.value;
        setExerciseName(newName);
        onExerciseChange({ name: newName, type: exerciseType });
    }

    function handleTypeChange(event) {
        const newType = event.target.value;
        setExerciseType(newType);
        onExerciseChange({ name: exerciseName, type: newType });
    }

    function handleDeleteExercise(id) {
        onDeleteExercise(id);
    }

    return (
        <div className="new-exercise">
            {/* We don't use a form for these inputs since HTML doesn't allow nested forms.
            The one form tag will be in SubmitRoutine.jsx. Plus, we don't require a form
            these inputs to work */}

            {/* exerciseNumber is a property of the prop object that was passed from
                SubmitRoutine.jsx to SubmitExercise.jsx. It is there to identify every new
                exercise that's being added and it uses the index of the positions of
                the exercises array (+ 1) to create it*/}
            <label htmlFor={`name-exercise-${exerciseNumber}`}>Exercise Name:</label>
            <input
                id={`name-exercise-${exerciseNumber}`}
                type="text"
                value={exerciseName}
                onChange={handleExeNameChange}
            />

            <label htmlFor={`type-exercise-${exerciseNumber}`}>Type:</label>
            <select
                id={`type-exercise-${exerciseNumber}`}
                value={exerciseType}
                onChange={handleTypeChange}
            >
                <option value="" disabled>Select a type</option>
                <option value="Strength (1-5 reps)">Strength (1-5 reps)</option>
                <option value="Hypertrophy (6-12 reps)">Hypertrophy (6-12 reps)</option>
                <option value="Standard (8-15 reps)">Standard (8-15 reps)</option>
                <option value="Endurance (12-20 reps)">Endurance (12-20 reps)</option>
            </select>

            <button type='button' className='btn-x' onClick={() => handleDeleteExercise(id)}>X</button>
        </div>
    );
}

export default SubmitExercise;
