export const getComponentTitle = (pathname) => {
  switch (pathname) {
    case '/dashboard':
      return 'Dashboard';
    case '/users':
      return 'Users';
    case '/merchants':
      return 'Merchants';
    case '/transactions':
      return 'Transactions';
    case '/loans':
      return 'Loans';
    case '/settings':
      return 'Settings';
    case '/roles':
      return 'Roles';

    default:
      return 'Welcome';
  }
};
