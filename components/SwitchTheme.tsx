import {Stack, Switch} from "@mui/material";
import LightMode from "@mui/icons-material/LightMode";
import DarkMode from "@mui/icons-material/DarkMode";
import * as React from "react";
import Container from "@mui/material/Container";

export function SwitchTheme(props: { checked: boolean, onChange: () => void }) {
    return <Container
        sx={{
            minWidth: '100vw',
            position: 'relative',
            height: '0px',
        }}
    >
        <Stack direction="row" spacing={2} alignItems="center"
               justifyContent="flex-end"
               sx={{
                   position: 'absolute',
                   top: '0',
                   right: '0',
                   marginTop: '0.6vh',
                   marginRight: '1.4vw',
               }}
        >
            <LightMode
                color='primary'/>

            <Switch
                checked={props.checked}
                onChange={props.onChange}
                inputProps={{"aria-label": "controlled"}}
            />
            <DarkMode
                color='primary'
            />
        </Stack>

    </Container>

}