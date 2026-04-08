import React from 'react';
import { motion } from 'framer-motion';
import { Search, Hammer, Users, Key } from 'lucide-react';

const steps = [
  {
    icon: <Search className="w-8 h-8" />,
    title: 'Аудит и подбор',
    desc: 'Находим подходящие объекты для покупки, рассчитываем вложения, доходность, окупаемость и сопровождаем сделку.',
  },
  {
    icon: <Hammer className="w-8 h-8" />,
    title: 'Редевелопмент',
    desc: 'Реализуем проект: ремонт, восстановление, перепланировка или разделение объекта для существенного повышения ликвидности.',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Брокеридж',
    desc: 'Поиск и заселение надежных арендаторов (в среднем занимает 1-2 месяца). Составление и подписание защищенных договоров.',
  },
  {
    icon: <Key className="w-8 h-8" />,
    title: 'Управление',
    desc: 'Следим за расчетами, представляем интересы в Товариществе собственников, решаем технические проблемы и корректируем ставки.',
  },
];

export const InvestmentCycle = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-brand-navy-light relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl lg:text-4xl font-sans font-bold leading-tight mb-6">
            Цикл <span className="text-brand-gold">инвестиций</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto font-light border-l-2 border-brand-gold pl-6 text-left md:text-center md:border-l-0 md:border-t-2 md:pt-6 md:pl-0 flex flex-col gap-4">
            <span>Обычно мы ведем весь процесс инвестиций с нуля, гарантируя прозрачность на каждом этапе.</span>
            <span className="font-medium text-white">Вы не касаетесь рутины — только получаете дивиденды.</span>
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-brand-navy border-t border-dashed border-brand-gold/50"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.15 } }}
                viewport={{ once: true }}
                className="relative flex flex-col items-center text-center cursor-default"
              >
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2, transition: { duration: 0.4, ease: "easeInOut" } }}
                  className="w-24 h-24 rounded-full bg-brand-navy border-2 border-brand-gold flex items-center justify-center text-brand-gold mb-6 relative z-10 shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-4 text-white">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
