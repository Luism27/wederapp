import { Box, Container } from '@material-ui/core'
import React from 'react'
import Appbar from './Appbar'

const Layout = (props) => {
    return (
        <>
            <Appbar />
            <Container>
                <Box my={8}>
                    {props.children}
                </Box>
            </Container>
        </>
    )
}

export default Layout
