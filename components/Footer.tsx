import Container from "@mui/material/Container";
import {Avatar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {Copyright} from "@/components/Copytight";
import * as React from "react";

export function Footer() {
    return <Container
        maxWidth="sm"
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <Avatar
            alt="github"
            src="/github-black.png"
            sx={{width: 35, height: 35, marginBottom: "1px"}}
        />
        <Typography variant="body1"
                    color="text.secondary"
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer"
                    }}
        >
            <Link
                underline="hover"
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "4px"

                }}
                color="inherit"
                href="https://github.com/ohadstoller/keto-app"
            >
                The Keto App
            </Link>
        </Typography>


        <Copyright/>
    </Container>;
}