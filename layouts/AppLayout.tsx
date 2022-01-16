import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AutocompleteInput from "@/components/AutoCompleteInput";
import NutritionFacts from "@/components/NutritionFacts";
import FoodTable from "@/components/FoodTable";
import {Footer} from "@/components/Footer";
import * as React from "react";

export function AppLayout() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                minHeight: '95vh',
            }}
        >
            <CssBaseline/>
            <Container
                id="autoComplete"
                sx={{
                    minHeight: '10vh',
                    mt: 8,
                    mb: 2,
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
                sx={{
                    height: '40vh',
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
                    height: '50vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
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
                            ? theme.palette.grey[50]
                            : theme.palette.grey[800],
                }}
            >
                <Footer/>
            </Box>
        </Box>
    );
}