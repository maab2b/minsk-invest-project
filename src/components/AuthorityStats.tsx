import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '6000 м²', label: 'В управлении', desc: 'Из которых ~2000 м² составляют торговые площади и стрит-ритейл, остальные — офисные.' },
  { value: '>10 лет', label: 'Опыта на рынке', desc: 'Глубокое знание рынка коммерческой недвижимости Минска и процессов модернизации.' },
  { value: '100%', label: 'Заполняемость', desc: 'Объекты сданы на 100% в течение 95% времени благодаря грамотной ротации арендаторов.' },
  { value: '11-12.5%', label: 'Целевая доходность ROI', desc: 'Стабильный пассивный доход, превышающий ставки по банковским депозитам.' },
];

export const AuthorityStats = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-brand-navy relative z-10">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-sans font-bold leading-tight mb-4">
            Масштаб и <span className="text-brand-gold">Опыт</span>
          </h2>
          <div className="h-0.5 w-full max-w-3xl bg-brand-navy-light relative">
            <div className="absolute left-0 top-0 h-full w-24 bg-brand-gold"></div>
          </div>
          <p className="mt-8 text-lg text-gray-300 max-w-3xl font-light leading-relaxed">
            Мы прошли путь от организации ремонтов и сопровождения перепланировок до комплексного редевелопмента недвижимости. Сегодня обеспечиваем стабильный пассивный доход нашим инвесторам.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-navy-light/50 border border-brand-navy-light p-6 hover:border-brand-gold/30 transition-colors group"
            >
              <div className="text-4xl lg:text-5xl font-sans font-bold text-brand-gold mb-3 group-hover:scale-105 transition-transform origin-left">
                {stat.value}
              </div>
              <h3 className="text-xl font-medium text-white mb-3">{stat.label}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
