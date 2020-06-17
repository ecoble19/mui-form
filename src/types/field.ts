import { ReactNode} from "react";
import {KeyValuePair} from "../Control";
import moment,{Moment} from "moment";

export type TextBoxType = 'ssn' | 'phone' | 'email' | 'integer' | 'decimal' | 'money' | 'date' | 'datetime';
export type Control = 'textbox' | 'dropdown' | 'checkbox' | 'radio' | 'date'

type ValidateFn = (value: string | number | Moment) => boolean

export type Validation = 'ssn' | 'bankRouting' | 'phone' | 'email' | 'number' | 'date' | 'datetime' | ValidateFn

type Field<T extends Control> = {
    id?: string
    name: string
    control: T
    label: ReactNode
    showError?: boolean
    optional?: boolean
}

export type TextFieldProps = Field<'textbox'> & {
    value: string
    type?: TextBoxType
    validate?: Validation | Validation[] | undefined
    helperText?: ReactNode
}

export type SelectProps = Field<'dropdown'> & {
    value: string
    options: KeyValuePair[]
    labelID: string
    validate?: Validation | Validation[] | undefined
    helperText?: ReactNode
}

export type CheckBoxProps = Field<'checkbox'> & {
    checked?: boolean
}

const emailReg = /[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-z0-9](?:[A-z0-9-]*[A-z0-9])?\.)+[A-z](?:[A-z]*[A-z])?/;
const phoneReg = /^\d{10}$/;
const ssnReg = /^\d{9}$/;

export function validate(v: Validation, value: string | number | Moment): boolean {
    if(typeof v === 'function') {
        return v(value);
    }
    if(v === 'number') {
        return isNaN(Number(value));
    }
    if(v === 'ssn' || v === 'bankRouting') {
        return ssnReg.test(value.toString());
    }
    if(v === 'phone') {
        return phoneReg.test(value.toString());
    }
    if(v === 'email') {
        return emailReg.test(value.toString());
    }
    return !!((v === 'date' || v === 'datetime') && moment.isMoment(value));


}
