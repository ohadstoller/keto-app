import * as React from 'react';
import {useState} from 'react';
import type {AppProps} from 'next/app';
import {CacheProvider, EmotionCache} from '@emotion/react';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {RecoilRoot} from "recoil";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import createEmotionCache from '../utility/createEmotionCache';
import {darkThemeOptions, themeOptions} from '@/styles/theme/themeOptions';
import '../styles/globals.css';
import {ThemeOptions} from "@mui/material/styles";
import {SwitchTheme} from "@/components/SwitchTheme";

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();
const lightTheme: ThemeOptions = createTheme(themeOptions);
const darkTheme: ThemeOptions = createTheme(darkThemeOptions);


const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
    const [theme, setTheme] = useState(darkTheme)
    const [checked, setChecked] = React.useState(true);
    const toggleTheme = () => {
        theme == lightTheme ? setTheme(darkTheme) : setTheme(lightTheme)
        checked ? setChecked(false) : setChecked(true)
    }

    const handleChange = () => {
        toggleTheme()
    }


    return (
        <RecoilRoot>
            <CacheProvider value={emotionCache}>
                <SwitchTheme checked={checked} onChange={handleChange}/>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Component {...pageProps} />
                </ThemeProvider>
            </CacheProvider>
        </RecoilRoot>
    );
};

export default MyApp;
