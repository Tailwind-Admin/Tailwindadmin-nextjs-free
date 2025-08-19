import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, Badge, Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput, Tooltip } from "flowbite-react";
import { format } from "date-fns";
import { Icon } from "@iconify/react/dist/iconify.js";
import { TicketType } from "@/app/(DashboardLayout)/types/ticket";

const TicketListing = ({ tickets, deleteTicket, searchTickets, ticketSearch, filter }: any) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const router = useRouter();

  const getVisibleTickets = (
    tickets: TicketType[],
    filter: string,
    ticketSearch: string
  ) => {
    switch (filter) {
      case "total_tickets":
        return tickets.filter(
          (c) => !c.deleted && c.ticketTitle.toLowerCase().includes(ticketSearch)
        );
      case "Pending":
        return tickets.filter(
          (c) => !c.deleted && c.Status === "Pending" && c.ticketTitle.toLowerCase().includes(ticketSearch)
        );
      case "Closed":
        return tickets.filter(
          (c) => !c.deleted && c.Status === "Closed" && c.ticketTitle.toLowerCase().includes(ticketSearch)
        );
      case "Open":
        return tickets.filter(
          (c) => !c.deleted && c.Status === "Open" && c.ticketTitle.toLowerCase().includes(ticketSearch)
        );
      default:
        return tickets;
    }
  };

  const visibleTickets = getVisibleTickets(tickets, filter, ticketSearch.toLowerCase());

  const ticketBadge = (ticket: TicketType) => {
    return ticket.Status === "Open"
      ? "bg-lightsuccess text-success"
      : ticket.Status === "Closed"
      ? "bg-lighterror text-error"
      : ticket.Status === "Pending"
      ? "bg-lightwarning text-warning"
      : "bg-lightprimary text-primary";
  };

  return (
    <div className="my-6">
      <div className="flex justify-between items-center mb-4 gap-4">
        <Button
          onClick={() => router.push("/apps/tickets/create")}
          color={"primary"}
          className="rounded-md whitespace-nowrap"
        >
          Create Ticket
        </Button>
        <TextInput
          type="text"
          sizing="md"
          className="form-control sm:max-w-60 max-w-full w-full"
          onChange={(e) => searchTickets(e.target.value)}
          placeholder="Search"
          icon={() => <Icon icon="tabler:search" height={18} />}
        />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableHeadCell>Id</TableHeadCell>
            <TableHeadCell>Ticket</TableHeadCell>
            <TableHeadCell>Assigned To</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell className="text-end">Action</TableHeadCell>
          </TableHead>
          <TableBody>
            {visibleTickets.map((ticket) => (
              <TableRow key={ticket.Id}>
                <TableCell>{ticket.Id}</TableCell>
                <TableCell className="max-w-md">
                  <h6 className="text-base truncate">{ticket.ticketTitle}</h6>
                  <p className="text-sm text-darklink truncate">{ticket.ticketDescription}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar img={ticket.thumb} alt={ticket.AgentName} rounded />
                    <h6 className="text-base">{ticket.AgentName}</h6>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${ticketBadge(ticket)} rounded-md`}>
                    {ticket.Status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <p className="text-sm text-darklink">
                    {format(new Date(ticket.Date), "E, MMM d")}
                  </p>
                </TableCell>
                <TableCell>
                  <Tooltip content="Delete Ticket" placement="bottom" arrow={false}>
                    <Button className="btn-circle ms-auto" color={"transparent"}>
                      <Icon
                        icon="tabler:trash"
                        height="18"
                        onClick={() => deleteTicket(ticket.Id)}
                      />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TicketListing;
