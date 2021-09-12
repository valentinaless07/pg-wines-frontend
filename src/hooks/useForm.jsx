import { useState } from 'react';


const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }


    const handleInputChange = ({ target }) => {
        console.log('TARGET: ',target);
        setValues({
            ...values,
            [ target.name ]: target.value
        });
        console.log('VALUES: ', values);

    }

    return [ values, handleInputChange, setValues, reset ];

}

export default useForm;