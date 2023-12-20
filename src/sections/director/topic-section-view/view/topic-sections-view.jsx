import toast from "react-hot-toast";
import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
/* eslint-enable import/no-extraneous-dependencies */
import {Droppable, Draggable, DragDropContext} from "react-beautiful-dnd";

import {Box, Stack, Button, Container, Pagination} from "@mui/material";

import {reorder} from "../../../../utils/drag-drop";
import {TopicSectionsCard} from "../topic-sections-card";
import {SectionAddEditForm} from "../section-add-edit-form";
import {TEACHING_CENTER_DASHBOARD_PATH} from "../../../../routes/path";
import {TopicSectionsCardLoading} from "../topic-sections-card.loading";
import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs";
import {sortSection, SelectSectionsList} from "../../../../store/section.reducer";
import TopicSectionDeleteWarningModal from "../topic-section-delete-warning-modal";
import {useSortSectionByTopicIdMutation, useGetSectionsListByTopicIdQuery} from "../../../../api/topic-api-req";

export function TopicSectionsView() {
    const {id,} = useParams()

    const dispatch = useDispatch()

    const [page, setPage] = useState(1)

    const [open, setOpen] = useState(false)

    const [sectionsData, setSectionsData] = useState(null)

    const [deleteWarning, setDeleteWarning] = useState(false)

    const [sectionId, setSectionId] = useState(null)

    const [sorSectionReq] = useSortSectionByTopicIdMutation()

    const {data, isLoading, isFetching} = useGetSectionsListByTopicIdQuery({
        id,
        page,
    })

    const sectionList = useSelector(SelectSectionsList)

    const onClose = () => {
        setOpen(false)
        setSectionsData(null)
    }

    const delOnClose = () => {
        setDeleteWarning(false)
        setSectionId(null)
    }

    const onDragEnd = (result) => {
        if (!result.destination) return null;

        const new_section = reorder(
            sectionList,
            result.source.index,
            result.destination.index
        )


        const new_section_ids = new_section?.map((nSec) => nSec._id)

        sorSectionReq({topic_id: id, body: {sections: new_section_ids}}).unwrap().then(() => {
            toast.success("Bo'limlar mufaqqiyatli joylandi")
        })

        dispatch(sortSection({new_section}))

        return true;
    }

    const loading = isLoading || isFetching


    return (
        <>
            <Container>
                <CustomBreadcrumbs
                    heading="Bo'limlari"
                    links={[
                        {name: "O'quvchilar ro'yhati", href: `${TEACHING_CENTER_DASHBOARD_PATH.TOPIC_VIEW}/${id}`},
                        {name: "Bo'limlar ro'yhati"},
                    ]}
                    action={<Button size="medium" variant="contained" color="primary"
                                    onClick={() => setOpen(true)}> Bo&apos;lim
                        qo&apos;shish</Button>}
                />
                <Stack justifyContent="space-between" alignItems="center" sx={{minHeight: "650px"}}>
                    <Box sx={{
                        width: "100%",
                        marginBottom: "20px"
                    }}>
                        {loading ? Array(5).fill(",").map((_, index) => (
                            <TopicSectionsCardLoading key={index}/>
                        )) : (
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="droppable">
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >

                                            {sectionList?.map((section, index) => (
                                                <Draggable key={section._id} draggableId={section._id} index={index}>
                                                    {(subProvided) => (
                                                        <TopicSectionsCard
                                                            key={section?._id}
                                                            section={section}
                                                            setOpen={setOpen}
                                                            setSectionId={setSectionId}
                                                            setSectionsData={setSectionsData}
                                                            setDeleteWarning={setDeleteWarning}
                                                            provided={subProvided}
                                                        />
                                                    )}
                                                </Draggable>

                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>

                            </DragDropContext>
                        )}

                    </Box>
                    <Pagination
                        count={data?.totalPages}
                        onChange={(_event, newPage) => setPage(newPage)}
                        color="primary"
                    />
                </Stack>
            </Container>
            <SectionAddEditForm
                open={open}
                topic_id={id}
                sectionsData={sectionsData}
                onClose={onClose}
            />

            <TopicSectionDeleteWarningModal
                open={deleteWarning}
                onClose={delOnClose}
                section_id={sectionId}
            />
        </>

    );
}

