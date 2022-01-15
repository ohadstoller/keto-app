import * as React from 'react';
import {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {AxiosResponse} from "axios";
import {fetchFood, fetchSuggestions} from "@/services/FoodService";
import {useRecoilState} from "recoil";
import {foodListState} from "@/atoms/FoodAtom";
import hash from "object-hash";

interface Food {
    common_type: any,
    food_name: string,
    local: string,
    photo: { thumb: string },
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
    const [loading, setLoading] = useState(false)

    const onInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {
        // @ts-ignore
        setInputValue(event.target?.value);
        if (event.type === 'click') {
            if (reason === 'clear') {
                setInputValue('');
                setOpen(false)
            }
        }
    }

    async function setToFetchedFood(value: string) {
        let fetchedFood = await fetchFood(value)
        console.log("-> fetchedFood", fetchedFood);
        const foodItemWithId = {...fetchedFood, id: hash(fetchedFood)};
        console.log("-> foodItemWithId", foodItemWithId);
        setFoodItems((foodItems: (Food | object)[]): Food[] => {
            // @ts-ignore
            return [foodItemWithId, ...foodItems];
        });
    }

    const onChange = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        // @ts-ignore
        const {outerText, value} = e.target;
        if (value) {
            console.log("-> fetching... e.target.value", value);
            await setToFetchedFood(value);
        } else if (outerText) {
            console.log("-> fetching... e.target.outerText", outerText);
            await setToFetchedFood(outerText);
        }
        setInputValue('')
    }

    useEffect(() => {
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
        inputValue === '' ? setOpen(false) : setOpen(true)
    }, [open, options, inputValue]);

    return (
        <div>
            <Autocomplete
                sx={{
                    width: '30vw',
                    display: 'flex',
                }}
                open={open}
                freeSolo
                autoComplete
                onChange={onChange}
                clearOnBlur
                // autoSelect
                // selectOnFocus
                // handleHomeEndKeys
                // openOnFocus
                onInputChange={onInputChange}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setInputValue('')
                    setOpen(false);
                }}
                isOptionEqualToValue={(option, value) => option.food_name === value.food_name}
                getOptionLabel={(option) => option.food_name ? option.food_name : ''}
                options={options}

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



