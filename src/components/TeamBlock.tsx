import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const teamData = [
  {
    title: "Управляющий активами",
    name: "Алексей Макаревич",
    desc: "Отвечает за операционное управление объектами, поиск арендаторов. Специализируется на создании пассивного дохода «под ключ» для инвесторов.",
    image: "https://picsum.photos/seed/alexei/400/500?grayscale"
  },
  {
    title: "Руководитель проектов",
    name: "Павел Климович",
    desc: "Эксперт в области редевелопмента и ремонта коммерческих объектов. Обеспечивает качество и своевременное выполнение проектов, повышая ликвидность недвижимости.",
    image: "https://picsum.photos/seed/pavel/400/500?grayscale"
  },
  {
    title: "Бухгалтер",
    name: "Ольга Ушкевич",
    desc: "Обеспечивает безупречную финансовую прозрачность и налоговую оптимизацию, превращая сложные расчеты в стабильную прибыль инвестора.",
    image: "https://picsum.photos/seed/olga1/400/500?grayscale"
  },
  {
    title: "Инженер",
    name: "Сергей Мельник",
    desc: "Техническое сердце объектов: гарантирует безукоризненное состояние инженерных систем и надежную эксплуатацию каждого квадратного метра.",
    image: "https://picsum.photos/seed/sergey/400/500?grayscale"
  },
  {
    title: "Юрист",
    name: "Антонина Жуковская",
    desc: "Юридический щит ваших инвестиций: безупречное правовое сопровождение сделок и защита активов на всех этапах владения.",
    image: "https://picsum.photos/seed/antonina/400/500?grayscale"
  },
  {
    title: "Администратор",
    name: "Ольга Бельченкова",
    desc: "Мастер операционной эффективности, обеспечивающий высокий уровень сервиса и безупречный порядок во всех бизнес-процессах.",
    image: "https://picsum.photos/seed/olga2/400/500?grayscale"
  }
];

export const TeamBlock = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white text-brand-navy">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-sans font-bold leading-tight mb-4">
            Комплексная <span className="text-brand-gold">инфраструктура</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light">
            Для обеспечения безупречного сервиса над вашими активами работает слаженная команда узкопрофильных специалистов.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Role Menu */}
          <div className="lg:col-span-4 flex overflow-x-auto lg:flex-col gap-3 p-2 pb-4 lg:pb-0 scrollbar-hide">
            {teamData.map((member, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative text-left px-5 py-3.5 rounded-xl transition-all duration-300 ease-in-out whitespace-nowrap lg:whitespace-normal shrink-0 font-medium text-sm md:text-base border ${
                  activeIndex === index 
                    ? 'bg-brand-navy text-white shadow-lg border-brand-navy border-l-4 border-l-brand-gold' 
                    : 'bg-white border-slate-300 border-l-4 border-l-slate-300 shadow-sm text-slate-700 hover:border-brand-gold/50 hover:border-l-brand-gold/50 hover:text-brand-navy hover:shadow-md'
                }`}
              >
                {member.title}
              </button>
            ))}
          </div>

          {/* Central Card */}
          <div className="lg:col-span-8">
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-xl border border-gray-100 min-h-[400px] relative flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="grid md:grid-cols-2 flex-grow items-stretch"
                >
                  <div className="h-64 md:h-full relative">
                    <img 
                      src={teamData[activeIndex].image} 
                      alt={teamData[activeIndex].name}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent md:hidden"></div>
                    <div className="absolute bottom-4 left-4 md:hidden">
                      <div className="text-brand-gold text-sm font-semibold mb-1">{teamData[activeIndex].title}</div>
                      <div className="text-white text-2xl font-sans font-bold leading-snug">{teamData[activeIndex].name}</div>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 flex flex-col justify-center bg-brand-navy text-white h-full">
                    <div className="hidden md:block mb-4">
                      <div className="text-brand-gold text-sm font-semibold tracking-wider uppercase mb-2">
                        {teamData[activeIndex].title}
                      </div>
                      <h3 className="text-3xl font-sans font-bold leading-snug">{teamData[activeIndex].name}</h3>
                    </div>
                    
                    <div className="w-12 h-1 bg-brand-gold mb-4 hidden md:block"></div>
                    
                    <p className="text-gray-300 leading-relaxed text-base md:text-lg font-light">
                      {teamData[activeIndex].desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
