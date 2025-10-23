import { Alert } from '@mui/material';
import React, { FC } from 'react'

interface ErrorProps  {
    error: string;
}
const Error:FC<ErrorProps> = ({
    error
}) => {
  return (
    <div className='mt-2 mb-2'>
        <Alert color='error' title={error} variant='outlined' />
    </div>
  )
}

export default Error