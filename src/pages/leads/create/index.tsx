import Head from "next/head";
import CreateLeadForm from "@/app/pages/lead/create/createLeadMultistepForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create lead form</title>
        <meta name="description" content="Create lead form" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CreateLeadForm />
      </main>
    </>
  );
}
