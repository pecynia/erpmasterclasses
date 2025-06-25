import EventOverview from "@/app/[lang]/components/EventOverview"
import type { Locale } from "@../../../i18n.config"
import { getUpcomingEvents } from "@/app/_actions";

export async function TransformationEventOverview({ agenda, lang }: { agenda: any; lang: Locale }) {
  const events = await getUpcomingEvents(lang)
  const transformationEvents = events.filter((event) => event.type === "transformation")

  return <EventOverview agenda={agenda} allEvents={transformationEvents} lang={lang} />
}

export default TransformationEventOverview
