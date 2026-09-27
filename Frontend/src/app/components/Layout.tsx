import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { LayoutDashboard, Dumbbell, User, Bell, Menu, X, LogOut } from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/' },
  { icon: <Dumbbell className="w-5 h-5" />, label: 'Workouts', path: '/workouts' },
  { icon: <User className="w-5 h-5" />, label: 'Profile', path: '/profile' },
  { icon: <Bell className="w-5 h-5" />, label: 'Notifications', path: '/notifications' },
];

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden md:flex md:w-64 bg-sidebar border-r border-sidebar-border flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-lg">
              <Dumbbell className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-sidebar-foreground">GymFlow</h2>
              <p className="text-xs text-muted-foreground">Trainee Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive(item.path)
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground border border-primary/30 shadow-lg shadow-primary/10'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="md:hidden bg-sidebar border-b border-sidebar-border p-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 p-2 rounded-lg">
              <Dumbbell className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-sidebar-foreground">GymFlow</h2>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-sidebar-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-sidebar-foreground" />
            )}
          </button>
        </header>

        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-[#3d3d3d]/30 backdrop-blur-sm">
            <div className="absolute top-16 left-0 right-0 bottom-0 bg-sidebar border-t border-sidebar-border p-4 space-y-2 overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(item.path)
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground border border-primary/30 shadow-lg shadow-primary/10'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}

              <div className="pt-4 mt-4 border-t border-sidebar-border">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 p-6 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
