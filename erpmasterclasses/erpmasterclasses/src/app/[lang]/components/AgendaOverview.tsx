import React from 'react';
import { Locale } from '@../../../i18n.config';
import SuccessEventOverview from '@/app/[lang]/components/SuccessEventOverview';
import TransformationEventOverview from '@/app/[lang]/components/TransformationEventOverview';

const AgendaSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className='flex flex-col max-w-5xl mx-auto px-8 py-8'>
        <h1 className='text-2xl font-bold pb-6'>{title}</h1>
        <hr />
        {children}
    </div>
);

const AgendaOverview = ({ lang, agenda }: { lang: Locale, agenda: any }) => {
    return (
        <div id='agenda'
            className='relative rounded-xl bg-white shadow-right-secondary'
        >
            {/* Success Agenda Section */}
            <AgendaSection title={agenda.upcomingSuccessMasterclasses}>
                <SuccessEventOverview params={{ lang, agenda }} />
            </AgendaSection>

            {/* Transformation Agenda Section */}
            <AgendaSection title={agenda.upcomingTransformationMasterclasses}>
                <TransformationEventOverview params={{ lang, agenda }} />
            </AgendaSection>
        </div>
    );
};

export default AgendaOverview;
