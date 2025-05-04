import { AppLayout } from "src/layouts/AppLayout";
import { ExpenditureList } from "src/organisms/ExpenditureList";
import { OverallStatusDisplay } from "src/organisms/OverallStatusDisplay";
import { WelcomeCard } from "src/organisms/WelcomeCard";

export function OverviewSummaryScreen() {
  return (
    <AppLayout>
      <OverallStatusDisplay />
      <WelcomeCard />
      <ExpenditureList />
    </AppLayout>
  );
}

