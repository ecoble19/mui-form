import React, {FormEvent} from 'react'

import Form, {Field} from 'mui-form'
import 'mui-form/dist/index.css'


const testFields: Field[] = [
    {
        name: 'firstName',
        control: 'textbox',
        label: 'First Name',
        value: '',
    },
    {
        name: 'lastName',
        control: 'textbox',
        label: 'Last Name',
        value: '',
    },
    {
        name: 'age',
        control: 'textbox',
        type: 'integer',
        label: 'Age',
        validate: (v) => Number(v) > 10 && Number(v) < 35,
        value: '',
        optional: true
    },
    {
        name: 'over21',
        control: 'checkbox',
        label: 'Are you over 21?',
        checked: false
    },
    {
        name: 'beer',
        control: 'dropdown',
        label: 'Favorite Beer',
        value: 'none',
        options: [
            {
                value: 'none',
                label: 'Select a Beer',
                disabled: true
            },
            {
                value: 'Blue Moon',
                label: 'Blue Moon'
            },
            {
                value: 'Coors',
                label: 'Coors'
            }
        ],
        labelID: 'favoriteBeer',
    }
]

const App = () => {

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log('submitting');
        return false;
    }

    return (
        <Form fields={testFields} onSubmit={handleSubmit}>
            <button>Submit</button>
        </Form>
    )
}

export default App
