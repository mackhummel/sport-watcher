import React from "react";
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Container, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const Home = (props) => {
    const { watched } = props;
    return (
        <Container maxWidth='xl'>
            <Typography variant='h5'>Total of watched: {watched}</Typography>
            <Stack direction='row' sx={{ marginTop: 2 }} spacing={2}>
                <Link to='/nfl'>
                    <Card sx={{ marginTop: 2, maxWidth: 300, cursor: 'pointer' }}>
                        <CardMedia
                            sx={{ height: 300, width: 300 }}
                            image="/nfl_logo.png"
                            title="NFL"
                        />
                        <CardContent sx={{ background: grey[800] }}>
                            <Typography gutterBottom variant="h5" component="div">
                                NFL
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
                <Link to='/ncaaf'>
                    <Card sx={{ marginTop: 2, maxWidth: 300, cursor: 'pointer' }}>
                        <CardMedia
                            sx={{ height: 300, width: 300 }}
                            image="/ncaaf_logo.png"
                            title="NCAA Football"
                        />
                        <CardContent sx={{ background: grey[800] }}>
                            <Typography gutterBottom variant="h5" component="div">
                                NCAA Football
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
            </Stack>
        </Container>
    );


}
export default Home;