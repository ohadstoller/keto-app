import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import * as React from "react";

export function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link
                underline='hover'
                color="inherit"
                href="https://github.com/ohadstoller"
            >
                Ohad Mark Stoller
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}