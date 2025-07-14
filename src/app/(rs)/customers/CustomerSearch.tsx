import Form from "next/form";
import { Input } from "@/components/ui/input";
import SearchButton from "@/components/SearchButton";

export default function CustomerSearch() {
  return (
    // Sends form to '/customer', basically back to itself. The page component will
    // have access to query params thanks to nextJS Form component used here
    <Form action="/customers" className="flex gap-2 items-center">
      <Input
        type="text"
        name="searchText"
        placeholder="Search Customers"
        className="w-full"
        autoFocus
      />
      <SearchButton />
    </Form>
  );
}
