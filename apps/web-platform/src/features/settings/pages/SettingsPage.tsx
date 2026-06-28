import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useThemeStore } from '../../../store/theme';
import { useTranslation } from 'react-i18next';
import { User, Shield, Bell, Eye, Monitor, Globe, Volume2, HelpCircle, Save } from 'lucide-react';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const { theme, setTheme } = useThemeStore();
  const { i18n } = useTranslation();

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Eye },
    { id: 'display', label: 'Display & Theme', icon: Monitor },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'audio', label: 'Audio', icon: Volume2 },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  } as any;

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring" } }
  } as any;

  return (
    <div className="flex flex-col md:flex-row gap-8 animate-fade-in pb-12">
      {/* Settings Sidebar */}
      <div className="w-full md:w-64 shrink-0 space-y-1">
        <h1 className="text-3xl font-display font-bold mb-6 px-2">Settings</h1>
        <div className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-primary text-primary-foreground font-medium shadow-md' 
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <tab.icon className="w-5 h-5 shrink-0" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Settings Content Area */}
      <motion.div 
        key={activeTab}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 max-w-3xl space-y-6"
      >
        {activeTab === 'account' && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your profile details and public identity.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input defaultValue="Ahmed_Z" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input type="email" defaultValue="ahmed@lametna.com" disabled className="bg-muted" />
                  <p className="text-xs text-muted-foreground">To change your email, please verify your identity first.</p>
                </div>
                <div className="pt-4 border-t border-border mt-6">
                  <Button className="w-full sm:w-auto"><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6 border-destructive/50 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Permanent actions that cannot be undone.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive">Delete Account</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'display' && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Display & Theme</CardTitle>
                <CardDescription>Customize the look and feel of Lametna.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <label className="text-sm font-medium">Theme Preference</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'light', label: 'Light', icon: '☀️' },
                      { id: 'dark', label: 'Dark', icon: '🌙' },
                      { id: 'system', label: 'System', icon: '💻' }
                    ].map((tOpt) => (
                      <div 
                        key={tOpt.id}
                        onClick={() => setTheme(tOpt.id as any)}
                        className={`border-2 rounded-xl p-4 cursor-pointer flex flex-col items-center gap-2 transition-all ${
                          theme === tOpt.id ? 'border-primary bg-primary/10' : 'border-border hover:border-muted-foreground/50 bg-card'
                        }`}
                      >
                        <span className="text-2xl">{tOpt.icon}</span>
                        <span className="font-medium">{tOpt.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'language' && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Language</CardTitle>
                <CardDescription>Change the platform language. This will also update text direction (LTR/RTL).</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    onClick={() => i18n.changeLanguage('en')}
                    className={`border-2 rounded-xl p-4 cursor-pointer flex items-center justify-between transition-all ${
                      i18n.language === 'en' ? 'border-primary bg-primary/10' : 'border-border hover:border-muted-foreground/50 bg-card'
                    }`}
                  >
                    <span className="font-medium text-lg">English</span>
                    {i18n.language === 'en' && <div className="w-3 h-3 rounded-full bg-primary" />}
                  </div>
                  <div 
                    onClick={() => i18n.changeLanguage('ar')}
                    className={`border-2 rounded-xl p-4 cursor-pointer flex items-center justify-between transition-all font-sans ${
                      i18n.language === 'ar' ? 'border-primary bg-primary/10' : 'border-border hover:border-muted-foreground/50 bg-card'
                    }`}
                    dir="rtl"
                  >
                    <span className="font-medium text-lg">العربية</span>
                    {i18n.language === 'ar' && <div className="w-3 h-3 rounded-full bg-primary" />}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
}
