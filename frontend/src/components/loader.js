import { Box, CircularProgress } from '@mui/material';

function Loading(){
    return(
        <Box display='flex' height='100vh' alignItems={'center'} justifyContent={'center'}>
            <CircularProgress size={75}/>
        </Box>
    )
}

export default Loading;