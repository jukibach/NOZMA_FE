import React from 'react'
import {
  IExerciseColumnResponse,
  IExerciseRowResponse,
} from '../../types/ExerciseTableResponse'
import { List, Table } from '@mantine/core'

interface Table {
  rows: Array<IExerciseRowResponse> | undefined
  columns: Array<IExerciseColumnResponse> | undefined
}

const ExerciseRow: React.FC<Table> = ({ rows, columns }) => {
  const multiSelect = (cell: string[]) =>
    cell.map((equipment) => (
      <List>
        <List.Item>{equipment}</List.Item>
      </List>
    ))

  const row = rows?.map((row: IExerciseRowResponse) => (
    <Table key={row.id}>
      {/* {columns?.map((column) => (
        <Table.Td key={column.id}>
          {column.type === 'multiSelect'
            ? multiSelect(row[column.code] as string[])
            : row[column.code]}
        </Table.Td>
      ))} */}
    </Table>
  ))

  return <Table>{row}</Table>
}

export default ExerciseRow
