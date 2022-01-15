import {Stack, Switch} from "@mui/material";
import LightMode from "@mui/icons-material/LightMode";
import DarkMode from "@mui/icons-material/DarkMode";
import * as React from "react";

export function SwitchTheme(props: { checked: boolean, onChange: () => void }) {
    return <Stack direction="row" spacing={2} alignItems="center"
                  justifyContent="flex-end"
                  sx={{
                      marginTop: '2px',
                      marginRight: '3vw'

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

    </Stack>;
}