export const downloadLinkCsv = (arr: string, fileName: string) => {
  const blob = new Blob([arr], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = fileName
    link.href = url
    link.click()
}