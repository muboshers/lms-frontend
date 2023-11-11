import React, {useState} from "react";
import {useParams} from "react-router-dom";

import {Card, Table, Button, Container, TableBody, TableContainer} from "@mui/material";

import {useGetGroupByIdQuery} from "src/api/group-api-req";

import SpinnerLoader from "src/components/spinner-loader/spinner-loader";

import {TopicRow} from "../topic-row";
import Scrollbar from "../../../components/scrollbar";
import {TopicAddEditForm} from "../topic-add-edit-form";
import {TEACHING_CENTER_DASHBOARD_PATH} from "../../../routes/path";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import {ListHead, TableNoData, TableEmptyRows} from "../../../components/table";

export default function GroupPageViewSection() {
    const {id} = useParams();

    const [open, setOpen] = useState(false)

    const onOpen = () => setOpen(true);

    const onClose = () => setOpen(false)

    const {data, isLoading, isFetching} = useGetGroupByIdQuery(
        {
            id,
        },
        {
            skip: typeof id === "undefined",
            refetchOnMountOrArgChange: true,
        }
    );

    const Table_Head = [
        {
            label: "O'qituvchini Ismi",
            alignRight: false,
        },

        {
            label: "Telefon raqam",
            alignRight: false
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
            alignRight: false
        },
        {
            label: "Vaqti",
            alignRight: false,
        },

        {
            label: "Davomiyligi",
            alignRight: false,
        },
        {
            label: "O'quvchilar soni",
            alignRight: false,
        },
        {
            label: "Boshlanish sanasi",
            alignRight: false,
        },
        {
            label: "Yaratilgan sana",
            alignRight: false
        },
    ]

    const loading = isLoading || isFetching;

    const notFound = data?.data?.topics?.length === 0


    return <>
        {loading && <SpinnerLoader/>}


        <Container>
            <CustomBreadcrumbs
                heading={data?.data?.name}
                links={[{name: "Guruhlar", href: TEACHING_CENTER_DASHBOARD_PATH.GROUPS}, {name: "Topiklar ro'yhati"}]}
                action={
                    <Button type="button" variant="contained" color="inherit" onClick={onOpen}>
                        Yangi topik qo&apos;shish
                    </Button>
                }
            />
            <Card sx={{
                marginTop: '20px'
            }}>
                <Scrollbar>
                    <TableContainer
                        sx={{
                            minWidth: 1550
                        }}>
                        <Table>
                            <ListHead headLabel={Table_Head}/>
                            <TableBody>
                                {notFound ? (
                                    <TableNoData
                                        query="O'quv dasturlari topilmadi"
                                        subQuery="Yangi dastur qo'shib qaytadan urinib ko'ring"
                                        colsNum={Table_Head.length}
                                    />
                                ) : data?.data?.topics?.map((topicRow) => (
                                    <TopicRow
                                        key={topicRow._id}
                                        topicRow={topicRow}
                                    />
                                ))}
                                <TableEmptyRows emptyRows={notFound ? 2 : 4} height={80} colsNum={Table_Head.length}/>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </Card>
        </Container>

        <TopicAddEditForm groupId={id} open={open} onClose={onClose}/>
    </>;
}
