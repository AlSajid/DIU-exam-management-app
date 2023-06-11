'use client';
import Link from 'next/link';
import { options } from './options';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className='h-screen w-64 bg-emerald-950 py-3 flex items-center '>
      <ul className='w-full'>
        {options.map((option, i) => (
          <li
            key={option.name}
            className={
              pathname === '/' + option.name.toLowerCase() ? 'bg-emerald-100 text-emerald-950 font-bold' : ''
            }>
            <Link
              href={option.name.toLowerCase()}
              className='flex items-center p-3'>
              <span>{option.icon}</span>
              <span className='ml-3'>{option.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
