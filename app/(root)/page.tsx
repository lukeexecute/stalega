import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Link from "next/link";
import CreateEventBar from "@/components/shared/CreateEventBar";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";

  const events = await getAllEvents({
    query: searchText,
    page,
    limit: 6,
  });

  return (
    <>
      <section className="bg-primary-50 bg-contain py-5 md:py-10">
        <div className="wrapper gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Verba volant, scripta manent</h1>
            <p className="p-regular-20 md:p-regular-24">
              Τα λόγια πετούν, τα γραπτά μένουν...γι' αυτό ότι και να λες στους
              φίλους σου, αν δεν καταγραφεί στο χρονοντούλαπο δεν σου δίνει το
              δικαίωμα να πεις μετά "Στάλεγα εγώ!..."
            </p>
            {/* <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">Γράψε την δήλωσή σου</Link>
            </Button> */}
            <CreateEventBar />
          </div>
        </div>
      </section>
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <div className="flex w-full flex-col gap-5 md:flex-row">
          Search CategoryFilter
        </div>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Collection
            data={events?.data}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={6}
            page={page}
            totalPages={events?.totalPages}
          />
        </div>
      </section>
    </>
  );
}
