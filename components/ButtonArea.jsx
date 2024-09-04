"use client"

import { logout } from '@/lib/actions/user.actions';
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

function ButtonArea() {
    const router = useRouter()
    async function logoutAccount() {
        await logout();

        router.push("/sign-in")
    }

    return (
        <div>
            <Button onClick={logoutAccount}>Log out</Button>
        </div>
    )
}

export default ButtonArea