import React from 'react';
import { Locale } from '@../../../i18n.config';
import SuccessEventOverview from '@/app/[lang]/components/SuccessEventOverview';
import TransformationEventOverview from '@/app/[lang]/components/TransformationEventOverview';

const AgendaOverview = ({ lang, agenda }: { lang: Locale, agenda: any }) => {
    return (
        <div className='relative rounded-xl bg-white shadow-right-secondary'>
            <div className='w-full'>
                <div className='flex flex-col max-w-5xl mx-auto px-8 py-8'>
                    <h1 className='text-2xl font-bold pb-6'>
                        {agenda.upcomingSuccessMasterclasses}
                    </h1>
                    <hr />
                    <SuccessEventOverview params={{ lang, agenda }} />
                </div>
            </div>

            {/* Transformation Agenda Section */}
            <div className='w-full'>
                <div className='flex flex-col max-w-5xl mx-auto px-8 py-8'>
                    <h1 className='text-2xl font-bold pb-6'>
                        {agenda.upcomingTransformationMasterclasses}
                    </h1>
                    <hr />
                    <TransformationEventOverview params={{ lang, agenda }} />
                </div>
            </div>
        </div>
    );
};

export default AgendaOverview;
