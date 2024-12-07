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
        Add a new exercise (object) to the exercises array. We create an assign an id for each one
        of the exercises declared here using nanoid(). The other twp properties, name and type,
        are declared empty but will be filled with the handleExerciseChange() function.
    */
    function handleAddExercise() {
        // Set a max number of exercises per routine
        if (exercises.length < maxExerciseLength) {
            setExercises(prevExercises => {
                const updatedExercises = [...prevExercises, { id: nanoid(), name: '', type: '', weight: '', reps: '', sets: '', notes: '' }];
                console.log("Updated exercises array: ", updatedExercises);
                return updatedExercises;
            });
        } else {
            alert(`You can set a maximum of ${maxExerciseLength} exercises per routine.`);
        };
    }

    /** 
        Updates name and type properties of each of the exercise objects inside the array exercises
        every time the user changes their name or type input values. 
    */
    /*
        In React, state must be updated immutably. So instead of modifying the existing
        exercises array directly, a new array is created using .map(), and then React updates
        the state using setExercises.
    */
    function handleExerciseChange(exerciseid, newExercise) {
        /* exerciseid is the id created in this component and assigned to each of the renderized
        SubmitExercise components*/
        /**
         * This line takes the id of every position of the exercises array and compares it to the id of the
         * exercise we are currently modifying (changing name or type). Once it's found, it returns the
         * index of that exercise.
         */
        const exerciseIndex = exercises.findIndex(exercise => exercise.id === exerciseid);
        console.log("exerciseIndex: ", exerciseIndex);

        //We needed the previous index to know which exercise will be modified, so we can update our state.
        const updatedExercises = [...exercises]; //we create a copy of exercises array
        updatedExercises[exerciseIndex] = {
            ...updatedExercises[exerciseIndex], // Mantiene las propiedades actuales (incluyendo id)
            name: newExercise.name, // Updates the name
            type: newExercise.type  // Updates the type
        };
        setExercises(updatedExercises); //then we update the state immutably
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

        console.log("routineData.exercises inside handleSubmit()", routineData.exercises);

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

    /**
     * Deletes an exercise form in the process of submitting a new routine
     */
    function deleteExercise(id) {
        console.log("id of exercise deleted: ", id)
        const updatedExercises = exercises.filter((exe) => exe.id !== id);
        setExercises(updatedExercises);
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
                {/*value is the value just typed in the input field. Every time this value changes,
                handleRoutineNameChange() is triggerd, and every time it is triggered, setRoutineName() is
                triggered, receiving the new name to be updated, and this new name is the value
                attribute of the input. */}

                <br />
                <br />

                {/* Render all exercises from the state.
                In React, it's better to display things using map() instead of loops like for
                or foreach since these are imperative and map() is declarative, which is
                idiomatic- it's the way it's worked in react. */}
                
                {exercises.map((exercise, index) => (
                    //Besides key, we create another four props that will be passed to SubmitExercise.jsx
                    //id is 
                    <SubmitExercise
                        key={exercise.id}
                        exerciseNumber={index}
                        onExerciseChange={(newExercise) => handleExerciseChange(exercise.id, newExercise)
                        /* Just in case: onExerciseChange is a prop passed to its child, SubmitExercise.jsx. It receives only one
                        argument from its child, which is newExercise. handleExerciseChange() is triggered every time
                        onExerciseChange is called in SubmitExercise.
                        */
                        /* handleExerciseChange accepts two arguments, exercise.id (which is already found inside SubmitRoutine.jsx)
                        to determine the position of that exercise in the exercises array,
                        and newExercise which is the exercise object passed up, which contains its name and type.
                        */
                       }
                       onDeleteExercise={() => deleteExercise(exercise.id)} //so the possibility of deleting the exercise is passed
                       id={exercise.id}
                    />
                ))}
                
                <button type="button" onClick={handleAddExercise}>Add Exercise</button>

                <br />
                <br />
                <br />
                
                {/* When the form is submitted, routine name and the exercises array are sent back
                to App.jsx */}

                <button type="submit">Submit Routine</button>
            </form>
        </>
    );
}

export default SubmitRoutine;