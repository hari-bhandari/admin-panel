import React from 'react';
import Select from "react-select";

const AsyncSelect = ({data,initialValue,setValue}) => {

    const onChangeSelect = (item) => {
        setValue(item)
    };

    return (
        <Select
            value={data}
            placeholder={initialValue}
            onChange={onChangeSelect}
            options={data.data}
            getOptionValue={(option) => option.id}
            getOptionLabel={(option) => option.name}/>
    );
};

export default AsyncSelect;
