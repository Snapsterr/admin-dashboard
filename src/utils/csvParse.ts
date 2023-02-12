// import { csvToJSON } from './csvParse';
import Papa, { ParseResult } from 'papaparse';
import { TableData } from '../types/typings';

export const csvToJsonString = (str: string) => {
	let results: string[][] = []
	Papa.parse(str, {
		dynamicTyping: true,
				download: true,
				header: true,
				delimiter: ",",
				newline: "\n",
				complete: function(res: ParseResult<string>) {
					console.log(res)
					results.push(res.data)
				} 
	})
	return results
}

export const csvToJsonFile = (file: File) => {
  let results: string[][] = []
	Papa.parse(file, {
		dynamicTyping: true,
				download: false,
				header: true,
				delimiter: ",",
				newline: "\n",
				complete: function(res: ParseResult<string>) {
					console.log(res.data.slice(0, 10))
					results.push(res.data)
				} 
	})
	return results
}

export const jsonToCsv = (json: TableData[]) => {
  const result = Papa.unparse(json, {
    quotes: false, //or array of booleans
    quoteChar: '"',
    escapeChar: '"',
    delimiter: ",",
    header: true,
    newline: "\n",
    skipEmptyLines: false, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
  })
  return result
}