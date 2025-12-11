import { motion } from 'framer-motion'
import { Loader2, Sparkles, Smartphone } from 'lucide-react'

interface SpinnerProps {
  size?: number | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'dots' | 'pulse' | 'tech'
  message?: string
  fullScreen?: boolean
}

const Spinner = ({ 
  size = 'md', 
  variant = 'default', 
  message,
  fullScreen = false 
}: SpinnerProps) => {
  
  // Handle both string sizes and numeric sizes
  const getSizeConfig = (sizeProp: number | string) => {
    // If size is a number, use it directly
    if (typeof sizeProp === 'number') {
      return {
        container: `h-${sizeProp} w-${sizeProp}`,
        icon: `h-${sizeProp / 2} w-${sizeProp / 2}`
      }
    }

    // Handle string sizes
    const sizeMap: Record<string, { container: string; icon: string }> = {
      sm: { container: 'h-8 w-8', icon: 'h-4 w-4' },
      md: { container: 'h-12 w-12', icon: 'h-6 w-6' },
      lg: { container: 'h-16 w-16', icon: 'h-8 w-8' },
      xl: { container: 'h-20 w-20', icon: 'h-10 w-10' }
    }

    // Default to 'md' if size is not in the map
    return sizeMap[sizeProp] || sizeMap['md']
  }

  const sizeConfig = getSizeConfig(size)

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex items-center justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-2 w-2 bg-primary-600 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        )

      case 'pulse':
        return (
          <div className="relative">
            <motion.div
              className={`${sizeConfig.container} bg-primary-600 rounded-lg`}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            />
            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-white" />
          </div>
        )

      case 'tech':
        return (
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className={`${sizeConfig.container} border-2 border-primary-200 border-t-primary-600 rounded-full`}
            />
            <Smartphone className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary-600" />
          </div>
        )

      default:
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className={sizeConfig.container}
          >
            <Loader2 className={`${sizeConfig.icon} text-primary-600 animate-spin`} />
          </motion.div>
        )
    }
  }

  const content = (
    <div className="flex flex-col items-center justify-center">
      {renderSpinner()}
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-gray-600 text-center max-w-xs"
        >
          {message}
        </motion.p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center">
          {content}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-sm text-gray-500"
          >
            Loading Bright TechMart...
          </motion.p>
        </div>
      </div>
    )
  }

  return content
}

export default Spinner