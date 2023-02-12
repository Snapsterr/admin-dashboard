import { TableData } from "../types/typings"

export const filterData = (arr: TableData[], status: string, type: string): TableData[] => {
  if (status === '' && type === '') return arr
  const filtered = arr.filter((item) => {
    if (status.length && type.length) {
      return item.Status === status && item.Type === type
    }
    if (status.length) return item.Status === status

    if (type.length) return item.Type === type
  })
  return filtered
}