import React from 'react'

const NavItem = ({ text, onClick }) => {
    return (<div
      className="text-white hover:text-blue-400 flex items-center group cursor-pointer"
      onClick={onClick}
    >
      {text}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180 ml-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </div>)
}
export default NavItem
