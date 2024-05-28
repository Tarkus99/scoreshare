import { MyManrope } from "@/components/misc/manrope";
import { ActivityTab } from "@/components/profile/activity-tab";
import { ProfileTab } from "@/components/profile/profile-tab";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";

const ProfilePage = () => {
  return (
    <Tabs
      defaultValue="activity"
      className="flex flex-col justify-center w-full sm:w-11/12  md:w-10/12 xl:w-4/6"
    >
      <TabsList className="gap-2 text-lg text-white bg-transparent">
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="info">Info</TabsTrigger>
      </TabsList>
      <TabsContent
        value="activity"
        className="w-full md:p-4 rounded-sm shadow tab-content"
        style={{ position: "unset" }}
      >
        <h1 className="my-2 text-2xl font-semibold text-center uppercase !text-white text-shadow-white">
          <MyManrope>Files uploaded</MyManrope>
        </h1>
        <Suspense fallback={<TableSkeleton />}>
          <ActivityTab />
        </Suspense>
      </TabsContent>
      <TabsContent value="info" className="w-full md:p-4 rounded-sm shadow">
        <ProfileTab />
      </TabsContent>
    </Tabs>
  );
};

export default ProfilePage;
