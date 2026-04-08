import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100svh] lg:min-h-0 lg:py-24 flex items-center justify-center overflow-hidden bg-brand-navy">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop" 
          alt="Premium Commercial Real Estate" 
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-navy/50 to-brand-navy"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-20 pb-12 lg:pt-0 lg:pb-0">
        {/* Left Column: Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold leading-tight mb-4 text-white">
            Управление инвестициями в коммерческую недвижимость Беларуси
          </h1>
          
          <div className="h-1 w-24 bg-brand-gold mb-6"></div>
          
          <p className="text-lg md:text-xl text-gray-300 font-light mb-8 leading-relaxed">
            <span className="text-brand-gold font-medium">Пассивный доход «под ключ».</span> От подбора высоколиквидных объектов на закрытых торгах до ежемесячных дивидендов.
          </p>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToCalculator}
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-brand-gold text-brand-navy font-semibold text-lg overflow-hidden transition-all hover:bg-brand-gold-light rounded-sm"
          >
            <span className="relative z-10 flex items-center gap-2">
              Рассчитать доходность объекта
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>

        {/* Right Column: Premium Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative w-full aspect-[4/5] max-h-[60vh] max-w-lg mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop" 
              alt="Premium Commercial Interior" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Warm tint overlay to remove excess gray/blue */}
            <div className="absolute inset-0 bg-brand-gold/10 mix-blend-overlay pointer-events-none"></div>
            {/* Subtle inner gradient and border for premium feel */}
            <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] rounded-3xl pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none"></div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Gold Accent */}
      <div className="absolute right-0 top-0 w-1/3 h-full opacity-20 pointer-events-none">
        <div className="absolute right-[-20%] top-[-10%] w-full h-[120%] bg-brand-gold transform rotate-12 blur-3xl"></div>
      </div>
    </section>
  );
};
