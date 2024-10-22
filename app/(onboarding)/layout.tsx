import { OnboardingLayout } from "@/components/layouts/onboarding-layout";
import { OnboardingStepper } from "./_components/onboarding-stepper";
import { Stack } from "@mantine/core";
import { getCurrentUser } from "@server/utils/get-current-user";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <OnboardingLayout>
      <OnboardingStepper user={user} />
      <Stack maw="400px" miw="400px" mx="auto">
        {children}
      </Stack>
    </OnboardingLayout>
  );
}
