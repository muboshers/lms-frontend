import React from "react";

import { Container } from "@mui/material";

import { TEACHING_CENTER_DASHBOARD_PATH } from "src/routes/path";

import CustomBreadcrumbs from "src/components/custom-breadcrumbs";

import GroupCreateForm from "../group-create-form";

export default function NewGroupPage() {
  return (
    <Container>
      <CustomBreadcrumbs
        heading="Guruh"
        links={[
          {
            name: "Guruhlar ro'yhati",
            href: TEACHING_CENTER_DASHBOARD_PATH.GROUPS,
          },
          {
            name: "Guruh qo'shish",
          },
        ]}
      />

      <GroupCreateForm />
    </Container>
  );
}
