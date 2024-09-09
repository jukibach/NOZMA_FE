import { DefaultError, UseQueryOptions, useQuery } from '@tanstack/react-query'
import { AppAxios } from '../utils/axios'
import { ApiResponse } from '../interfaces/ExerciseTableResponse'
import { AxiosResponse } from 'axios'
import { useContext, useMemo } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'
import { useNavigate } from 'react-router-dom'
import { LocalDataClass } from '@data-class/LocalDataClass'

export const useCustomGetQuery = <TVariables = unknown, TData = unknown>(
  url: string,
  params?: TVariables,
  options?: UseQueryOptions<
    AxiosResponse<ApiResponse<TData>>,
    AxiosResponse<ApiResponse<TData>>
  >
) => {
  const { addMessage } = useContext(NotificationContext)!
  const memoizedParams = objectToQueryString(params)
  const finalUrl = `${url}?${memoizedParams}`

  const navigate = useNavigate()
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
        if (error.response.data.code === 'E107') {
          LocalDataClass.user = {
            ...LocalDataClass.user,
            profileToken: '',
            refreshToken: '',
            authStatus: 'LOGOUT',
          }
          return navigate('/logout', { replace: true })
        }
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
