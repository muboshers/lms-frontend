import React, {useState} from 'react';

import {Card, Table, Stack, Typography, TableContainer, TablePagination} from "@mui/material";

import PupilsTableRow from "../pupils-table-row";
import Scrollbar from "../../../../components/scrollbar";
import {ListHead, TableNoData} from "../../../../components/table";

function PupilsView() {

    const loading = false;

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(0)

    const TABLE_HEAD = [
        {label: 'N', alignRight: false},
        {label: "O'quvchining ismi", alignRight: false},
        {label: 'Ota-onasining Telefon raqami', alignRight: false},
        {label: "O'quvchining yoshi", alignRight: false},
    ];


    const dummyData = [
        {
            _id: 'delkdewdkl434394384839',
            name: "Mubosher Muydinov",
            age: 22,
            parent_contact_information: "+998484844848",
        },
        {
            _id: 'delkdewdkl4343943834839',
            name: "Bobir Maxmudov",
            age: 42,
            parent_contact_information: "+998484844846",
        },
        {
            _id: 'delkdewdkl434d3943834839',
            name: "Temur Obidov",
            age: 62,
            parent_contact_information: "+998906959999",
        },
        {
            _id: 'delkdewdkl43443d3943834839',
            name: "Sag'zi Mahmudov",
            age: 32,
            parent_contact_information: "+998903459999",
        },
    ]

    const notFound = dummyData.length === 0 || !dummyData.length


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Card>
            <Stack flexDirection="row" alignItems="center" justifyContent="spaceBetween" padding={2}>
                <Typography variant="h5">
                    O&apos;quvchilar ro&apos;yhati
                </Typography>
            </Stack>
            <Scrollbar>
                <TableContainer>
                    <Table>
                        <ListHead headLabel={TABLE_HEAD}/>
                        {notFound ? (
                            <TableNoData colsNum={TABLE_HEAD.length} query="O'qituvchilar topilmadi"/>
                        ) : !loading && dummyData?.map((pupils, index) => (
                            <PupilsTableRow
                                key={pupils.id}
                                row={pupils}
                                index={index + 1}
                            />
                        ))}
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    labelRowsPerPage="Qatorlar soni"
                    page={page}
                    count={dummyData.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Scrollbar>
        </Card>
    );
}

export default PupilsView;