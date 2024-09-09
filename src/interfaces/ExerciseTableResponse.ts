interface ExerciseColumnResponse {
  [exerciseColumn: string]: string | boolean | undefined | number
  id: number
  code: string
  name: string
  type: string
  visible: boolean
}

interface ExerciseRowResponse {
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

interface ExerciseTableResponse {
  columns: ExerciseColumnResponse[]
  rows: ExerciseRowResponse[]
  totalRowCount: number
}

interface ApiResponse<T> {
  status: number | string | undefined
  code: string
  message: string
  result: T
}
interface ExercisePagePayload {
  pageIndex: number
  pageSize: number
  searchName?: string
}

export type {
  ExercisePagePayload,
  ApiResponse,
  ExerciseColumnResponse,
  ExerciseRowResponse,
  ExerciseTableResponse,
}
