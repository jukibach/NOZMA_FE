interface AccountColumnResponse {
  [accountColumn: string]: string | boolean | undefined | number
  id: number
  code: string
  name: string
  type: string
}

interface AccountViewResponse {
  [accountColumn: string]: string | boolean | string[] | undefined
  accountId: string
  accountName: string
  email: string
  fullName: string
  birthdate: string
  creationTime: string
  lastModified: string
  status: string
}

interface AccountDetailResponse {
  [accountColumn: string]:
    | string
    | boolean
    | string[]
    | undefined
    | AccountColumnResponse[]
  accountId: string
  accountName: string
  email: string
  firstName: string
  lastName: string
  birthdate: string
  creationTime: string
  lastModified: string
  status: string
  columns: AccountColumnResponse[]
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
  profileToken: string
  refreshToken: string
}

interface AccountTableResponse {
  columns: AccountColumnResponse[]
  response: AccountViewResponse[]
  totalRecords: number
}

interface AccountPagePayload {
  page: number
  size: number
  searchName?: string
}

interface EditableAccountPayload {
  [accountColumn: string]: string | boolean | string[] | undefined | Date
  accountName: string
  email: string
  firstName: string
  lastName: string
  birthdate: string | Date
}

export type {
  AccountPagePayload,
  AccountTableResponse,
  AccountViewResponse,
  AccountColumnResponse,
  AccountDetailResponse,
  EditableAccountPayload,
  EditableAccountResponse,
}
