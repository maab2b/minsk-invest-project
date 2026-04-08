import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

export const FinalCta = () => {
  return (
    <section className="relative pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-24 bg-brand-navy overflow-hidden border-t border-brand-navy-light">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold rounded-full mix-blend-screen filter blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-gold-light rounded-full mix-blend-screen filter blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-extrabold text-white mb-6 leading-tight">
              Готовы обсудить формирование вашего <span className="text-brand-gold">инвестиционного портфеля?</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-300 font-light mb-8 leading-relaxed max-w-3xl mx-auto">
              Приглашаем на персональную стратегическую встречу в Минске. Проведем аудит ваших целей, разберем закрытые лоты и составим индивидуальную финансовую модель.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 bg-brand-navy-light/50 backdrop-blur-md border border-brand-gold/30 rounded-2xl p-6 md:p-8 shadow-2xl"
          >
            <a href="tel:+375293333560" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-brand-navy border border-brand-gold flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-400 mb-1">Телефон</div>
                <div className="text-xl font-medium text-white group-hover:text-brand-gold transition-colors">+375 29 333-35-60</div>
              </div>
            </a>

            <div className="hidden md:block w-px h-16 bg-brand-navy-light"></div>

            <a href="mailto:maab2b@gmail.com" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-brand-navy border border-brand-gold flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-400 mb-1">Электронная почта</div>
                <div className="text-xl font-medium text-white group-hover:text-brand-gold transition-colors">maab2b@gmail.com</div>
              </div>
            </a>
          </motion.div>

          <div className="mt-12 flex items-center justify-center gap-2 text-gray-400">
            <MapPin className="w-5 h-5 text-brand-gold" />
            <span>Минск, Беларусь</span>
          </div>
        </div>
      </div>
    </section>
  );
};
