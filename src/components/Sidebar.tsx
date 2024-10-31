import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Mail,
  Inbox,
  Star,
  Send,
  File,
  Settings,
  LogOut,
  Plus,
  Workflow,
} from 'lucide-react';

interface SidebarProps {
  onCompose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCompose }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: Inbox, label: 'Inbox', path: '/dashboard/inbox', count: 24 },
    { icon: Star, label: 'Important', path: '/dashboard/important', count: 5 },
    { icon: Send, label: 'Sent', path: '/dashboard/sent' },
    { icon: File, label: 'Drafts', path: '/dashboard/drafts', count: 2 },
    { icon: Workflow, label: 'Workflows', path: '/workflows' },
  ];

  return (
    <div className="w-64 bg-white h-screen flex flex-col border-r border-gray-200">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center">
            <Mail className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            Email AI
          </span>
        </div>

        <button
          onClick={onCompose}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-xl hover:from-pink-600 hover:to-violet-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Compose</span>
        </button>

        <nav className="mt-8 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors ${
                  isActive ? 'bg-primary/10 text-primary' : ''
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
              {item.count && (
                <span className="ml-auto bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                  {item.count}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={user?.picture || `https://ui-avatars.com/api/?name=${user?.name}`}
              alt={user?.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">{user?.name}</span>
              <span className="text-xs text-gray-500">{user?.email}</span>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors ${
                isActive ? 'bg-primary/10 text-primary' : ''
              }`
            }
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </NavLink>
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;