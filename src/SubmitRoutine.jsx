import { useState } from 'react';
import { nanoid } from "nanoid";
import SubmitExercise from './SubmitExercise';

function SubmitRoutine({ onSubmitRoutine }) {
    const [routineName, setRoutineName] = useState('');
    const [exercises, setExercises] = useState([]);
    const maxExerciseLength = 12;

    /**
        Update routine name
    */
    function handleRoutineNameChange(event) {
        setRoutineName(event.target.value);
    }

    /**  
        Add a new exercise (object) to the exercises array
    */
    function handleAddExercise() {
        // Set a max number of exercises per routine
        if (exercises.length < maxExerciseLength) {
            setExercises(prevExercises => [...prevExercises, { name: '', id: nanoid(), type: '' }]);
        } else {
            alert(`You can set a maximum of ${maxExerciseLength} exercises per routine.`);
        }
    }

    /** 
        Updates every property of every exercise object inside the array exercises
        every time the user changes their name or type input values. 
    */
    /*
        In React, state must be updated immutably. So instead of modifying the existing
        exercises array directly, a new array is created using .map(), and then React updates
        the state using setExercises.
    */
    function handleExerciseChange(exerciseid, newExercise) {
        console.log("=====================")
        console.log("id: ", exerciseid);
        console.log("newExercise: ", newExercise);
        console.log("=====================");
        const updatedExercises = exercises.slice();
        updatedExercises[exerciseid] = newExercise;
        setExercises(updatedExercises);
        console.log("exercises array: ", exercises);
    };

    /**
        Handle form submission and pass routine data to parent
    */
    function handleSubmit(event) {
        event.preventDefault(); // Prevent form from reloading the page
        
        // We create the object routine, with its name and the exercises array
        const routineData = {
            name: routineName,
            exercises: exercises
        };
        
        /*
        Checks if either type or name of the exercises inside routineData are empty.
        If they are, they become truthy.
        */
        let hasEmptyExerciseName = routineData.exercises.some(exe => exe.name === "");
        let hasEmptyExerciseType = routineData.exercises.some(exe => exe.type === "");

        // If the name of routineData is empty, it won't let the routine to be submitted
        if (routineData.name === "") {
            alert("Please enter a name for your routine.");
        } else if (hasEmptyExerciseName) {
            alert("Please enter a name for all of your exercises.")
        } else if (hasEmptyExerciseType){
            alert("Please select a type for all of your exercises.")
        } else {
            onSubmitRoutine(routineData); // Pass the data up to the parent (App.jsx)
        };
        hasEmptyExerciseName = false;
        hasEmptyExerciseType = false;
    };

    return (
        <>
            <form className="submit-routine-form" onSubmit={handleSubmit}>
                <label htmlFor="name-routine">Routine Name:</label>
                <input
                    id="name-routine"
                    type="text"
                    value={routineName}
                    onChange={handleRoutineNameChange}
                />

                <br />
                <br />

                {/* Render all exercises from the state.
                In React, it's better to display things using map() instead of loops like for
                or foreach since these are imperative and map() is declarative. Also, map is
                idiomatic- it's the way it's worked in react. */}
                
                {exercises.map((exercise, index) => (
                    /* Besides key, we create other two props, exerciseNumber and onExerciseChange that
                    will be passed to SubmitExercise.jsx.
                    */
                    <SubmitExercise
                        key={exercise.id}
                        exerciseNumber={index}
                        onExerciseChange={(newExercise) => handleExerciseChange(index, newExercise)
                        /* handleExerciseChange accepts two arguments, index which is the position of
                        that exercise in the exercises array, and newExercise which is the exercise object
                        passed up, which contains its name and type.
                        */}
                    />
                ))}
                
                <button type="button" onClick={handleAddExercise}>Add Exercise</button>

                <br />
                <br />
                {/* When the form is submitted, routine name and the exercises array are sent back
                to App.jsx */}
                <button type="submit">Submit Routine</button>
                {/*console.log("exercises array: "+exercises)*/}
            </form>
        </>
    );
}

export default SubmitRoutine;