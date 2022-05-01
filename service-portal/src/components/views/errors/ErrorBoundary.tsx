import React from 'react';
import { Link } from 'react-router-dom';
import { Heading } from '../../typography';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  async handleRefreshClick() {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
      });
    });

    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          return caches.delete(key);
        }),
      );
    });

    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Heading className="w-full text-center mt-10">
          There was an error{' '}
          <Link to="/" onClick={this.handleRefreshClick}>
            Click here
          </Link>{' '}
          to back to the home page.
        </Heading>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
