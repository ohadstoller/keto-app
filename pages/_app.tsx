import * as React from 'react';
import type {AppProps} from 'next/app';
import {CacheProvider, EmotionCache} from '@emotion/react';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';
import {
    createTheme,
    CssBaseline,
    Stack,
    Switch,
    ThemeProvider
} from '@mui/material';
import {RecoilRoot} from "recoil";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import createEmotionCache from '../utility/createEmotionCache';
import {
    darkThemeOptions,
    lightThemeOptions
} from '@/styles/theme/lightThemeOptions';
import '../styles/globals.css';
import {ThemeOptions} from "@mui/material/styles";
import {useState} from "react";

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}
const clientSideEmotionCache = createEmotionCache();
const lightTheme: ThemeOptions = createTheme(lightThemeOptions);
const darkTheme: ThemeOptions = createTheme(darkThemeOptions);


const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
    const [theme, setTheme] = useState(lightTheme)
    const [checked, setChecked] = React.useState(false);
    const toggleTheme = (event: any) => {
        theme == lightTheme ? setTheme(darkTheme) : setTheme(lightTheme)
        checked ? setChecked(false) : setChecked(true)
    }

    // @ts-ignore
    const handleChange = (event) => {
        toggleTheme(event)
        console.log("-> event.target.checked: before setting chit", event);
    }


    return (
        <RecoilRoot>
        <CacheProvider value={emotionCache}>
            <Stack direction="row" spacing={1} alignItems="center">
                <LightMode/>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <DarkMode/>
            </Stack>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                    <Component {...pageProps} />
            </ThemeProvider>
        </CacheProvider>
        </RecoilRoot>
    );
};

export default MyApp;
