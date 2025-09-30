import { LampContainer } from '@/components/custom/lamp-container.tsx';
import { Button } from '@/components/ui/button.tsx';
import { motion } from 'motion/react';
import { NavLink } from 'react-router';

export function NotFound() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center font-medium text-4xl text-transparent tracking-tight md:text-7xl"
      >
        404 - Page Not Found
      </motion.h1>
      <motion.p
        initial={{ opacity: 0.5, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="mt-4 text-center text-slate-400"
      >
        The page you are looking for does not exist.
      </motion.p>
      <motion.div
        initial={{ opacity: 0.5, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.7,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="mt-8"
      >
        <Button variant={'outline'} asChild>
          <NavLink to="/">Go Home</NavLink>
        </Button>
      </motion.div>
    </LampContainer>
  );
}
