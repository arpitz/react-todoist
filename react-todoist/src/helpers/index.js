import { collatedTasks } from '../constants'

export const collatedTasksExist = selectedProject => 
collatedTasks.find(task => task.key === selectedProject);

export const getTitle = (projects, projectId) => 
projects.find(project => project.projectId === projectId);

export const getCollatedTitle = (tasks, selectedProject) => 
tasks.find(task => task.key === selectedProject);