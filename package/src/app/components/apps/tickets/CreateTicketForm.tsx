"use client";
import React, { useState, useEffect } from "react";
import { Avatar, Button, Dropdown, DropdownItem, Label, TextInput } from "flowbite-react";
import { TicketType } from '@/app/(DashboardLayout)/types/ticket';
import { useRouter } from "next/navigation";
import { isValid, format } from "date-fns";
import CardBox from "../../shared/CardBox";

const agents = [
  { id: 1, name: "Liam", photo: "/images/profile/user-10.jpg" },
  { id: 2, name: "Steve", photo: "/images/profile/user-2.jpg" },
  { id: 3, name: "Jack", photo: "/images/profile/user-3.jpg" },
  { id: 4, name: "John", photo: "/images/profile/user-8.jpg" },
];

const CreateTicketForm = () => {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [ticketId, setTicketId] = useState<number | undefined>(undefined);
  const [ticketDate, setTicketDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [agentPhoto, setAgentPhoto] = useState(agents[0].photo);

  const router = useRouter();

  // Fetch tickets to calculate new ID
  useEffect(() => {
    const fetchTickets = async () => {
      const res = await fetch("/api/ticket", {
        method: "GET",
        headers: { browserrefreshed: "false" },
      });
      const data = await res.json();
      if (data?.data) {
        setTickets(data.data);
        const maxId = data.data.reduce(
          (max: number, ticket: TicketType) => (ticket.Id > max ? ticket.Id : max),
          0
        );
        setTicketId(maxId + 1);
      }
    };
    fetchTickets();
  }, []);

  // Submit new ticket to API
  const handleSubmit = async () => {
    if (!ticketTitle || !ticketDescription) {
      alert("Please fill out all fields.");
      return;
    }

    const newTicket: TicketType = {
      Id: ticketId!,
      ticketTitle,
      ticketDescription,
      Status: "Open",
      Label: "primary",
      thumb: agentPhoto,
      AgentName: selectedAgent.name,
      Date: new Date(ticketDate),
      deleted: false,
    };

    try {
      await fetch("/api/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTicket),
      });

      resetForm();
      router.push("/apps/tickets");
    } catch (error) {
      console.error("Failed to create ticket", error);
    }
  };

  const resetForm = () => {
    setTicketDate(new Date().toISOString().split("T")[0]);
    setTicketTitle("");
    setTicketDescription("");
    setSelectedAgent(agents[0]);
    setAgentPhoto(agents[0].photo);
  };

  const parsedDate = isValid(new Date(ticketDate))
    ? new Date(ticketDate)
    : new Date();
  const formattedOrderDate = format(parsedDate, "EEEE, MMMM dd, yyyy");

  return (
    <CardBox>
      <h2 className="text-lg font-semibold mb-4">Create New Ticket</h2>
      <p>ID : {ticketId !== undefined ? ticketId : ""}</p>
      <p>Date : {formattedOrderDate}</p>
      <div className="bg-lightgray dark:bg-gray-800/70 p-6 my-6 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="ticketTitle">Ticket Title</Label>
            </div>
            <TextInput
              id="ticketTitle"
              value={ticketTitle}
              onChange={(e) => setTicketTitle(e.target.value)}
              placeholder="Ticket Title"
              className="w-full form-control"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="ticketDescription">Ticket Description</Label>
            </div>
            <TextInput
              id="ticketDescription"
              value={ticketDescription}
              onChange={(e) => setTicketDescription(e.target.value)}
              placeholder="Ticket Description"
              className="w-full form-control"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between mt-6 gap-3">
          <div>
            <Dropdown label={selectedAgent.name} className="rounded-md">
              {agents.map((agent) => (
                <DropdownItem
                  key={agent.id}
                  onClick={() => {
                    setSelectedAgent(agent);
                    setAgentPhoto(agent.photo);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Avatar img={agent.photo} alt={agent.name} rounded />
                    <span>{agent.name}</span>
                  </div>
                </DropdownItem>
              ))}
            </Dropdown>
          </div>
          <div className="flex gap-3 ">
            <Button color={"primary"} onClick={handleSubmit} className="rounded-md ">
              Save
            </Button>
            <Button
              color={"error"}
              className="rounded-md"
              onClick={() => router.push("/apps/tickets")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </CardBox>
  );
};

export default CreateTicketForm;
