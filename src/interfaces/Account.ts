interface AccountColumnResponse {
  [accountColumn: string]: string | boolean | undefined | number
  id: number
  code: string
  name: string
  type: string
}

interface AccountDetailResponse {
  [accountColumn: string]: string | boolean | string[] | undefined
  accountId: string
  accountName: string
  email: string
  fullName: string
  birthdate: string
  creationTime: string
  lastModified: string
  status: string
  isLocked: string
}

interface EditableAccountResponse {
  [accountColumn: string]: string | boolean | string[] | undefined
  accountId: string
  accountName: string
  email: string
  firstName: string
  lastName: string
  birthdate: string
  creationTime: string
  lastModified: string
  status: string
  isLocked: string
}

interface AccountTableResponse {
  columns: AccountColumnResponse[]
  response: AccountDetailResponse[]
  totalRecords: number
}

interface AccountPagePayload {
  page: number
  size: number
  searchName?: string
}

interface UpdatableAccountPayload {
  [accountColumn: string]: string | boolean | string[] | undefined | Date
  accountName: string
  email: string
  firstName: string
  lastName: string
  birthdate: string | Date
}

export type {
  AccountPagePayload,
  UpdatableAccountPayload,
  AccountTableResponse,
  AccountDetailResponse,
  AccountColumnResponse,
  EditableAccountResponse,
}
