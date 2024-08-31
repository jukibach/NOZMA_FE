import React from 'react'

import { IExerciseColumnResponse } from '../../types/ExerciseTableResponse'
import { Table } from '@mantine/core'

interface Table {
  columns: Array<IExerciseColumnResponse> | undefined
}

const ExerciseColumn: React.FC<Table> = ({ columns }) => {
  // const columnHeaders = columns?.map((column) => (
  //   <Table.Th key={column.id}>{column.name}</Table.Th>
  // ))
  return <Table>{/* <Table.Tr>{columnHeaders}</Table.Tr> */}</Table>
}

export default ExerciseColumn
