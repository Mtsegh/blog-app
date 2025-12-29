import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Save, LogOut, User, Lock, Bell, Edit } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-3xl space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and security
          </p>
        </div>

        {/* Profile Settings */}
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <User className="h-5 w-5" /> Profile
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Your full name" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
            </div>

            <Button onClick={() => {navigate("/edit-profile")}} className="mt-4 gap-2">
              <Edit className="h-4 w-4" /> Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <Lock className="h-5 w-5" /> Security
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-factor authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
              <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
            </div>

            <Button onClick={() => {navigate("/forgot-password")}} variant="outline">Change Password</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <Bell className="h-5 w-5" /> Notifications
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive updates via email
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="rounded-2xl border-destructive/40">
          <CardContent className="p-6 space-y-4">
            <p className="text-lg font-medium text-destructive">Danger Zone</p>
            <Button onClick={() => {navigate("/logout")}} variant="destructive" className="gap-2">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
