"use client";

import React from "react";
import { Button } from "@/components/ui/button";

import Link from "next/link";

function login() {
  return true;
}

function page() {
  return (
    <main className="h-dvh flex flex-col items-center gap-6">
      <h1>Repair Shop</h1>
      <Button onClick={login}>
        <Link href={"/home"}>Sign In</Link>
      </Button>
    </main>
  );
}

export default page;
