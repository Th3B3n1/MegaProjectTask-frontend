import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/auth/AuthContext';

export function Profile() {
    const { user } = useAuth();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handlePasswordChange = () => {

    };

    return (
        <div className='grid auto-cols-auto gap-3'>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Profile</CardTitle>
                    <CardDescription>
                        See your profile details
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="currentPassword">Your username</Label>
                            {user?.name}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="newPassword">Your email address</Label>
                            <p>{user?.email}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Change Password</CardTitle>
                    <CardDescription>
                        Change your password by entering the current one
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" type="password" value={currentPassword} required onInput={e => setCurrentPassword(e.currentTarget.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" value={newPassword} required onInput={e => setNewPassword(e.currentTarget.value)} />
                        </div>
                        <Button type="submit" className="w-full" onClick={handlePasswordChange}>
                            Change password
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}