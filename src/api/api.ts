import axios from 'axios'

const API_URL = 'https://67ea985d34bcedd95f63fb14.mockapi.io'

export const getProjects = async (): Promise<Project[]> => {
  const response = await axios.get(`${API_URL}/projects`)
  return response.data as Project[]
}

export const createProject = async (project: ProjectDto): Promise<Project> => {
  const response = await axios.post(`${API_URL}/projects`, project)
  return response.data as Project
}

export const updateProject = async (project: Project, projectId: string): Promise<Project> => {
  const response = await axios.put(`${API_URL}/projects/${projectId}`, project)
  return response.data
}

export const deleteProject = async (projectId: string): Promise<Project> => {
  const response = await axios.delete(`${API_URL}/projects/${projectId}`)
  return response.data
}

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_URL}/tasks`)
  return response.data as Task[]
}

export const createTask = async (task: TaskDto): Promise<Task> => {
  const response = await axios.post(`${API_URL}/tasks`, task)
  return response.data as Task
}
