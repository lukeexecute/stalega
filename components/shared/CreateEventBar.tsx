import EventFormFront from "@/components/shared/EventFormFront";
import { auth } from "@clerk/nextjs";

const CreateEventBar = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <div className="wrapper my-8">
        <EventFormFront userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateEventBar;
