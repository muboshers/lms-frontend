import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Card, Table, Button, Container, TableBody, TableContainer } from '@mui/material';

import { useGetGroupByIdQuery } from 'src/api/group-api-req';
import { useDeleteTopicMutation } from 'src/api/topic-api-req';

import SpinnerLoader from 'src/components/spinner-loader/spinner-loader';

import { TopicRow } from '../topic-row';
import Scrollbar from '../../../components/scrollbar';
import { TopicAddEditForm } from '../topic-add-edit-form';
import { TopicDeleteConfirm } from '../topic-delete-confirm-modal';
import { TEACHING_CENTER_DASHBOARD_PATH } from '../../../routes/path';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { ListHead, TableNoData, TableEmptyRows } from '../../../components/table';

export default function GroupPageViewSection() {
  const { id } = useParams();

  const { data, isLoading, isFetching } = useGetGroupByIdQuery(
    {
      id,
    },
    {
      skip: typeof id === 'undefined',
      refetchOnMountOrArgChange: true,
    }
  );

  const [deleteTopic, deleteTopicRes] = useDeleteTopicMutation();

  const [editData, setEditData] = useState(null);

  const [open, setOpen] = useState(false);

  const [deletedOpen, setDeletedOpen] = useState(false);

  const [deletedId, setDeletedId] = useState(null);

  const openDeleteWarnModal = (row) => {
    setDeletedId(row._id);
    setDeletedOpen(true);
  };

  const handleCloseDeletePopover = () => {
    setDeletedOpen(false);
    setDeletedId(null);
  };

  const deleteFn = () => {
    if (!deletedId) return;
    deleteTopic({ id: deletedId })
      .unwrap()
      .then(() => {
        toast.success("Topik o'chirib tashlandi");
        handleCloseDeletePopover();
      });
  };

  const onOpen = () => setOpen(true);

  const onClose = () => {
    setEditData(null);
    setOpen(false);
  };

  const Table_Head = [
    {
      label: "O'qituvchini Ismi",
      alignRight: false,
    },

    {
      label: 'Telefon raqam',
      alignRight: false,
    },
    {
      label: "O'qituvchini foizi",
      alignRight: false,
    },
    {
      label: "Kurs narhi (o'quvchi uchun)",
      alignRight: false,
    },

    {
      label: "O'qituvchini daromadi",
      alignRight: false,
    },
    {
      label: 'Vaqti',
      alignRight: false,
    },

    {
      label: 'Davomiyligi',
      alignRight: false,
    },
    {
      label: "O'quvchilar soni",
      alignRight: false,
    },
    {
      label: 'Boshlanish sanasi',
      alignRight: false,
    },
    {
      label: 'Yaratilgan sana',
      alignRight: false,
    },
  ];

  const loading = isLoading || isFetching;

  const notFound = data?.data?.topics?.length === 0;

  const editFn = (row) => {
    setEditData(row);
    setOpen(true);
  };

  return (
    <>
      {loading && <SpinnerLoader />}

      <Container>
        <CustomBreadcrumbs
          heading={data?.data?.name}
          links={[
            { name: 'Guruhlar', href: TEACHING_CENTER_DASHBOARD_PATH.GROUPS },
            { name: "Topiklar ro'yhati" },
          ]}
          action={
            <Button type="button" variant="contained" color="inherit" onClick={onOpen}>
              Yangi topik qo&apos;shish
            </Button>
          }
        />
        <Card
          sx={{
            marginTop: '20px',
          }}
        >
          <Scrollbar>
            <TableContainer
              sx={{
                minWidth: 1550,
              }}
            >
              <Table>
                <ListHead headLabel={Table_Head} />
                <TableBody>
                  {notFound ? (
                    <TableNoData
                      query="O'quv dasturlari topilmadi"
                      subQuery="Yangi dastur qo'shib qaytadan urinib ko'ring"
                      colsNum={Table_Head.length}
                    />
                  ) : (
                    data?.data?.topics?.map((topicRow) => (
                      <TopicRow
                        openDeleteWarnModal={openDeleteWarnModal}
                        handleEditFn={editFn}
                        key={topicRow._id}
                        topicRow={topicRow}
                      />
                    ))
                  )}
                  <TableEmptyRows
                    emptyRows={notFound ? 2 : 0}
                    height={80}
                    colsNum={Table_Head.length}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>

      <TopicAddEditForm editData={editData} groupId={id} open={open} onClose={onClose} />
      <TopicDeleteConfirm
        isLoading={deleteTopicRes.isLoading}
        open={deletedOpen}
        deleteFn={deleteFn}
        onClose={handleCloseDeletePopover}
      />
    </>
  );
}
