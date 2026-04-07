/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Hero } from './components/Hero';
import { AuthorityStats } from './components/AuthorityStats';
import { RoiCalculator } from './components/RoiCalculator';
import { InvestmentCycle } from './components/InvestmentCycle';
import { TeamBlock } from './components/TeamBlock';
import { Portfolio } from './components/Portfolio';
import { FinalCta } from './components/FinalCta';

export default function App() {
  return (
    <main className="min-h-screen bg-brand-navy text-white font-sans selection:bg-brand-gold selection:text-brand-navy">
      <Hero />
      <AuthorityStats />
      <RoiCalculator />
      <InvestmentCycle />
      <TeamBlock />
      <Portfolio />
      <FinalCta />
    </main>
  );
}
