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
import {Alert, Stack} from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

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
    const [showAlert, setShowAlert] = useState(false)
    const [alertData, setAlertData] = useState({
        alertContent: '',
        alertType: ''
    });
    const [foodItems, setFoodItems] = useRecoilState(foodListState)
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(false)

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

    const handleShowAlert = (alertContent: string, alertType: string) => {
        setAlertData({alertContent, alertType})
        setShowAlert(true)
        const setOnOff = () => {
            setShowAlert(false)
            setAlertData({alertContent: '', alertType: ''})
        }
        setTimeout(setOnOff, 4000)

    }

    async function setToFetchedFood(value: string) {
        try {
            setIsFetching(true)
            let fetchedFood = await fetchFood(value)
            handleShowAlert('Found food item, added to your list :)', 'success')
            const foodItemWithId: any = {...fetchedFood, id: hash(fetchedFood)};
            setFoodItems([foodItemWithId, ...foodItems])
            setIsFetching(false)
        } catch (e) {
            setIsFetching(false)
            handleShowAlert('Sorry, something went wrong 😪', 'error')
            console.log("-> e", e);
        }
    }

    const onChange = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const {outerText, value}: any = e.target;
        if (value) {
            await setToFetchedFood(value);
        } else if (outerText) {
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
                if (active) {
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

    useEffect(() => {
        inputValue === '' ? setOpen(false) : setOpen(true)
    }, [open, options, inputValue]);

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
                height: '10vh',
                alignItems: 'center'
            }}>
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
            <Stack
                sx={{
                    width: '30vw',
                    display: 'flex',
                    alignItems: 'center',
                    height: '0px',
                    mt: '10px'
                }}
            >
                {isFetching ?
                    <Box sx={{ mt: 2 }}>
                        <CircularProgress />
                    </Box> : <></>
                }
                {showAlert ?
                    <Alert severity={alertData?.alertType}
                    >
                        {alertData?.alertContent}</Alert> : <></>
                }
            </Stack>
        </Container>


    );
}



