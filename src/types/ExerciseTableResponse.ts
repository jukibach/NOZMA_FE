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
}

export type {
  IExerciseColumnResponse,
  IExerciseRowResponse,
  IExerciseTableResponse,
}
