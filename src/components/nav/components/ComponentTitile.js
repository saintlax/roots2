export const ComponentTitle = (pathname) => {
  switch (pathname) {
    case '/dashboard':
      return 'Dashboard';
    case '/orders':
      return 'Orders';
    case '/products':
      return 'Products';
    case '/branches':
      return 'Branches';
    default:
      return 'Welcome';
  }
};
