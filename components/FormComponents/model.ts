import { SxProps } from '@mui/material'
import { Control, FieldErrors, FieldValues, RegisterOptions } from 'react-hook-form'

export interface AutocompleteFieldProps {
  id: string | number
  name: string
  label: string
  optionKey: string | string[]
  disableClearable?: boolean
isError?:boolean
options: any[]
  selectedOptionId: string
  isLoading: boolean
  isMultiple?: boolean
  isRequired?: boolean
  value: any | any[] | Date
  onChange: (value: any, ...rest: any[]) => void
  onBlur?: (...rest: any[]) => void
  errors?: FieldErrors<FieldValues>
  control?: Control<any>
  rules?: Partial<RegisterOptions>
  sx?: SxProps
}


export interface TextFieldProps {
  id: string | number
  name: string
  label: string;
  isError?:boolean
  isLoading: boolean
  isMultiple?: boolean
  isRequired?: boolean
  value: string
  onChange: (value: any, ...rest: any[]) => void
  onBlur?: (...rest: any[]) => void
  errors?: FieldErrors<FieldValues>
  control?: Control<any>
  rules?: Partial<RegisterOptions>
  sx?: SxProps
}
