import { UserButton } from "@/components/user-button";
import { ButtonLink } from "@components/button-link";

export default async function Home() {
  return (
    <>
      <UserButton />
      <ButtonLink href="/sign-in">Test</ButtonLink>
    </>
  );
}
