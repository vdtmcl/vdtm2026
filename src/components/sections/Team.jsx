import React from 'react';
import { SectionWrapper } from '../ui/SectionWrapper';
import { SectionTitle } from '../ui/SectionTitle';
import { Reveal } from '../ui/Reveal';
import { NavigationControls } from '../ui/NavigationControls';
import { TeamCard } from '../modules/TeamModules';
import { DATA } from '../../data';

export const Team = ({ onMemberClick, onNavigate }) => (
    <SectionWrapper id="team" className="!pt-20 !pb-10">
        <Reveal><SectionTitle subtitle="Un Solo Equipo" title="Inteligencia Colectiva" /></Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 lg:gap-6 max-w-6xl mx-auto pb-10 md:pb-0">
            {DATA.team.filter(m => m.type === 'human').slice(0, 3).map((member, i) => (
                <Reveal key={`h-${i}`} delay={i * 100} className="group h-full">
                    <TeamCard member={member} onClick={() => onMemberClick(member)} />
                </Reveal>
            ))}
            {DATA.team.filter(m => m.type === 'ai').slice(0, 3).map((member, i) => (
                <Reveal key={`ai-${i}`} delay={300 + i * 100} className="group h-full">
                    <TeamCard member={member} onClick={() => onMemberClick(member)} />
                </Reveal>
            ))}
        </div>
        <NavigationControls prevId="method" nextId="blog" onNavigate={onNavigate} />
    </SectionWrapper>
);
