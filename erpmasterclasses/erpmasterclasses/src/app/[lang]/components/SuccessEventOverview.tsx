import EventOverview from "@/app/[lang]/components/EventOverview"
import type { Locale } from "@../../../i18n.config"
import { getUpcomingEvents } from "@/app/_actions"

export async function SuccessEventOverview({ agenda, lang }: { agenda: any; lang: Locale }) {
  const events = await getUpcomingEvents(lang)
  const successEvents = events.filter((event) => event.type === "selection")

  return <EventOverview agenda={agenda} allEvents={successEvents} lang={lang} />
}

export default SuccessEventOverview
