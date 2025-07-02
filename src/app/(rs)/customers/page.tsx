import CustomerSearch from "@/app/(rs)/customers/CustomerSearch";
import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults";

export const metadata = {
  title: "Customer Search",
};

/**
 *
 * Note we are passing searchParams to this components from
 * this form `src/app/(rs)/customers/CustomerSearch.tsx`.
 * See <From component where action="/customers", meaning the form redirects here with those params.
 *
 *
 */
async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) {
    return <CustomerSearch />;
  }

  const results = await getCustomerSearchResults(searchText);

  return (
    <>
      <CustomerSearch />
      <p>{JSON.stringify(results)}</p>
    </>
  );
}

export default Page;
