import * as React from 'react';
import type {AppProps} from 'next/app';
import {CacheProvider, EmotionCache} from '@emotion/react';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {RecoilRoot} from "recoil";


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '../utility/createEmotionCache';
import lightThemeOptions from '../styles/theme/lightThemeOptions';
import '../styles/globals.css';

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={lightTheme}>
                <CssBaseline/>
                <RecoilRoot>
                    <Component {...pageProps} />
                </RecoilRoot>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default MyApp;
