import Form from "next/form";
import { Input } from "@/components/authInput";
import SearchButton from "@/components/SearchButton";

export default function TicketSearch() {
  return (
    <Form action="/tickets" className="flex gap-2 items-center">
      <Input
        type="text"
        id="searchText"
        name="searchText"
        label="searchText"
        placeholder="Search Tickets"
        className="w-full"
      />
      <SearchButton />
    </Form>
  );
}
