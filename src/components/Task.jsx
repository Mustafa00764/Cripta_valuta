// components/Task.js
import React, { useState } from 'react';

const Task = ({ task, checkCompletion }) => {
    const [completed, setCompleted] = useState(false);

    const handleCheck = async () => {
        const isCompleted = await checkCompletion(task);
        setCompleted(isCompleted);
    };

    return (
        <div className="border rounded p-4 mb-4">
            <h3 className="font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <button
                onClick={handleCheck}
                className="bg-blue-500 text-white p-2 mt-4"
            >
                Проверить выполнение
            </button>
            {completed && <p className="text-green-500 mt-2">Задание выполнено!</p>}
        </div>
    );
};

export default Task;
