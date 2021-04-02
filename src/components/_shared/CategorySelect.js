import React from 'react';
import Select from "react-select";
import useAxios from "axios-hooks";

const CategorySelect = ({initialValue,background,setValue,value,setSubCategory}) => {
    const [{data, loading}] = useAxios(
        '/api/v1/category'
    )
    const onchangeSelect = (item) => {
        setValue(item)
        if(setSubCategory){
            setSubCategory(null)
        }
    };
    if(loading){
        return (
            <div>Loading..</div>
        )
    }

    const customStyles = {
        control: (base) => ({
            ...base,
            background:background?"#168D71":"",
            color:"white",
            borderColor:background?"#168D71":"#CED4DA",
            "&:hover": {
                borderColor:background?"#168D71":""
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
            color:!background?"black":"white"

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

export default CategorySelect;
