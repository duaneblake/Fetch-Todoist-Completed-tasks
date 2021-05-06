import axios from 'axios';
import {parseISO, subDays, format} from 'date-fns';
import {email} from './email';
import {rollbar} from './rollbar';
import { completedMesssage } from "./completed-message";

export async function getCompletedTasksAndEmailThem() {

    const todoistDateFormat = "yyyy-MM-dd'T'HH:mm:ss'Z'";
    const untill = format(new Date(), todoistDateFormat);
    //How many days for the completion period
    const since = format(subDays(parseISO(untill), process.env.PeriodOfTimeToFetch), todoistDateFormat);
    const endpoint = 'https://api.todoist.com/sync/v8/completed/get_all';

    const emailConfig = {
        from: process.env.EmailFromAddress, 
        to: process.env.EmailToAddress, 
        subject: "Task completed this week",
        tasks : {},
        completedMesssage
    };

    await axios.post(`${endpoint}?since=${since}&until=${untill}`, {
        token : process.env.TodoistToken
    })
    .then((response) => {
        // console.log(response.data.items);
        console.log("Fetched tasks");;
        emailConfig.tasks = response.data.items;
        emailConfig.html = completedMesssage(emailConfig.tasks);
        // console.log(emailConfig.tasks);;
        email(emailConfig).catch(rollbar.log(console.error));
        console.log("Sent Emails");;

        // return tasks;
    }, (error) => {
        rollbar.log(error);
    });

}