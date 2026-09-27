import React from 'react';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Mail, Phone, MapPin, Award, Calendar, Users, Star } from 'lucide-react';
import { Input } from '../../components/Input';
import { useTrainerProfile, useUpdateTrainerProfile } from '../../hooks/useTrainerProfile';
import { useTrainerDashboard } from '../../hooks/useTrainees';

export function TrainerProfile() {
  const profileQuery = useTrainerProfile();
  const updateProfile = useUpdateTrainerProfile();
  const dashboardQuery = useTrainerDashboard();
  const profile = profileQuery.data;
  const [form, setForm] = React.useState({
    fullName: '',
    phone: '',
    location: '',
    title: '',
    bio: '',
    specializations: '',
  });

  React.useEffect(() => {
    if (!profile) return;
    setForm({
      fullName: profile.fullName,
      phone: profile.phone,
      location: profile.location,
      title: profile.title,
      bio: profile.bio.join('\n'),
      specializations: profile.specializations.join(', '),
    });
  }, [profile]);

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync({
        fullName: form.fullName,
        phone: form.phone,
        location: form.location,
        title: form.title,
        bio: form.bio.split('\n').filter(Boolean),
        specializations: form.specializations.split(',').map((item) => item.trim()).filter(Boolean),
      });
    } catch {
      // The mutation error is shown next to the form.
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground mb-2">Trainer Profile</h1>
        <p className="text-muted-foreground">Manage your professional profile and credentials</p>
      </div>

      {profileQuery.isLoading && <p className="text-muted-foreground">Loading profile...</p>}
      {profileQuery.isError && <p role="alert" className="text-destructive">{profileQuery.error.message}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl mb-4 shadow-lg shadow-primary/30">
                {profile?.fullName.slice(0, 1) ?? 'T'}
              </div>

              <h2 className="text-foreground mb-1">{profile?.fullName ?? 'Trainer'}</h2>
              <p className="text-sm text-muted-foreground mb-3">{profile?.title ?? 'Personal Trainer'}</p>

              <div className="flex items-center gap-2 mb-4">
                <Badge variant="primary">{profile?.tier ?? 'Trainer'}</Badge>
                {profile?.isVerified && <Badge variant="success">Verified</Badge>}
              </div>

              <div className="w-full space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{profile?.email ?? ''}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{profile?.phone ?? ''}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{profile?.location ?? ''}</span>
                </div>
              </div>

              <div className="w-full space-y-3 text-left">
                <Input label="Name" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} />
                <Input label="Title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
                <Input label="Phone" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
                <Input label="Location" value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} />
                <Button variant="primary" className="w-full" onClick={handleSave} disabled={updateProfile.isPending || !profile}>
                  {updateProfile.isPending ? 'Saving...' : 'Save Profile'}
                </Button>
                {updateProfile.isError && <p role="alert" className="text-sm text-destructive">{updateProfile.error.message}</p>}
              </div>
            </div>
          </Card>

          <Card className="mt-6">
            <h3 className="text-foreground mb-4">Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Total Trainees</span>
                </div>
                <span className="text-foreground">{dashboardQuery.data?.totalTrainees ?? '--'}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Years Experience</span>
                </div>
                <span className="text-foreground">{profile?.yearsExperience ?? '--'}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="w-4 h-4" />
                  <span className="text-sm">Average Rating</span>
                </div>
                <span className="text-foreground">{profile?.averageRating ?? '--'}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">Certifications</span>
                </div>
                <span className="text-foreground">{profile?.certifications.length ?? '--'}</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-foreground mb-4">About Me</h3>
            {profile?.bio.map((paragraph) => <p key={paragraph} className="text-muted-foreground mb-4">{paragraph}</p>)}
            <label className="block text-sm text-muted-foreground mb-2" htmlFor="trainer-bio">Edit biography</label>
            <textarea id="trainer-bio" value={form.bio} onChange={(event) => setForm({ ...form, bio: event.target.value })} className="w-full min-h-24 p-3 bg-input border border-border rounded-lg text-foreground" />
          </Card>

          <Card>
            <h3 className="text-foreground mb-4">Certifications & Qualifications</h3>
            <div className="space-y-3">
              {(profile?.certifications ?? []).map((certification) => <div key={certification.id} className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-foreground mb-1">{certification.name}</p>
                  <p className="text-sm text-muted-foreground">{certification.issuer}</p>
                  <p className="text-xs text-muted-foreground mt-1">Issued: {certification.issuedYear} • Valid until: {certification.validUntilYear}</p>
                </div>
                <Badge variant={certification.status === 'Active' ? 'success' : 'danger'}>{certification.status}</Badge>
              </div>)}
            </div>
          </Card>

          <Card>
            <h3 className="text-foreground mb-4">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {form.specializations.split(',').map((item) => item.trim()).filter(Boolean).map((item) => (
                <Badge key={item} variant="primary">{item}</Badge>
              ))}
            </div>
            <Input label="Edit specializations (comma-separated)" value={form.specializations} onChange={(event) => setForm({ ...form, specializations: event.target.value })} />
          </Card>
        </div>
      </div>
    </div>
  );
}
