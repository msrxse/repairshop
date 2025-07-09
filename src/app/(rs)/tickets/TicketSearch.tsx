import Form from "next/form";
import { Input } from "@/components/ui/input";
import SearchButton from "@/components/SearchButton";

export default function TicketSearch() {
  return (
    // Sends form to '/tickets', basically back to itself. The page component will
    // have access to query params thanks to nextJS Form component used here
    <Form action="/tickets" className="flex gap-2 items-center">
      <Input
        type="text"
        name="searchText"
        placeholder="Search Tickets"
        className="w-full"
      />
      <SearchButton />
    </Form>
  );
}
