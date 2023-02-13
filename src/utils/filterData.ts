export const filterData = (arr: Transaction[], status: string, type: string): Transaction[] => {
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