import { Autocomplete, Chip, TextField } from '@mui/material'
import React, { FC, useMemo } from 'react'
import { Controller } from 'react-hook-form'
import { AutocompleteFieldProps } from './model'
import { MdClose } from 'react-icons/md'


const CustomAutoComplete: FC<AutocompleteFieldProps> = ({
    control,
    selectedOptionId,
    sx,
    value,
    optionKey,
    options,
    label,
    isError,
    id,
    isLoading,
    isMultiple,
    isRequired,
    onBlur,
    onChange: onHandlerChange,
    name,
    rules,
    errors,
}) => {
    const getLabel = (option: any) => {
        if (!option || !optionKey) return ''
        return Array.isArray(optionKey)
            ? optionKey.map(k => option[k]).join(' - ')
            : option[optionKey]
    }

    const newOptions = useMemo(() => {
        if (!options) return []
        const cloned = [...options]
        if (isMultiple && cloned.length > 0)
            cloned.unshift({ [selectedOptionId]: 'select-all', [optionKey as string]: '-- SELECT ALL --' })
        return cloned
    }, [options, isMultiple, selectedOptionId, optionKey])

    const getValue = (currentValue: any) => {
        if (isMultiple)
            return options.filter(opt => currentValue?.some((v: any) => opt[selectedOptionId] === v[selectedOptionId]))
        if (selectedOptionId)
            return currentValue
                ? options.find(opt => opt[selectedOptionId] === currentValue)
                : null
        return null
    }

    const renderAuto = (field?: any) => {
        const fieldValue = field ? field.value : value
        const handleChange = field ? field.onChange : onHandlerChange

        return (
            <Autocomplete
                sx={{
                    ...sx,

                }}
                multiple={isMultiple}
                disabled={isLoading}
                options={newOptions}
                value={getValue(fieldValue)}
                isOptionEqualToValue={(option, val) => {
                    if (!option || !val) return false
                    if (typeof selectedOptionId === 'string') return option[selectedOptionId] === val[selectedOptionId]
                    return option === val
                }}
                getOptionLabel={getLabel}
                renderInput={params => (
                    <TextField
                        {...params}
                        size='small'
                        autoComplete='off'
                        required={isRequired}

                        label={label}
                        error={field ? Boolean(errors?.[name]) : isError}
                        helperText={field ? (errors?.[name]?.message as any) : ''}
                        slotProps={{
                            inputLabel: {
                                style: { fontSize: 12 }, shrink: true
                            }
                        }}
                        margin='dense'
                    />
                )}
                renderValue={(selected) => (
                    <div className='flex gap-3 items-center'>
                        {selected.map((value: any) => {
                            return <Chip
                                label={value[optionKey as string]}
                                key={`${value[selectedOptionId]}`}
                                onDelete={() => {
                                    const newOptions = selected?.filter((item: any) => item[selectedOptionId] != value[selectedOptionId]);
                                    if (onHandlerChange) {
                                        onHandlerChange(newOptions)
                                    }
                                    field.onChange(newOptions)
                                }}
                                deleteIcon={<MdClose />}
                            />
                        })}
                    </div>
                )}


                onBlur={() => onBlur && onBlur()}
                onChange={(e, newValue) => {
                    if (isMultiple) {
                        if (newValue.some((item: any) => item[selectedOptionId] === 'select-all')) {
                            const allSelected = fieldValue?.length === options.length
                            handleChange(allSelected ? [] : options)
                            if (onHandlerChange) onHandlerChange(allSelected ? [] : options)
                        } else {
                            handleChange(newValue)
                            if (onHandlerChange) onHandlerChange(newValue)
                        }
                    } else {
                        const val = newValue ? newValue[selectedOptionId] : null
                        handleChange(val)
                        if (onHandlerChange) onHandlerChange(newValue)
                    }
                }}
            />
        )
    }

    return control ? (
        <Controller name={name} rules={rules} control={control} render={({ field }) => renderAuto(field)} />
    ) : (
        renderAuto()
    )
}

export default CustomAutoComplete
