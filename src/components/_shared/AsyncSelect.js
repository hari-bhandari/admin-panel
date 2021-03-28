import React, {useState} from 'react';
import Select from "react-select";
import useAxios from "axios-hooks";

const AsyncSelect = ({initialValue}) => {
    const [{data, loading, error}, refetch] = useAxios(
        '/api/v1/category'
    )
    const [value, setValue] = useState(initialValue);
    const onchangeSelect = (item) => {
        console.log(item)
    };
    if(loading){
        return (
            <div>Loading..</div>
        )
    }

    return (
        <Select
            value={value}
            onChange={onchangeSelect}
            options={data.data}
            getOptionValue={(option) => option.id}
            getOptionLabel={(option) => option.name}
        />
    );
};

export default AsyncSelect;
