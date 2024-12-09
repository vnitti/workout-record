import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function SubmitRecord({rou}) {

    return (
        <>
            <div className="popup-overlay">
                <div className="popup-content">
                    <h2>Add Record</h2>
                    <ul>
                        {console.log("rou: ", rou)}
                        {console.log("rou.exercises: ", rou.exercises)}
                        {rou.exercises.map((exe) => (
                            <li key={exe.name}>
                                <div className='exercise-container'>
                                    <h3>{exe.name}</h3>
                                    <form>
                                        <span>Current weight: </span>
                                        <span>{exe.weight}</span>
                                        <br />
                                        <label htmlFor='new-record-weight'>New weight: </label>
                                        <input id='new-record-name' type="text" />
                                    </form>
                                </div>         
                            </li>
                        ))}
                    </ul>
                    <button type="submit" className='btn-add-exercise'>Save Record</button>
                </div>
            </div>
        </>
    )
}

export default SubmitRecord;