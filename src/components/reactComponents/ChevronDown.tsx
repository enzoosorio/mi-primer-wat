import React from 'react';

const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 16.5l-8-8h16l-8 8z" />
  </svg>
);

export default ChevronDown;