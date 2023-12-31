/* eslint-disable consistent-return */
import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import { Grid, Stack, Button, Container } from '@mui/material';

import { useRouter } from 'src/routes/hooks';
import { TEACHING_CENTER_DASHBOARD_PATH } from 'src/routes/path';

import { useGetGroupListQuery, useDeleteGroupMutation } from 'src/api/group-api-req';

import Iconify from 'src/components/iconify';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import GroupCard from '../group-card';
import GroupNotFound from '../group-not-found';
import GroupListSearch from '../group-list-search';
import GroupCardLoading from '../group-card-loading';
import { GroupDeleteWarningMopdal } from '../group-delete-warning-modal';

export default function GroupListView() {
  const [page, setPage] = useState(1);

  const location = useLocation();

  const { push } = useRouter();

  const { data, isLoading, isFetching } = useGetGroupListQuery({
    page,
    search: new URLSearchParams(location.search).get('search')?.replaceAll('-', ' '),
  });

  const [deleteGroup, groupRes] = useDeleteGroupMutation();

  const [isOpen, setIsOpen] = useState(false);

  const [groupId, setGroupId] = useState(null);

  const handleChangePage = () => {
    if (page >= data?.totalPages) return null;
    // eslint-disable-next-line no-return-assign
    setPage((prev) => (prev += 1));
  };

  const openDelModalFn = (row) => {
    if (!row?._id) return;
    setGroupId(row?._id);
    setIsOpen(true);
  };

  const closeDelModal = () => {
    setIsOpen(false);
    setGroupId(null);
  };

  const groupDelFn = () => {
    if (!groupId) return;
    deleteGroup({ id: groupId })
      .unwrap()
      .then(() => {
        toast.success("Guruh o'chirib tashlandi");
        closeDelModal();
      });
  };

  const navigateToAddGroupPage = () => push(TEACHING_CENTER_DASHBOARD_PATH.GROUP_CREATE);

  const loading = isLoading || isFetching;

  const notFound = data?.data?.length === 0 && !loading;

  return (
    <>
      <Container>
        <CustomBreadcrumbs
          heading="Guruhlar "
          links={[
            { name: "Guruhlar ro'yhati" },
            {
              name: "Guruh qo'shish",
              href: TEACHING_CENTER_DASHBOARD_PATH.GROUP_CREATE,
            },
          ]}
          action={
            <Button
              type="button"
              onClick={navigateToAddGroupPage}
              color="inherit"
              variant="contained"
              startIcon={<Iconify icon="mdi:add" />}
            >
              Yangi Guruh Qo&apos;shish
            </Button>
          }
        />

        <GroupListSearch />

        {notFound && <GroupNotFound />}

        <Grid container spacing={2}>
          {loading ? (
            <>
              <Grid item md={3} sm={6} xs={6}>
                <GroupCardLoading />
              </Grid>
              <Grid item md={3} sm={6} xs={6}>
                <GroupCardLoading />
              </Grid>
              <Grid item md={3} sm={6} xs={6}>
                <GroupCardLoading />
              </Grid>
            </>
          ) : (
            data?.data?.map((group) => (
              <Grid item md={3} sm={6} xs={6} key={group._id}>
                <GroupCard data={group} delFn={() => openDelModalFn(group)} />
              </Grid>
            ))
          )}
        </Grid>

        {data?.totalPages > page && (
          <Stack alignItems="center" marginTop={3} justifyContent="center">
            <LoadingButton
              variant="contained"
              color="inherit"
              size="large"
              type="button"
              onClick={handleChangePage}
            >
              Ko&apos;proq k&apos;rish
            </LoadingButton>
          </Stack>
        )}
      </Container>

      <GroupDeleteWarningMopdal
        open={isOpen}
        deleteFn={groupDelFn}
        onClose={closeDelModal}
        isLoading={groupRes.isLoading}
      />
    </>
  );
}
