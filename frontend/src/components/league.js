import React, { useEffect } from "react";
import { Stack, Typography, Box } from "@mui/material";

const League = (props) => {
    const { name, logo, amount } = props;
    return (
        <>
            <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
                <Box
                    component='img'
                    sx={{ height: '60px' }}
                    src={logo}
                />
                <Typography display={'flex'} alignItems={'center'} justifyContent={'center'} variant="h4" >{name}</Typography>
            </Stack>
            <Typography >Games Watched: {amount}</Typography>
        </>
    )
}

export default League;