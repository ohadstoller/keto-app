import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import * as React from "react";
import AutocompleteInput from '@/components/AutoCompleteInput'
import NutritionFacts from '@/components/NutritionFacts'
import FoodTable from '@/components/FoodTable';
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {Avatar} from "@mui/material";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit"
                  href="https://github.com/ohadstoller"
            >
                Ohad Mark Stoller
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function AppLayout() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                // backgroundColor: 'lightGrey',
                flexDirection: 'column',
                minHeight: '95vh',
            }}
        >
            {/*<CssBaseline/>*/}
            <Container
                id="autoComplete"
                // className={styles.main}
                sx={{
                    // minHeight: '30vh',

                    // mt: 8,
                    // mb: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                component="main">
                <AutocompleteInput/>
            </Container>
            <Container
                id="nutritionFacts"
                // className={styles.main}
                sx={{
                    height: '40vh',
                    // mt: 6,
                    // mb: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                component="main">
                <NutritionFacts/>
            </Container>

            <Container
                id="foodTable"
                component="main"
                sx={{
                // backgroundColor: 'red',
                height: '50vh',
                // minHeight: '50vh',
                // mt: -4,
                // mb: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
                // maxWidth="sm"
            >
                <FoodTable/>
            </Container>
            <Box
                component="footer"
                sx={{
                    minWidth: '100vw',
                    height: '10vh',

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container
                    maxWidth="sm"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Avatar
                        alt="github"
                        src="/github-black.png"
                        sx={{ width: 20, height: 20 }}
                    />
                    <Typography variant="body1"
                                color="text.primary"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                    >
                        <Link
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: '4px'

                            }}
                            color="inherit"
                              href="https://github.com/ohadstoller/keto-app"
                        >
                            The Keto App

                            {/*<img  src="/github-black.png" alt="Vercel Logo" width={30} height={30}/>*/}
                        </Link>

                        {/*{' '}*/}
                    </Typography>
                    {/*<Typography variant="body1"*/}
                    {/*            sx={{*/}
                    {/*                display: 'flex',*/}
                    {/*                flexDirection: 'row',*/}
                    {/*                alignItems: 'center',*/}
                    {/*                justifyContent: 'center',*/}
                    {/*                cursor: 'pointer'*/}
                    {/*            }}>*/}
                    {/*    The Keto App   <img src="/github-black.png" alt="Vercel Logo" width={30} height={30}/>*/}
                    {/*</Typography>*/}


                    <Copyright/>
                </Container>
            </Box>
        </Box>
    );
}


const Home: NextPage = () => {
    // const fiftyFiftyChance = (): boolean => {
    //     let chance: number = random(0, 9);
    //     return chance > 5;
    // }

    return (
        <div>
            <div className={styles.container}>
                <Head>
                    <title>Keto App</title>
                    <meta name="description"
                          content="Generated by create next app"/>
                    <link rel="icon" href="/k_1.ico"/>
                </Head>
                <main className={styles.main}>
                    <AppLayout/>


                    {/*<h1 className={styles.title}>*/}
                    {/*    Welcome to <a href="https://nextjs.org">Next.js!</a>*/}
                    {/*</h1>*/}

                    {/*<p className={styles.description}>*/}
                    {/*    Get started by editing{' '}*/}
                    {/*    <code className={styles.code}>pages/index.tsx</code>*/}
                    {/*</p>*/}

                    {/*<div className={styles.grid}>*/}
                    {/*    <a href="https://nextjs.org/docs" className={styles.card}>*/}
                    {/*        <h2>Documentation &rarr;</h2>*/}
                    {/*        <p>Find in-depth information about Next.js features and*/}
                    {/*            API.</p>*/}
                    {/*    </a>*/}

                    {/*    <a href="https://nextjs.org/learn" className={styles.card}>*/}
                    {/*        <h2>Learn &rarr;</h2>*/}
                    {/*        <p>Learn about Next.js in an interactive course with*/}
                    {/*            quizzes!</p>*/}
                    {/*    </a>*/}

                    {/*    <a*/}
                    {/*        href="https://github.com/vercel/next.js/tree/master/examples"*/}
                    {/*        className={styles.card}*/}
                    {/*    >*/}
                    {/*        <h2>Examples &rarr;</h2>*/}
                    {/*        <p>Discover and deploy boilerplate example Next.js*/}
                    {/*            projects.</p>*/}
                    {/*    </a>*/}

                    {/*    <a*/}
                    {/*        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"*/}
                    {/*        className={styles.card}*/}
                    {/*    >*/}
                    {/*        <h2>Deploy &rarr;</h2>*/}
                    {/*        <p>*/}
                    {/*            Instantly deploy your Next.js site to a public URL*/}
                    {/*            with Vercel.*/}
                    {/*        </p>*/}
                    {/*    </a>*/}
                    {/*</div>*/}
                </main>

                {/*<footer className={styles.footer}>*/}
                {/*    /!*<Footer/>*!/*/}
                {/*    /!*      <a*!/*/}
                {/*    /!*          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"*!/*/}
                {/*    /!*          target="_blank"*!/*/}
                {/*    /!*          rel="noopener noreferrer"*!/*/}
                {/*    /!*      >*!/*/}
                {/*    /!*          Powered by{' '}*!/*/}
                {/*    /!*          <span className={styles.logo}>*!/*/}
                    {/*  <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>*/}
                {/*    /!*</span>*!/*/}
                {/*    /!*      </a>*!/*/}
                {/*</footer>*/}
            </div>
        </div>

    )
}

export default Home
