import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogIn } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Logo from '../components/ui/Logo'
import { useAuth } from '../context/AuthContext'

const schema = z.object({ full_name: z.string().min(2, 'Name must be at least 2 characters'), email: z.string().email('Enter a valid email'), password: z.string().min(6, 'Password must be at least 6 characters') })
type FormData = z.infer<typeof schema>

export default function Register() {
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    const { error } = await signUp(data.email, data.password, data.full_name)
    setLoading(false)
    if (error) { toast.error(error); return }
    toast.success('Account created! Welcome to Myclientwork.'); navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50/50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl p-8">
          <div className="flex justify-center mb-6"><Logo /></div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Create Account</h1>
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-1 mb-6">Join thousands of developers</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Full Name" placeholder="John Doe" error={errors.full_name?.message} {...register('full_name')} />
            <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
            <Input label="Password" type="password" placeholder="••••••••" error={errors.password?.message} {...register('password')} />
            <Button type="submit" size="lg" disabled={loading} className="w-full">{loading ? 'Creating account...' : 'Create Account'}<LogIn size={16} /></Button>
          </form>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">Already have an account? <Link to="/login" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">Sign in</Link></p>
        </div>
      </motion.div>
    </div>
  )
}
