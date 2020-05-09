import React from 'react'
import { Checkbox } from './Checkbox';
import { useTasks } from '../hooks';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import { collatedTasksExist, getCollatedTitle, getTitle } from '../helpers';
import { collatedTasks } from '../constants';

export const Tasks = () => {

  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);

  let projectName = '';

  if(projects && selectedProject && !collatedTasksExist(selectedProject)){
    projectName = getTitle(projects, selectedProject).name;
  }

  if(collatedTasksExist(selectedProject) && selectedProject){
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>
      <ul className="tasks__list">
        {tasks.map(task => (
          <li key={task.id}>
            <Checkbox id={task.id} />
            <span>
              {task.task}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}