import React from 'react';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { User, Mail, Phone, MapPin, Award, Calendar, Users, Star } from 'lucide-react';

export function TrainerProfile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground mb-2">Trainer Profile</h1>
        <p className="text-muted-foreground">Manage your professional profile and credentials</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl mb-4 shadow-lg shadow-primary/30">
                👩‍🏫
              </div>

              <h2 className="text-foreground mb-1">Sarah Johnson</h2>
              <p className="text-sm text-muted-foreground mb-3">Certified Personal Trainer</p>

              <div className="flex items-center gap-2 mb-4">
                <Badge variant="primary">Elite Trainer</Badge>
                <Badge variant="success">Verified</Badge>
              </div>

              <div className="w-full space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>sarah.johnson@gymflow.com</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>

              <Button variant="primary" className="w-full">
                Edit Profile
              </Button>
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
                <span className="text-foreground">42</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Years Experience</span>
                </div>
                <span className="text-foreground">8</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="w-4 h-4" />
                  <span className="text-sm">Average Rating</span>
                </div>
                <span className="text-foreground">4.9</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">Certifications</span>
                </div>
                <span className="text-foreground">5</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-foreground mb-4">About Me</h3>
            <p className="text-muted-foreground mb-4">
              Passionate fitness professional with over 8 years of experience helping clients achieve
              their health and fitness goals. Specialized in strength training, weight loss, and
              athletic performance enhancement.
            </p>
            <p className="text-muted-foreground">
              I believe in creating personalized workout programs that are both effective and
              enjoyable, ensuring long-term success for my clients. My approach combines scientific
              principles with practical application to deliver outstanding results.
            </p>
          </Card>

          <Card>
            <h3 className="text-foreground mb-4">Certifications & Qualifications</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-foreground mb-1">Certified Personal Trainer (CPT)</p>
                  <p className="text-sm text-muted-foreground">National Academy of Sports Medicine (NASM)</p>
                  <p className="text-xs text-muted-foreground mt-1">Issued: 2018 • Valid until: 2026</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>

              <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-foreground mb-1">Nutrition Coaching Specialist</p>
                  <p className="text-sm text-muted-foreground">Precision Nutrition</p>
                  <p className="text-xs text-muted-foreground mt-1">Issued: 2019 • Valid until: 2027</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>

              <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-foreground mb-1">Functional Movement Specialist</p>
                  <p className="text-sm text-muted-foreground">Functional Movement Systems (FMS)</p>
                  <p className="text-xs text-muted-foreground mt-1">Issued: 2020 • Valid until: 2025</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>

              <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-foreground mb-1">CPR & First Aid Certification</p>
                  <p className="text-sm text-muted-foreground">American Red Cross</p>
                  <p className="text-xs text-muted-foreground mt-1">Issued: 2024 • Valid until: 2026</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>

              <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-foreground mb-1">Sports Performance Coach</p>
                  <p className="text-sm text-muted-foreground">International Sports Sciences Association (ISSA)</p>
                  <p className="text-xs text-muted-foreground mt-1">Issued: 2021 • Valid until: 2027</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-foreground mb-4">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">Strength Training</Badge>
              <Badge variant="primary">Weight Loss</Badge>
              <Badge variant="primary">Athletic Performance</Badge>
              <Badge variant="primary">Functional Training</Badge>
              <Badge variant="primary">HIIT</Badge>
              <Badge variant="primary">Nutrition Coaching</Badge>
              <Badge variant="primary">Injury Prevention</Badge>
              <Badge variant="primary">Mobility & Flexibility</Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
