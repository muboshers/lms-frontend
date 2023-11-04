import { Helmet } from "react-helmet-async";

// ----------------------------------------------------------------------
import { GroupListView } from "src/sections/group-list/view";

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Guruhlar ro&apos;yhati | EduHub uz </title>
      </Helmet>
      <GroupListView />
    </>
  );
}
