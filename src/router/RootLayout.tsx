import React from 'react';
import { Link } from 'react-router-dom';

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Pokémon Trainer App</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/trainer">Trainer</Link> | <Link to="/api-test">API Test</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2025 Pokémon Trainer App</p>
      </footer>
    </div>
  );
};

export default RootLayout;
