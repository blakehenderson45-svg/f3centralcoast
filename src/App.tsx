import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MissionSection } from './components/MissionSection';
import { ScheduleMapSection } from './components/ScheduleMapSection';
import { FirstTimerSection } from './components/FirstTimerSection';
import { CultureExplorerSection } from './components/CultureExplorerSection';
import { LeadershipSection } from './components/LeadershipSection';
import { JoinConnectSection } from './components/JoinConnectSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#121315] text-[#f4f5f7] font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <MissionSection />
        <ScheduleMapSection />
        <FirstTimerSection />
        <CultureExplorerSection />
        <LeadershipSection />
        <JoinConnectSection />
      </main>
      <Footer />
    </div>
  );
}
