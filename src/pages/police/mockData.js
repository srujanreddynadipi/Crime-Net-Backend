// Mock Data extracted from PoliceDashboard.jsx
export const mockCases = [
  { id: 'CR001', type: 'Theft', location: 'MG Road, Bangalore', status: 'new', priority: 'high', time: '5 mins ago', reporter: 'Priya S.', evidence: 3 },
  { id: 'CR002', type: 'Assault', location: 'Jubilee Hills, Hyderabad', status: 'in-progress', priority: 'urgent', time: '15 mins ago', reporter: 'Rajesh K.', evidence: 5 },
  { id: 'CR003', type: 'Missing Person', location: 'Connaught Place, Delhi', status: 'new', priority: 'urgent', time: '30 mins ago', reporter: 'Anita P.', evidence: 2 },
  { id: 'CR004', type: 'Vehicle Theft', location: 'Marine Drive, Mumbai', status: 'resolved', priority: 'medium', time: '2 hours ago', reporter: 'Vikram M.', evidence: 4 },
  { id: 'CR005', type: 'Cyber Crime', location: 'Electronic City, Bangalore', status: 'in-progress', priority: 'high', time: '1 hour ago', reporter: 'Sneha R.', evidence: 6 },
];

export const mockMessages = [
  { id: 1, user: 'Priya S.', message: 'Officer, any update on my theft case?', time: '2 mins ago', unread: true },
  { id: 2, user: 'Rajesh K.', message: 'Thank you for the quick response!', time: '10 mins ago', unread: false },
  { id: 3, user: 'Anita P.', message: 'I have additional evidence to share', time: '25 mins ago', unread: true },
];

export const mockHotspots = [
  { area: 'MG Road', crimes: 45, trend: 'up', percentage: 12 },
  { area: 'Jubilee Hills', crimes: 32, trend: 'down', percentage: 8 },
  { area: 'Electronic City', crimes: 28, trend: 'up', percentage: 5 },
  { area: 'Connaught Place', crimes: 38, trend: 'stable', percentage: 0 },
];
