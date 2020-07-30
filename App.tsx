import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Onboarding } from './src/Authentication/Onboarding';
import { LoadAssets } from './src/components';

const fonts = {
    Bold: require('./assets/fonts/SF-Pro-Text-Bold.otf'),
    Semibold: require('./assets/fonts/SF-Pro-Text-Semibold.otf'),
    Regular: require('./assets/fonts/SF-Pro-Text-Regular.otf'),
};

const AuthenticationStack = createStackNavigator();
const AuthenticationNavigator = () => (
    <AuthenticationStack.Navigator headerMode='none'>
        <AuthenticationStack.Screen name='Onboarding' component={Onboarding} />
    </AuthenticationStack.Navigator>
);

export default function App() {
    return (
        <LoadAssets {...{ fonts }}>
            <AuthenticationNavigator />
        </LoadAssets>
    );
}
