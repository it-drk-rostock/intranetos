"use client";

import {
  IconCircleCheck,
  IconUserQuestion,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Stepper } from "@mantine/core";
import { iconStyles } from "@constants/icon-styles";
import { UserProps } from "@server/utils/get-user";

export const OnboardingStepper = ({ user }: { user: UserProps }) => {
  const getActiveStep = (user: UserProps) => {
    if (!user || !user.first_name || !user.last_name) {
      return 0;
    }
    if (
      user.first_name &&
      user.last_name &&
      user.requested_policies.length < 1
    ) {
      return 1;
    }
    if (
      user.first_name &&
      user.last_name &&
      user.requested_policies.length >= 1
    ) {
      return 2;
    }

    return 0;
  };

  return (
    <Stepper
      active={getActiveStep(user)}
      completedIcon={<IconCircleCheck style={iconStyles} />}
    >
      <Stepper.Step
        icon={<IconUserQuestion style={iconStyles} />}
        label={"Über mich"}
        description={"Fülle deine persönlichen Daten aus"}
      />
      <Stepper.Step
        icon={<IconUsersGroup style={iconStyles} />}
        label={"Deine Bereiche"}
        description={
          "Wähle deine Bereiche aus, zu denen du gehörst um die entsprechenden Berechtigungen zu erhalten."
        }
      />
    </Stepper>
  );
};
