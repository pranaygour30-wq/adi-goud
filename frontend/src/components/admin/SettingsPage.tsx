import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Save } from 'lucide-react';

export function SettingsPage() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save settings');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-primary">Settings</h2>
        <p className="text-muted-foreground">Manage application settings and preferences</p>
      </div>

      {/* Organization Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
          <CardDescription>Update organization information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="org-name">Organization Name</Label>
              <Input id="org-name" defaultValue="Adi Goud Brahmin Mahasabha" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-email">Contact Email</Label>
              <Input id="org-email" type="email" defaultValue="contact@agbmahasabha.org" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-phone">Contact Phone</Label>
              <Input id="org-phone" defaultValue="+91 9876543210" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-address">Address</Label>
              <Textarea
                id="org-address"
                defaultValue="123 Community Hall Road, Hyderabad, Telangana 500001"
                rows={3}
              />
            </div>
            <Button type="submit" className="gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Configure email notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>New Member Registration</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails when new members register
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Event Registrations</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails when members register for events
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly Reports</Label>
              <p className="text-sm text-muted-foreground">
                Receive weekly activity summary emails
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>Application behavior and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-approve Members</Label>
              <p className="text-sm text-muted-foreground">
                Automatically approve new member registrations
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">
                Temporarily disable public access to the website
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Member Directory Public</Label>
              <p className="text-sm text-muted-foreground">
                Allow members to view the member directory
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions - use with caution</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Export All Data</Label>
              <p className="text-sm text-muted-foreground">
                Download a copy of all data in JSON format
              </p>
            </div>
            <Button variant="outline">Export</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-destructive">Clear All Gallery Images</Label>
              <p className="text-sm text-muted-foreground">
                Permanently delete all images from the gallery
              </p>
            </div>
            <Button variant="outline" className="border-destructive text-destructive hover:bg-red-50">
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
