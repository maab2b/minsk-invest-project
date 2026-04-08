import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Send, ChevronUp, ChevronDown } from 'lucide-react';

type OwnershipType = 'Физ. лицо' | 'ИП' | 'Юр. лицо на УСН' | 'Юр. лицо на ОСН';

export const RoiCalculator = () => {
  const [propertyValue, setPropertyValue] = useState<number>(150000);
  const [area, setArea] = useState<number>(100);
  const [rentRate, setRentRate] = useState<number>(15);
  const [ownershipType, setOwnershipType] = useState<OwnershipType>('Физ. лицо');
  const [includePurchaseVat, setIncludePurchaseVat] = useState<boolean>(false);
  const [includeRentVat, setIncludeRentVat] = useState<boolean>(false);
  const [includeManagement, setIncludeManagement] = useState<boolean>(false);

  const handleNumberChange = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    currentValue: number,
    step: number,
    isIncrement: boolean
  ) => {
    const newVal = isIncrement ? currentValue + step : currentValue - step;
    setter(Math.max(0, newVal));
  };

  const formatNumber = (val: number) => new Intl.NumberFormat('ru-RU').format(val);
  const parseNumber = (val: string) => parseInt(val.replace(/\D/g, ''), 10) || 0;

  const calculations = useMemo(() => {
    const val = propertyValue;
    const a = area;
    const rate = rentRate;

    // Monthly Revenue
    let monthlyRevenue = a * rate;
    
    // VAT adjustment if OSN and VAT included
    let annualVat = 0;
    if (ownershipType === 'Юр. лицо на ОСН' && includeRentVat) {
      const monthlyVat = monthlyRevenue * (20 / 120);
      annualVat = monthlyVat * 12;
      monthlyRevenue = monthlyRevenue - monthlyVat;
    }

    const annualRevenue = monthlyRevenue * 12;

    // Base value for tax and depreciation
    let baseValueForTaxAndDepreciation = val;
    if (ownershipType === 'Юр. лицо на ОСН' && includePurchaseVat) {
      baseValueForTaxAndDepreciation = val / 1.2;
    }

    // Real Estate Tax
    let realEstateTaxRate = 0.02;
    if (ownershipType === 'Физ. лицо') realEstateTaxRate = 0.002;
    
    const annualRealEstateTax = baseValueForTaxAndDepreciation * realEstateTaxRate;

    // Depreciation (paper expense)
    let annualDepreciation = 0;
    if (ownershipType === 'ИП' || ownershipType === 'Юр. лицо на ОСН') {
      annualDepreciation = baseValueForTaxAndDepreciation * 0.02;
    }

    // Accounting Fee
    let monthlyAccountingFee = 100;
    if (a > 500) {
      const extraArea = a - 500;
      monthlyAccountingFee += Math.ceil(extraArea / 100) * 30;
    }
    const annualAccountingFee = monthlyAccountingFee * 12;

    // Management Fee
    const annualManagementFee = includeManagement ? annualRevenue * 0.06 : 0;

    // Deductible expenses for profit tax
    const annualDeductibleExpenses = annualRealEstateTax + annualAccountingFee + annualManagementFee + annualDepreciation;

    // Income Tax
    let annualIncomeTax = 0;
    if (ownershipType === 'Физ. лицо') {
      annualIncomeTax = annualRevenue * 0.13;
    } else if (ownershipType === 'ИП') {
      // Assuming 20% for IP based on recent BY laws
      annualIncomeTax = Math.max(0, annualRevenue - annualDeductibleExpenses) * 0.20;
    } else if (ownershipType === 'Юр. лицо на УСН') {
      annualIncomeTax = annualRevenue * 0.06;
    } else if (ownershipType === 'Юр. лицо на ОСН') {
      annualIncomeTax = Math.max(0, annualRevenue - annualDeductibleExpenses) * 0.20;
    }

    const totalAnnualExpenses = annualRealEstateTax + annualAccountingFee + annualManagementFee + annualIncomeTax + annualVat;
    const netAnnualIncome = annualRevenue - totalAnnualExpenses;

    const roi = val > 0 ? (netAnnualIncome / val) * 100 : 0;
    const paybackYears = netAnnualIncome > 0 ? val / netAnnualIncome : 0;

    return {
      annualRevenue,
      realEstateTaxRate,
      annualRealEstateTax,
      annualDepreciation,
      annualAccountingFee,
      annualManagementFee,
      annualIncomeTax,
      annualVat,
      totalAnnualExpenses,
      netAnnualIncome,
      roi,
      paybackYears
    };
  }, [propertyValue, area, rentRate, ownershipType, includePurchaseVat, includeRentVat, includeManagement]);

  return (
    <section id="calculator" className="py-12 md:py-16 lg:py-20 bg-white text-brand-navy relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-sans font-bold leading-tight mb-4">
            Калькулятор <span className="text-brand-gold">ROI</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Рассчитайте чистую доходность и срок окупаемости объекта в Минске с учетом налогов и расходов
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-5 bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-200">
              <Calculator className="w-6 h-6 text-brand-gold" />
              <h3 className="text-xl font-semibold">Параметры объекта</h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-500 mb-2">Стоимость объекта ($)</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={formatNumber(propertyValue)}
                  onChange={(e) => setPropertyValue(parseNumber(e.target.value))}
                  className="w-full px-4 py-3 pr-10 bg-slate-50 border border-transparent rounded-xl shadow-inner text-lg font-semibold text-brand-navy transition-all duration-300 hover:bg-white focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                  <button type="button" onClick={() => handleNumberChange(setPropertyValue, propertyValue, 1000, true)} className="text-gray-400 hover:text-brand-gold transition-colors p-0.5"><ChevronUp className="w-4 h-4" /></button>
                  <button type="button" onClick={() => handleNumberChange(setPropertyValue, propertyValue, 1000, false)} className="text-gray-400 hover:text-brand-gold transition-colors p-0.5"><ChevronDown className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-2">Площадь (м²)</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={formatNumber(area)}
                    onChange={(e) => setArea(parseNumber(e.target.value))}
                    className="w-full px-4 py-3 pr-10 bg-slate-50 border border-transparent rounded-xl shadow-inner text-lg font-semibold text-brand-navy transition-all duration-300 hover:bg-white focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                    <button type="button" onClick={() => handleNumberChange(setArea, area, 1, true)} className="text-gray-400 hover:text-brand-gold transition-colors p-0.5"><ChevronUp className="w-4 h-4" /></button>
                    <button type="button" onClick={() => handleNumberChange(setArea, area, 1, false)} className="text-gray-400 hover:text-brand-gold transition-colors p-0.5"><ChevronDown className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-2">Аренда 1 м² ($)</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={formatNumber(rentRate)}
                    onChange={(e) => setRentRate(parseNumber(e.target.value))}
                    className="w-full px-4 py-3 pr-10 bg-slate-50 border border-transparent rounded-xl shadow-inner text-lg font-semibold text-brand-navy transition-all duration-300 hover:bg-white focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                    <button type="button" onClick={() => handleNumberChange(setRentRate, rentRate, 1, true)} className="text-gray-400 hover:text-brand-gold transition-colors p-0.5"><ChevronUp className="w-4 h-4" /></button>
                    <button type="button" onClick={() => handleNumberChange(setRentRate, rentRate, 1, false)} className="text-gray-400 hover:text-brand-gold transition-colors p-0.5"><ChevronDown className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-500 mb-2">Форма собственности</label>
              <div className="relative">
                <select 
                  value={ownershipType}
                  onChange={(e) => setOwnershipType(e.target.value as OwnershipType)}
                  className="w-full px-4 py-3 pr-10 bg-slate-50 border border-transparent rounded-xl shadow-inner text-lg font-semibold text-brand-navy transition-all duration-300 hover:bg-white focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none appearance-none"
                >
                  <option value="Физ. лицо">Физ. лицо</option>
                  <option value="ИП">ИП</option>
                  <option value="Юр. лицо на УСН">Юр. лицо на УСН</option>
                  <option value="Юр. лицо на ОСН">Юр. лицо на ОСН</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {ownershipType === 'Юр. лицо на ОСН' && (
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer p-3 bg-white rounded-lg border border-gray-200">
                  <input 
                    type="checkbox" 
                    checked={includePurchaseVat}
                    onChange={(e) => setIncludePurchaseVat(e.target.checked)}
                    className="w-5 h-5 text-brand-gold rounded focus:ring-brand-gold"
                  />
                  <span className="text-sm font-medium text-gray-700">Стоимость объекта включает НДС</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer p-3 bg-white rounded-lg border border-gray-200">
                  <input 
                    type="checkbox" 
                    checked={includeRentVat}
                    onChange={(e) => setIncludeRentVat(e.target.checked)}
                    className="w-5 h-5 text-brand-gold rounded focus:ring-brand-gold"
                  />
                  <span className="text-sm font-medium text-gray-700">Ставка аренды включает НДС</span>
                </label>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-start gap-3 cursor-pointer" onClick={() => setIncludeManagement(!includeManagement)}>
                <div className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 mt-0.5 shrink-0 ${includeManagement ? 'bg-brand-navy' : 'bg-gray-300'}`}>
                  <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${includeManagement ? 'translate-x-7' : 'translate-x-0'}`}></div>
                </div>
                <div>
                  <span className="text-sm font-semibold text-brand-navy block select-none">Управление «под ключ»</span>
                  <span className="text-xs text-gray-500 select-none">Пассивный доход. Комиссия 6% от аренды.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-7 relative bg-brand-navy text-white rounded-xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-6 pb-8 md:p-8 md:pb-10 flex-grow flex flex-col">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-brand-gold">Результаты расчета</h3>
                
                <div>
                  <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Целевая доходность (ROI)</div>
                  <div className="text-6xl font-sans font-bold text-white">
                    {calculations.roi.toFixed(2)}% <span className="text-2xl text-gray-400 font-sans font-normal tracking-normal">годовых</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6 pb-6 border-b border-brand-navy-light text-center">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Срок окупаемости</div>
                      <div className="text-2xl font-semibold">{calculations.paybackYears.toFixed(1)} лет</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Чистая прибыль в год</div>
                      <div className="text-2xl font-semibold text-brand-gold">${Math.round(calculations.netAnnualIncome).toLocaleString()}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4 text-center">Детализация расходов (в год)</h4>
                    <div className="space-y-3 text-sm max-w-sm mx-auto">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Налог ({ownershipType})</span>
                        <span>${Math.round(calculations.annualIncomeTax).toLocaleString()}</span>
                      </div>
                      {calculations.annualVat > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">НДС (20%)</span>
                          <span>${Math.round(calculations.annualVat).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-400">Налог на недвижимость ({(calculations.realEstateTaxRate * 100).toFixed(1).replace('.0', '')}%)</span>
                        <span>${Math.round(calculations.annualRealEstateTax).toLocaleString()}</span>
                      </div>
                      {calculations.annualDepreciation > 0 && (
                        <div className="flex justify-between text-gray-500">
                          <span>Амортизация (бумажный вычет)</span>
                          <span>-${Math.round(calculations.annualDepreciation).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-400">Бухгалтерское обслуживание</span>
                        <span>${Math.round(calculations.annualAccountingFee).toLocaleString()}</span>
                      </div>
                      {includeManagement && (
                        <div className="flex justify-between text-brand-gold">
                          <span>Управление объектом (6%)</span>
                          <span>${Math.round(calculations.annualManagementFee).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Premium CTA Block */}
                <div className="mt-8 p-6 rounded-xl bg-brand-navy-light/30 border border-brand-gold/30 text-center">
                  <h4 className="text-lg md:text-xl font-sans font-bold leading-snug text-white mb-2">
                    Данный расчет является базовым и показывает общую рыночную картину.
                  </h4>
                  <p className="text-gray-300 font-light mb-8 max-w-2xl mx-auto">
                    Обратитесь к нам и мы разработаем для Вас индивидуальный инвестиционный меморандум под конкретный объект.
                  </p>
                  <a 
                    href="https://wa.me/375293333560" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold text-brand-navy font-semibold rounded-lg hover:bg-brand-gold-light transition-colors w-full md:w-auto"
                  >
                    Связаться с нами <Send className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Decorative bottom bar */}
            <div className="h-2 w-full bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-light"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
