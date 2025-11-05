// User dashboard mock data (lightweight)
export const userCases = [
  { id: 'CR001', type: 'Theft', location: 'MG Road, Bangalore', status: 'under-review', priority: 'high', date: '2 days ago', officer: 'Inspector Kumar', progress: 60 },
  { id: 'CR002', type: 'Vehicle Theft', location: 'Indiranagar', status: 'assigned', priority: 'urgent', date: '5 hours ago', officer: 'Officer Sharma', progress: 30 },
  { id: 'CR003', type: 'Cyber Crime', location: 'Electronic City', status: 'resolved', priority: 'medium', date: '1 week ago', officer: 'Inspector Patel', progress: 100 },
];

export const alerts = [
  { id: 1, type: 'Missing Person', location: 'Nearby - 2km', time: '15 mins ago', severity: 'urgent' },
  { id: 2, type: 'Vehicle Theft Alert', location: 'Your area', time: '1 hour ago', severity: 'high' },
  { id: 3, type: 'Safety Advisory', location: 'Koramangala', time: '3 hours ago', severity: 'info' },
];

export const communityPosts = [
  { id: 1, user: 'Priya S.', avatar: 'P', post: 'Suspicious activity near Park Street. Stay alert!', time: '10 mins ago', likes: 12, comments: 5 },
  { id: 2, user: 'Rajesh K.', avatar: 'R', post: 'Found a lost wallet near Metro Station. Contact me if yours.', time: '1 hour ago', likes: 28, comments: 8 },
  { id: 3, user: 'Anita M.', avatar: 'A', post: 'Thanks to CrimeNet, my stolen bike was recovered!', time: '3 hours ago', likes: 45, comments: 12 },
];
