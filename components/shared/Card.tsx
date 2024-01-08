import { IEvent } from "@/lib/database/models/event.model";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { formatDateTime } from "@/lib/utils";

type CardProps = {
  event: IEvent;
};

const Card = ({ event }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div className="group relative flex w-full flex-col overflow-hidden rounded-xl bg-gray-50 shadow-md transition-all hover:shadow-lg">
      {isEventCreator && (
        <div className="absolute right-2 top-2 flex gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/events/${event._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={15}
              height={15}
            />
          </Link>

          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      <div className="flex flex-col gap-3 p-5 md:gap-4">
        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {event.organizer.firstName} {event.organizer.lastName}
            <span className="ml-5 p-medium-16 p-medium-18 text-grey-500">
              {formatDateTime(event.createdAt).dateTime}
            </span>
          </p>
        </div>
        <p className="text-2xl font-bold text-gray-700">{event.description}</p>
      </div>
    </div>
  );
};

export default Card;
