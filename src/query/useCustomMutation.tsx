import {
  DefaultError,
  UseMutationOptions,
  useMutation,
} from '@tanstack/react-query'
import { AppAxios } from '../utils/axios'
import { ApiResponse } from '../interfaces/ExerciseTableResponse'
import { AxiosResponse } from 'axios'
import { useContext } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'
import { NavigateFunction, useNavigate } from 'react-router-dom'

export function useCustomPostMutation<
  TVariables = unknown,
  TData = unknown,
  TError = DefaultError
>(
  url: string,
  options?: UseMutationOptions<
    AxiosResponse<ApiResponse<TData>>,
    TError,
    TVariables
  > & { isAlert?: boolean }
) {
  const { addMessage } = useContext(NotificationContext)!
  const isAlert = options?.isAlert
  return useMutation({
    ...options,
    mutationFn: async (payload: TVariables) => {
      try {
        const contentType =
          typeof payload === 'string'
            ? { headers: { 'Content-Type': 'text/plain' } }
            : { headers: { 'Content-Type': 'application/json' } }
        return await AppAxios().post<ApiResponse<TData>>(
          url,
          payload,
          contentType
        )
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

export function useCustomPatchMutation<
  TVariables = unknown,
  TData = unknown,
  TError = DefaultError
>(
  url: string,
  id: number,
  options?: UseMutationOptions<
    AxiosResponse<ApiResponse<TData>>,
    TError,
    TVariables
  > & { isAlert?: boolean }
) {
  const { addMessage } = useContext(NotificationContext)!
  const isAlert = options?.isAlert
  const URL = `${url}/${id}`
  const navigate: NavigateFunction = useNavigate()
  return useMutation({
    ...options,
    mutationFn: async (payload: TVariables) => {
      try {
        return await AppAxios().patch<ApiResponse<TData>>(URL, payload)
      } catch (error: any) {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        if (error.response.data.code === 'E107') navigate('/logout')

        addMessage('Error', resMessage)
        return resMessage
      }
    },
  })
}
