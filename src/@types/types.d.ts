type Status = 'todo' | 'in_progress' | 'done'

type Task = {
  id: string
  title: string
  assignee: 'string'
  status: Status
  deadline: string
  projectId: string
}

type TaskDto = Omit<Task, 'id'>

type Project = {
  id: string
  title: string
  status: Status
  createdAt: string
  description: string
  tasks: taskId[]
}

type ProjectDto = Omit<Project, 'id'>
