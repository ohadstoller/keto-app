import {Stack, Switch} from "@mui/material";
import LightMode from "@mui/icons-material/LightMode";
import DarkMode from "@mui/icons-material/DarkMode";
import * as React from "react";

export function SwitchTheme(props: { checked: boolean, onChange: () => void }) {
    return <Stack direction="row" spacing={1} alignItems="center">
        <LightMode/>
        <Switch
            checked={props.checked}
            onChange={props.onChange}
            inputProps={{"aria-label": "controlled"}}
        />
        <DarkMode/>
    </Stack>;
}