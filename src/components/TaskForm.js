import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { TextField, Button, Box, FormControlLabel, Checkbox } from '@mui/material';

const TaskForm = ({ task, onSubmit }) => {
    const { createTask, currentTask, setCurrentTask, updateTask } = useContext(TaskContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setCompleted(task.completed);
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskData = { title, description, completed };
        if (task) {
            updateTask(task._id, taskData);
        } else {
            createTask(taskData);
        }
        setTitle('');
        setDescription('');
        setCompleted(false);
    };

    return (
        <Box mt={2}>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                            color="primary"
                        />
                    }
                    label="Completed"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    {task ? 'Update Task' : 'Create Task'}
                </Button>
            </form>
        </Box>
    );
};

export default TaskForm;