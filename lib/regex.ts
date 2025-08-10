type RegexOptionsProps ={ 
    [key: string]: RegExp
}
export const regexOptions:RegexOptionsProps = {
   email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
}