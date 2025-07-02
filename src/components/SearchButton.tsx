"use client";

import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchButton() {
  const status = useFormStatus();

  return (
    <Button type="submit" className="w-20" disabled={status.pending}>
      {status.pending ? <LoaderCircle className="animate-spin" /> : "Search"}
    </Button>
  );
}
