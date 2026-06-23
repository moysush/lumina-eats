import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

export function Notification() {
  return (
    <MantineProvider>
      <Notifications />
      {/* Your app here */}
    </MantineProvider>
  );
}
