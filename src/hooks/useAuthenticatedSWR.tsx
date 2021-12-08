import React, { useMemo } from 'react'
import useSWR from 'swr'

interface IUseAuthenticatedSWR {
  path: string
  token?: string
}

const authenticationFetcher = async <T extends unknown>(
  path: string,
  token: string,
) => {
  const data = await fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
  })
  const parsedData = (await data?.json()) as T[]
  return parsedData
}

function useAuthenticatedSWR<T>({ path, token = '' }: IUseAuthenticatedSWR) {
  const authToken = useMemo(() => `Bearer ${token}`, [token])
  const { data, mutate } = useSWR(
    [`http://192.168.1.137:8080/api/${path}`, authToken],
    authenticationFetcher,
  )
  const parsedData = data as T[]

  return { data: parsedData, mutate }
}

export default useAuthenticatedSWR
