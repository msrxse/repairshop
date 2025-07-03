import Form from "next/form";
import { Input } from "@/components/authInput";
import SearchButton from "@/components/SearchButton";

export default function CustomerSearch() {
  return (
    <Form action="/customers" className="flex gap-2 items-center">
      <Input
        type="text"
        id="searchText"
        name="searchText"
        label="searchText"
        placeholder="Search Customers"
        className="w-full"
      />
      <SearchButton />
    </Form>
  );
}
