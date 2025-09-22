import { Control, FieldErrors, FieldValues, RegisterOptions } from "react-hook-form";
export interface InputProps {
 name:string;
 value: string;
 onBlur?:() => void;
 control?:Control<any>
 type?:React.HTMLInputTypeAttribute
 errors?: FieldErrors<FieldValues>
 onChange?: (value: any, ...rest: any[]) => void
 rules?: Partial<RegisterOptions>
 placeholder:string;
 isLabelRequire?:boolean
}