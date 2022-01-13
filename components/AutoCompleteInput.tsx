import * as React from 'react';
import {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {AxiosResponse} from "axios";
import {fetchFood, fetchSuggestions} from "@/services/FoodService";
import {useRecoilState} from "recoil";
import {foodListState} from "@/atoms/FoodAtom";

interface Food {
    common_type: any,
    food_name: string,
    local: string,
    photo: {thumb: string},
    serving_qty: number,
    serving_unit: string,
    tag_id: string,
    tag_name: string
}

export default function AutocompleteInput() {
    const [foodItems, setFoodItems] = useRecoilState(foodListState)
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<any[]>([]);
    // const loading = open && options?.length === 0;
    const [loading, setLoading] = useState(false)

    const onInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {
        // @ts-ignore
        setInputValue(event.target?.value);
        if (event.type === 'click') {
            if ( reason === 'clear') {
                setInputValue('');
                setOpen(false)
            }
        }
    }

    const onChange = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        // @ts-ignore
        if (e.target.value) {
            // fetch api
            console.log("-> fetching... e.target.value", e.target.value);
            let fetchedFood = await fetchFood(e.target.value)
            console.log("-> fetchedFood", fetchedFood);
            setFoodItems((foodItems: (Food | object)[]): Food[] => {
                return [fetchedFood, ...foodItems];
            });
        }
        else if (e.target.outerText) {
            console.log("-> fetching... e.target.outerText", e.target.outerText);
            let fetchedFood = await fetchFood(e.target.outerText)
            console.log("-> fetchedFood", fetchedFood);
            setFoodItems((foodItems: (Food | object)[]): Food[] => {
                return [fetchedFood, ...foodItems];
            });
        }

        setInputValue('')
    }


    useEffect(() => {
        // if (!loading) {
        //     return undefined;
        // }
        let active = true;
        (async () => {

            if (inputValue.length > 1) {
                setLoading(true)
                const suggestions: AxiosResponse<Food[]> = await fetchSuggestions(inputValue as string)
                console.log("-> suggestions", suggestions);
                if (active) {
                    // @ts-ignore
                    setOptions(suggestions);
                    setLoading(false)
                }
            }
        })();

        return () => {
            setLoading(false)
            active = false;
        };
    }, [inputValue]);

    // @ts-ignore
    useEffect(() => {
        // if (!open) {
        //     setOptions([]);
        // }
        inputValue === '' ? setOpen(false) : setOpen(true)
    }, [open, options, inputValue]);


    return (
        <div>
            <Autocomplete
                sx={{width: 300}}
                open={open}
                freeSolo
                autoComplete
                onChange={onChange}
                clearOnBlur

                onInputChange={onInputChange}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                isOptionEqualToValue={(option, value) => option.food_name === value.food_name}
                getOptionLabel={(option) => option.food_name ? option.food_name : ''}

                options={options}
                selectOnFocus
                loading={loading}
                // disableClearable
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Type your food"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit"
                                                                 size={20}/> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />

        </div>

    );
}



