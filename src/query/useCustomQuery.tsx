import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { AppAxios } from '../utils/axios'
import { ApiResponse } from '../interfaces/ExerciseTableResponse'
import { AxiosResponse } from 'axios'
import { useContext } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'

export const useCustomGetQuery = <TVariables = unknown, TData = unknown>(
  url: string,
  params?: TVariables,
  options?: Omit<
    UseQueryOptions<
      AxiosResponse<ApiResponse<TData>>,
      AxiosResponse<ApiResponse<TData>>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  const { addMessage } = useContext(NotificationContext)!
  debugger
  const memoizedParams = objectToQueryString(params)
  const finalUrl = `${url}?${memoizedParams}`

  return useQuery({
    ...options,
    refetchOnWindowFocus: false,
    queryKey: [finalUrl],
    queryFn: async () => {
      try {
        return await AppAxios().get<ApiResponse<TData>>(finalUrl)
      } catch (error: any) {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        addMessage('Error', resMessage)
        return resMessage
      }
    },
  })
}

export const objectToQueryString = (obj: any) => {
  return Object.entries(obj ?? {})
    .filter(([_, value]) => (value?.toString().trim() ?? '') !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
    .join('&')
}
