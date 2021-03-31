import React, {useState} from 'react';
import Select from "react-select";
import useAxios from "axios-hooks";

const AsyncSelect = ({initialValue,background,setValue,value}) => {
    const [{data, loading, error}, refetch] = useAxios(
        '/api/v1/category'
    )
    const onchangeSelect = (item) => {
        setValue(item)
    };
    if(loading){
        return (
            <div>Loading..</div>
        )
    }

    const customStyles = {
        control: (base) => ({
            ...base,
            background:background?"#168D71":"#e5e4e4",
            color:"white",
            borderColor:background?"#168D71":"#e5e4e4",
            "&:hover": {
                borderColor:background?"#168D71":"#fff"
            },
            width:background?"200px":"100%"
        }),
        menu: base => ({
            ...base,
            borderRadius: 0,
            marginTop: 0,

        }),
        menuList: base => ({
            ...base,
            padding: 0,

        }),
        singleValue:base => ({
            ...base,
            color:'white'

        }),
        placeholder:base=>({
            ...base,
            color:!background?"black":"white"
        }),
        input: base => ({
            ...base,
            color: "#ff0000"
        }),

    };
    return (
        <Select
            value={value}
            placeholder={initialValue}
            onChange={onchangeSelect}
            options={data.data}
            getOptionValue={(option) => option.id}
            getOptionLabel={(option) => option.name}
            styles={customStyles}
        />
    );
};

export default AsyncSelect;
