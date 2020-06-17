import * as React from 'react'
import {ChangeEvent, FormEvent, ReactNode, useEffect, useState} from "react";
import {TextFieldProps, SelectProps, CheckBoxProps, Validation, validate} from "./types/field";
import {CheckBox, DropDown, TextBox} from "./Control";
import {Moment} from 'moment';

export type Field = TextFieldProps | SelectProps | CheckBoxProps;

type Props = {
    fields: Field[];
    onSubmit(e: FormEvent<HTMLFormElement>): void;
    children?: ReactNode | ReactNode[]
}

type ControlProps = {
    input: TextFieldProps | SelectProps | CheckBoxProps,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Control: React.FC<ControlProps> = ({input, onChange}) => {
    if(input.control === 'textbox') {
        return <TextBox {...input} onChange={onChange} />
    }
    else if(input.control === 'dropdown') {
        return <DropDown {...input} onChange={onChange} />
    }
    else if(input.control === 'checkbox') {
        return <CheckBox {...input} onChange={onChange} />
    }
    return null;
}

type ControlState = {
    value?: string | number | Moment | boolean,
    checked?: boolean,
    valid: boolean
}

const Form: React.FC<Props> = ({fields, children, onSubmit}) => {
    const [state, setState] = useState<Record<string,ControlState>>({});

    useEffect(() => {
        fields.map(x => mergeState(x.name, x.control === 'checkbox'
            ? Boolean(x.checked)
            : x.value, Boolean(x.optional), x.control === 'checkbox' ? undefined : x.validate));
    })

    function mergeState(name: string, value: string | Moment | number | boolean, optional: boolean, validation: Validation | Validation[] | undefined) {
        let valid = true;
        if(typeof value === 'boolean') {
            valid = optional || value;
        }
        else if((!optional || value.toString().length > 0) && validation) {
            if(Array.isArray(validation)) {
                valid = validation.reduce((p,c) => {
                    if(!p) {
                        return p;
                    }
                    return validate(c, value);
                }, true)
            }
        }
        setState({...state, [name]: {value, valid}});
    }

    return (
        <form onSubmit={onSubmit}>
            {fields.map((f, idx) => <Control
                onChange={(e) => mergeState(e.target.value, f.control === 'checkbox'
                        ? e.target.checked
                        : e.target.value, Boolean(f.optional), f.control !== "checkbox" ? f.validate : undefined)}
                input={f.control !== 'checkbox' ? {...f, value: state[f.name]?.value?.toString() ?? ''} : {...f, checked: Boolean(state[f.name]?.value)}}
                key={idx} />)}
            {children}
        </form>
    )
}

export default Form
