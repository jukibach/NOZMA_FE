interface IExerciseColumnResponse {
  id: number
  code: string
  name: string
  type: string
  isVisible: boolean
}

interface IExerciseRowResponse {
  [exerciseColumn: string]: string | boolean | string[] | undefined
  id: string
  name: string
  description?: string
  majorMuscle?: string
  mechanics?: string
  bodyRegion?: string
  laterality?: string
  isWeight?: boolean
  isCardio?: boolean
  isPlyo?: boolean
  equipments?: string[]
  movementPatterns?: string[]
  muscleGroup?: string[]
}

interface IExerciseTableResponse {
  columns: IExerciseColumnResponse[]
  rows: IExerciseRowResponse[]
  primaryColumnId: number
  totalRowCount: number
}

interface ApiResponse<T> {
  status: number | string | undefined
  code: string
  message: string
  result: T
}
interface IExercisePagePayload {
  pageIndex: number // Example pagination data
  pageSize: number // Example pagination data
  searchName: string
}

export type {
  IExercisePagePayload,
  ApiResponse,
  IExerciseColumnResponse,
  IExerciseRowResponse,
  IExerciseTableResponse,
}
