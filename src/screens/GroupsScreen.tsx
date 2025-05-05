import { AppText } from "src/atoms/AppText";
import { AppLayout } from "src/layouts/AppLayout";
import { GroupList } from "src/organisms/GroupList";

export function GroupsScreen() {
  return (
    <AppLayout>
      <GroupList />
    </AppLayout>
  );
}
