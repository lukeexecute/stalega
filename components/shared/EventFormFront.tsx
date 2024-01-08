"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { eventFormSchema } from "@/lib/validator";
import * as z from "zod";
import { eventDefaultValues } from "@/constants";
import { Textarea } from "@/components/ui/textarea";

import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
  event?: IEvent;
  eventId?: string;
};

const EventFormFront = ({ userId, type, event, eventId }: EventFormProps) => {
  const initialValues =
    event && type === "Update"
      ? {
          ...event,
        }
      : eventDefaultValues;
  const router = useRouter();

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: { ...values },
          userId,
          path: "/profile",
        });

        if (newEvent) {
          form.reset();
          //router.push(`/events/${newEvent._id}`);
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!eventId) {
        router.back();
        return;
      }

      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, _id: eventId },
          path: `/events/${eventId}`,
        });

        if (updatedEvent) {
          form.reset();
          //router.push(`/events/${updatedEvent._id}`);
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center md:flex-row md:justify-start"
      >
        <div className="w-3/4 gap-5">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="">
                  <Textarea
                    placeholder="Όταν έρθει η ώρα θα σου πω Stalega εγώ ότι ...."
                    {...field}
                    className="textarea"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button w-48 md:ml-5"
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} Statement`}
        </Button>
      </form>
    </Form>
  );
};

export default EventFormFront;
