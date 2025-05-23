// GoogleAuthButton.tsx
import React from 'react';
import { Button } from '../../../packages/native';
import { useGoogleAuth } from './useGoogleAuth';

const GoogleAuthButton: React.FC = () => {
    const { signIn, signOut } = useGoogleAuth();

    return (
        <>
            <Button onClick={signIn}>Google Sign In</Button>
            <Button onClick={signOut}>Sign Out</Button>
        </>
    );
};

export { GoogleAuthButton };
