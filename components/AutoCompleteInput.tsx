import * as React from 'react';
import {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {AxiosResponse} from "axios";
import {fetchSuggestions} from "@/services/FoodService";

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

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}


export default function AutocompleteInput() {
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

    const onChange = (e: React.SyntheticEvent) => {
        e.preventDefault()
        // @ts-ignore
        if (e.target.value) {
            // fetch api
            console.log("-> fetching... e.target.value", e.target.value);
        }
        else if (e.target.outerText) {
            console.log("-> fetching... e.target.outerText", e.target.outerText);
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
                clearOnEscape
                onInputChange={onInputChange}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                isOptionEqualToValue={(option, value) => option.food_name === value.food_name}
                getOptionLabel={(option) => option.food_name ? option.food_name : ''}
                // renderTags={() => null}
                options={options}
                // selectOnFocus
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



