require('dotenv').config()
import express from 'express';
import {getCompletedTasksAndEmailThem} from './lib/tasks';

const app = express();

app.get('/completed-task', async(req,res,next) => {

    res.send("Tasks script is running");
    getCompletedTasksAndEmailThem();
});


app.listen(process.env.PortNo, () => {
    console.log("Site Is Running");
});




//   email().catch(console.error);