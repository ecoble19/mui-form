import React, {ChangeEvent, ReactElement, ReactNode} from 'react'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import {
    FormControl,
    FormHelperText,
    InputLabel,
    Select,
    SelectProps,
    Checkbox as MuiCheckbox,
    CheckboxProps,
    MenuItem,
    FormControlLabel
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

type NameRequired = {
    name: string
}

export type TextProps = TextFieldProps & NameRequired

export const TextBox: React.FC<TextProps> = (props) => {
    return <TextField {...props} />
}

export type KeyValuePair = {
    label: string
    value: string
    disabled?: boolean
}
export type DropDownProps = SelectProps &
    NameRequired & {
        error?: boolean
        options: KeyValuePair[]
        label: ReactNode
        labelID: string
        helperText?: ReactNode
    }

export const DropDown: React.FC<DropDownProps> = ({
    error,
    name,
    options,
    label,
    labelID,
    helperText,
    native,
    ...selectProps
}) => {
    return (
        <FormControl error={error}>
            <InputLabel id={labelID}>{label}</InputLabel>
            <Select {...selectProps} name={name} native={native}>
                {options.map((o, idx) => (
                    native
                        ? <option value={o.value} key={idx} disabled={o.disabled}>{o.value}</option>
                        : <MenuItem disabled={o.disabled} key={idx} value={o.value}>{o.label}</MenuItem>
                ))}
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    )
}

export const CheckBox: React.FC<CheckboxProps & NameRequired & {label: ReactNode}> = ({label, ...props}) => {

    return (
        <FormControlLabel
            control={
                <MuiCheckbox {...props} />
            }
            label={label}
            />
    )
}

export type ValidateProps = {
    children: ReactElement<HTMLInputElement, typeof Checkbox>
}

export const Validate: React.FC<ValidateProps> = ({children}) => {

    function handleChange(e: ChangeEvent<HTMLInputElement>) {

        console.log('changed value', e.target.name, e.target.value);
        children.props.onChange(e);
    }
    const clone = React.cloneElement(children, {
        onChange: handleChange
    });

    return clone;
}
