import React from 'react';

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Pokémon Trainer App</h1>
        <nav>
          <a href="/">Home</a> | <a href="/trainer">Trainer</a> | <a href="/api-test">API Test</a>
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
