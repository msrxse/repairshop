import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import { BackButton } from "@/components/BackButton";
import TicketForm from "@/app/(rs)/tickets/form/TicketForm";
import { getKindeAuthAPI } from "@/app/lib/getKindeAuthAPI";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { customerId, ticketId } = await searchParams;

  if (!customerId && !ticketId) {
    return { title: "Missing ticketId or customerId" };
  }
  if (customerId) {
    return { title: `New Ticket for Customer #${customerId}` };
  }
  if (ticketId) {
    return { title: `New Ticket #${ticketId}` };
  }
}

export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId, ticketId } = await searchParams;

    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            Ticket ID or Customer ID required to load ticket form
          </h2>
          <BackButton title="Go Back" variant="default" />
        </>
      );
    }

    const { getPermission, getUsers, currentUser } = getKindeAuthAPI();
    const isManager = getPermission("manager").manager;

    // New ticket form
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));
      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID # {customerId} not found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID # {customerId} is not active
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      // return ticket form
      if (isManager) {
        const users = getUsers();

        const techs = users
          ? users
              .filter(
                (user): user is { id: number; name: string; email: string } =>
                  typeof user.email === "string"
              )
              .map((user) => ({
                id: user.email?.toLowerCase(),
                description: user.email?.toLowerCase(),
              }))
          : [];

        return (
          <TicketForm customer={customer} techs={techs} isManager={isManager} />
        );
      } else {
        return <TicketForm customer={customer} />;
      }
    }

    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId));

      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">Ticket ID # {ticketId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
      const customer = await getCustomer(ticket.customerId);

      if (isManager) {
        const users = getUsers();

        const techs = users
          ? users.map((user) => ({ id: user.email!, description: user.email! }))
          : [];

        return (
          <TicketForm
            customer={customer}
            ticket={ticket}
            techs={techs}
            isManager={isManager}
          />
        );
      } else {
        const isEditable =
          currentUser.email?.toLowerCase() === ticket.tech.toLowerCase();

        return (
          <TicketForm
            customer={customer}
            ticket={ticket}
            isEditable={isEditable}
            isManager={isManager}
          />
        );
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
}
