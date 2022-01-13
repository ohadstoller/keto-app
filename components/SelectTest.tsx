import React, {useState} from 'react';
import AsyncSelect from 'react-select/async';
import {AxiosResponse} from "axios";
import {fetchSuggestions} from "@/services/FoodService";


export default function SelectTest() {

    const customStyles = {
        // @ts-ignore
        option: provided => ({
            ...provided,
            color: 'black',
            background: 'red',
            fontColor: 'black',
            opacity: '0.5',
            fontStyle: '14px black',
            fontSize: '14px'
        }),
        // @ts-ignore
        control: provided => ({
            ...provided,
            background: 'blue',
            color: 'black'
        }),
        // @ts-ignore
        menu: provided => ({
            ...provided,
            background: 'yellow',
            color: 'black'
        }),
        // @ts-ignore
        multiValueRemove: provided => ({
            ...provided,
            color: 'black',
            background: 'green',
        }),


    }


    // const customStyles = {
    //     // @ts-ignore
    //     // option: (provided, state) => ({
    //     //     ...provided,
    //     //
    //     //     borderBottom: '1px dotted pink',
    //     //     color: state.isSelected ? 'red' : 'blue',
    //     //     padding: 20,
    //     // }),
    //
    //     menu: () => {
    //         const color = 'color: black'
    //         const background = 'background grey'
    //         return {background, color};
    //
    //     },
    //     option: () => {
    //         const color = 'color: black'
    //         const background = 'background grey'
    //         return {background, color};
    //
    //     },
    //     menuList: () => {
    //         const color = 'color: black'
    //         const background = 'background grey'
    //         return {background, color};
    //
    //     },
    //     // option: () => {
    //     //     const color = 'color: black'
    //     //     const background = 'background grey'
    //     //     return {background, color};
    //     //
    //     // },
    //
    //     // @ts-ignore
    //     singleValue: (provided, state) => {
    //         const opacity = state.isDisabled ? 0.5 : 1;
    //         // const transition = 'opacity 300ms';
    //         const background = 'background grey'
    //         const color = 'color black'
    //
    //         return {...provided, opacity, background, color};
    //     }
    // }
    const [searchValue, setSearchValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [foods, setFoods] = useState([])

    const handleInputChange = (newValue: string) => {
        console.log('handleInputChange: ', newValue)
        const newVal = newValue.replace(/\W/g, '');
        setSearchValue(newVal);
        return newVal;
    };

    // @ts-ignore
    const onChange = (selectedOption) => {
        // @ts-ignore
        setFoods([selectedOption, ...foods])
        console.log('submited', selectedOption)

    }


    const filterOptions = (inputValue: string, suggestions: any[]) => {
        return suggestions.filter((i) =>
            i.food_name.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const promiseOptions = async (inputValue: string) => {
        console.log('promiseOptions')
        const suggestions: AxiosResponse<any> = await fetchSuggestions(inputValue as string)
        // @ts-ignore
        const filteredSuggestions: any[] = filterOptions(inputValue, suggestions)
        console.log("-> filteredSuggestions", filteredSuggestions);
        // @ts-ignore
        setSuggestions(filteredSuggestions)
        return filteredSuggestions

        // return new Promise<any[]>((resolve) => {
        //     setTimeout(() => {
        //         // @ts-ignore
        //         resolve(filterOptions(searchValue, suggestions));
        //     }, 1000);
        // })
    }


    return (
        <form action="">
            <AsyncSelect
                className='react-select-container'
                onChange={onChange}
                styles={customStyles}
                cacheOptions
                defaultOptions={suggestions}
                loadOptions={promiseOptions}
                onInputChange={handleInputChange}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        primary25: 'hotpink',
                        primary: 'black',
                    },
                })}

            />
        </form>


    )
        ;
}



