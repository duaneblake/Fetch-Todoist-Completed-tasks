require('dotenv').config()
import {formatDistanceToNow, parseISO} from 'date-fns';

export function completedMesssage(tasks) {
    const taskList =tasks.map(function(task)  {
        const taskItem = `<li><a href="https://todoist.com/app/task/${task.task_id}">${task.content}</a> completed <time timedate="${task.completed_date}">${formatDistanceToNow(parseISO(task.completed_date))}</time> ago</li>`;
        return taskItem;
    }).join('');

    const html = `
    <!DOCTYPE html>
      <html lang="en">

      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Weekly Tasks</title>
      </head>

      <body>
          <h1>Todoist tasks completed this week</h1>
          <p>Hi</p>
          <p>This week you completed ${tasks.length} tasks</p>
          <ul>
              ${taskList}
          </ul>
          <p>Well done keep up dude</p>
      </body>

      </html>
    `;

    return html;
}
