
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Space, Box, View } from 'gui/uielements';
import { ConnectButton, useCoreContext } from 'core';
import { Image } from 'gui/uielements/Image';


const Home = (): React.ReactElement => {
    
    const navigate = useNavigate()
    const { isLoggedIn } = useCoreContext()
    
    // LIFECYCLE
    useEffect(() => {
        init()
        return function cleanup() {
            deinit()
        }
    }, [])

    const init = async () => {}

    const deinit = () => {}

    // EFFECTS
    const connection = () => {
        
    }
    useEffect(connection, [isLoggedIn])


    // RENDER
    
    return (
        <>
        <View
            flex
            center
            style={{
                padding: 32,
                flexDirection: 'column',
            }}
        >
            <Helmet>
                <title>{`Home`}</title>
            </Helmet>

            <View flex center column>
                <Image src="/images/branding.png" />
            </View>

            <Space size="m"/>

            <Box style={{ width: 500, maxWidth: '100%', textAlign: 'center' }}>
                
                <ConnectButton />
                
            </Box>
        </View>
        </>
    );
}

export default Home;