import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';

const cases = [
  {
    title: 'ул. Мележа (Торговое помещение)',
    type: 'РЕДЕВЕЛОПМЕНТ',
    images: [
      'https://picsum.photos/seed/melezha1/800/600',
      'https://picsum.photos/seed/melezha2/800/600',
      'https://picsum.photos/seed/melezha3/800/600',
    ],
    pointA: {
      label: 'Точка А (До покупки)',
      text: 'Помещение общепита (826.3 м²), выкупленное на аукционе по банкротству. Непригодное состояние, неэффективная старая планировка и долгий простой актива.'
    },
    solution: 'Глубокая перепланировка и демонтаж неэффективных конструкций, что позволило увеличить полезную площадь почти на 40 м² (до 865.0 м²). Разделение на 4 независимые зоны.',
    result: 'Быстрое 100% заполнение: якорный магазин одежды (320 м²), сетевой дискаунтер «Три цены» (220 м²), швейное производство (195 м²) и склад игрушек.',
    stats: [
      { label: 'Доходность (ROI)', value: '~12.5%' },
      { label: 'Окупаемость', value: '~8 лет' },
    ]
  },
  {
    title: 'ул. Дроздовича (Стрит-ритейл)',
    type: 'ОПТИМИЗАЦИЯ СТРИТ-РИТЕЙЛА',
    images: [
      'https://picsum.photos/seed/drozdovicha1/800/600',
      'https://picsum.photos/seed/drozdovicha2/800/600',
      'https://picsum.photos/seed/drozdovicha3/800/600',
    ],
    pointA: {
      label: 'Точка А (До покупки)',
      text: 'Помещение в новом ЖК (158.4 м²) с черновой отделкой. Куплено у гос. застройщика за $130,000 в комплекте с бонусным машино-местом.'
    },
    solution: 'Организация чистовой отделки силами наших проверенных подрядчиков и поставщиков, что снизило смету до $15,000 (<$100/м²). Продажа машино-места частично компенсировала затраты на ремонт.',
    result: 'Помещение сдано под востребованный продуктовый магазин местного значения, собирающий трафик со всего жилого комплекса.',
    stats: [
      { label: 'Доходность (ROI)', value: '~12.2%' },
      { label: 'Окупаемость', value: '~8.2 лет' },
    ]
  },
  {
    title: 'БЦ класса А (пр-т Победителей)',
    type: 'АНТИКРИЗИСНОЕ УПРАВЛЕНИЕ',
    images: [
      'https://picsum.photos/seed/bc1/800/600',
      'https://picsum.photos/seed/bc2/800/600',
      'https://picsum.photos/seed/bc3/800/600',
    ],
    pointA: {
      label: 'Точка А (До управления)',
      text: 'Отдельный этаж (1200 м²). Простой более 2 лет, долг >500 000 руб. Управление велось сугубо в «кабинетном» формате, без контроля арендаторов «в поле», пока учредители находились за рубежом.'
    },
    solution: 'Перехват операционного контроля. Запуск агрессивного брокериджа по нашим закрытым каналам. Жесткий аудит договоров и взыскание долгов.',
    result: 'Огромный объем площадей полностью сдан арендаторам всего за 2 месяца. Дебиторская задолженность уже снижена более чем на 50%.',
    stats: [
      { label: 'Срок заполнения', value: '2 мес.' },
      { label: 'Снижение долга', value: '>50%' },
    ]
  }
];

const ImageCarousel = ({ images, type }: { images: string[], type: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative h-56 overflow-hidden group/carousel">
      <div className="absolute inset-0 bg-brand-navy/20 group-hover/carousel:bg-transparent transition-colors z-10 pointer-events-none"></div>
      
      <div 
        className="flex transition-transform duration-500 h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, i) => (
          <img 
            key={i}
            src={img} 
            alt={`Slide ${i + 1}`} 
            className="w-full h-full object-cover shrink-0"
            referrerPolicy="no-referrer"
          />
        ))}
      </div>

      <div className="absolute top-4 left-4 z-20 bg-brand-navy/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-semibold text-brand-gold uppercase tracking-wider">
        {type}
      </div>

      {/* Arrows */}
      <button 
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-gold"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button 
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-gold"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {images.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-colors focus:outline-none ${i === currentIndex ? 'bg-brand-gold' : 'bg-white/50 hover:bg-white/80'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export const Portfolio = () => {
  return (
    <section className="pt-12 md:pt-16 lg:pt-20 pb-12 bg-brand-navy relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl lg:text-4xl font-sans font-bold leading-tight mb-4 text-white">
              Примеры из <span className="text-brand-gold">портфолио</span>
            </h2>
            <p className="text-gray-400 max-w-2xl font-light">
              Реальные кейсы создания высокодоходных активов из проблемной или недооцененной недвижимости.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {cases.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group bg-brand-navy-light/30 rounded-2xl overflow-hidden border border-brand-navy-light hover:border-brand-gold/50 transition-colors flex flex-col h-full"
            >
              <ImageCarousel images={item.images} type={item.type} />
              
              <div className="p-5 md:p-6 flex flex-col flex-grow">
                <h3 className="text-xl md:text-2xl font-sans font-bold leading-snug text-white mb-4">{item.title}</h3>
                
                <div className="space-y-4 flex-grow text-sm leading-relaxed">
                  {/* Point A */}
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">{item.pointA.label}:</span>{' '}
                      <span className="text-gray-400 leading-relaxed">{item.pointA.text}</span>
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Наше решение:</span>{' '}
                      <span className="text-gray-400 leading-relaxed">{item.solution}</span>
                    </div>
                  </div>

                  {/* Result */}
                  <div className="mt-6 p-4 bg-brand-gold/10 border border-brand-gold/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                      <span className="text-gray-200 font-medium leading-relaxed">{item.result}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-brand-navy-light">
                  {item.stats.map((stat, i) => (
                    <div key={i}>
                      <div className="text-brand-gold font-bold text-lg md:text-xl mb-1">{stat.value}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
