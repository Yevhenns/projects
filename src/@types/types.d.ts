type Status = 'todo' | 'in_progress' | 'done'

type Assignees = 'Микола' | 'Іринка' | 'Свирид'

type Task = {
  id: string
  title: string
  assignee: Assignees
  status: Status
  deadline: string
  projectId: Project['id']
}

type TaskDto = Omit<Task, 'id'>

type Project = {
  id: string
  title: string
  status: Status
  createdAt: string
  description: string
  tasks: Task['id'][]
}

type ProjectDto = Omit<Project, 'id'>
