import React, { useContext, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';
import { List, ListItem, ListItemText, IconButton, Button, Typography, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

const TaskList = ({tasks}) => {
    const { markTaskAsCompleted, editTask, deleteTask } = useContext(TaskContext);

    // useEffect(() => {
    //     fetchTasks();
    // }, [fetchTasks]);

    return (
        <div>
            <h2>Your Tasks</h2>
            <List>
                {tasks && tasks.length > 0 ? (tasks.map(task => (
                    <ListItem key={task._id} divider>
                        <ListItemText
                            primary={
                                <Typography
                                    variant="body1"
                                    style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                                >
                                    {task.title}
                                </Typography>
                            }
                            secondary={task.description}
                        />
                        <Checkbox
                            checked={task.completed}
                            onChange={() => markTaskAsCompleted(task)}
                        />
                        {/* <IconButton edge="end" aria-label="complete" onClick={() => markTaskAsCompleted(task._id)}>
                            <CheckIcon />
                        </IconButton> */}
                        <IconButton edge="end" aria-label="edit" onClick={() => editTask(task)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(task._id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))): (
                    <Typography variant="body1">No tasks available</Typography>
                )}
            </List>
        </div>
    );
};

export default TaskList;