import { useState } from 'react'
import { ExerciseColumnResponse } from '@interfaces/ExerciseTableResponse'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'

interface childProps {
  exerciseColumn: ExerciseColumnResponse
  onChange: (sortOrder: string) => void
}
export function SortableTableHeader({ exerciseColumn, onChange }: childProps) {
  const [sortDirection, setSortDirection] = useState<string>()

  const handleSort = () => {
    const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    onChange(newSortDirection)
  }
  const ignored = ['multiSelect', 'multilineText']

  return (
    <th
      key={exerciseColumn.code}
      onClick={handleSort}
      style={{
        textAlign: 'center',
        color: 'rgb(246, 251, 255)',
        cursor: 'pointer',
      }}
    >
      {!ignored.includes(exerciseColumn.type) ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span>{exerciseColumn.name}</span>
          <span style={{ marginLeft: '5px' }}>
            {sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
          </span>
        </div>
      ) : (
        exerciseColumn.name
      )}
    </th>
  )
}
