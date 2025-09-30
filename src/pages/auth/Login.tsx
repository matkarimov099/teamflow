import {
  CustomCard,
  CustomCardDescription,
  CustomCardTitle,
} from '@/components/custom/custom-card.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import { LoginForm } from '@/features/auth/components/LoginForm.tsx';
import { isAuthenticated } from '@/lib/auth';
import { KeyRound } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  // Agar foydalanuvchi allaqachon login qilgan bo'lsa, dashboard ga yo'naltirish
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken');
      if (token && isAuthenticated()) {
        navigate('/dashboard', { replace: true });
      } else {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Agar hali tekshirilayotgan bo'lsa, hech narsa ko'rsatmaslik
  if (isChecking) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: [0.2, 0.9, 0.25, 1], // smooth cubic-bezier
      }}
      className="w-full"
    >
      <CustomCard className="border border-[var(--border)]/50 bg-[var(--card-bg)]/80 shadow-2xl backdrop-blur-xl md:max-w-md">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: 'backOut' }}
            className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--system-blue)] to-[var(--system-blue)]/80 shadow-lg"
          >
            <KeyRound className="h-8 w-8 text-white" />
          </motion.div>
          <Typography variant="large" align="center">
            Welcome Back
          </Typography>
        </div>
        <CustomCardTitle className="mb-2 text-center font-semibold text-[var(--label)] text-xl">
          Sign in to your account
        </CustomCardTitle>
        <LoginForm />
        <CustomCardDescription>
          <div className="mt-2 border-[var(--border)]/30 border-t pt-4 text-center text-sm">
            <span className="text-[var(--secondaryLabel)]">Don't have an account? </span>
            <NavLink
              to="/register"
              className="font-medium text-[var(--system-blue)] transition-colors duration-200 hover:text-[var(--system-blue)]/80"
            >
              Sign up
            </NavLink>
          </div>
        </CustomCardDescription>
      </CustomCard>
    </motion.div>
  );
};

export default Login;
