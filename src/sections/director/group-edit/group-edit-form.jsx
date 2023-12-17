/* eslint-disable react-hooks/exhaustive-deps */
import * as yup from 'yup';
import toast from 'react-hot-toast';
import {useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';
import React, {useEffect, useCallback} from 'react';
import {yupResolver} from '@hookform/resolvers/yup';

import {LoadingButton} from '@mui/lab';
import {Card, Stack} from '@mui/material';

import {useRouter} from 'src/routes/hooks';
import {TEACHING_CENTER_DASHBOARD_PATH} from 'src/routes/path';

import {IMAGE_TYPES} from 'src/contants';
import {useUploadFileMutation} from 'src/api/file-api-req';
import {useGetGroupByIdQuery, useUpdateGroupMutation} from 'src/api/group-api-req';

import {Upload} from 'src/components/upload';
import {RHFTextField} from 'src/components/hook-form';
import RHFFormProvider from 'src/components/hook-form/RHFFormProvider';
import SpinnerLoader from 'src/components/spinner-loader/spinner-loader';

import TopicRow from './topic-row';

export default function GroupEditForm() {
    const [fileUpload, fileUploadRes] = useUploadFileMutation();

    const [updateGroup, createGroupRes] = useUpdateGroupMutation();

    const {push} = useRouter();

    const {id} = useParams();

    const {
        data: groupData,
        isLoading,
        isFetching,
    } = useGetGroupByIdQuery(
        {
            id,
        },
        {
            skip: typeof id === 'undefined',
            refetchOnMountOrArgChange: true,
        }
    );

    const loading = fileUploadRes.isLoading || isFetching || isLoading;

    const schema = yup.object().shape({
        name: yup.string().required('Guruh nomini yozish majburiy'),
        topics: yup.array().of(
            yup.object({
                teacher_id: yup.object().shape({
                    name: yup.string().required("O'qituvchini ismi talab etiladi"),
                    id: yup.string().notRequired(),
                }),
                price: yup.string().required("O'qituvchini narhi talab etiladi har bir o'quvchi uchun"),
                percentage: yup.string().required("O'qituvchining % foizi talab etiladi)"),
                week_days: yup.array().min(1).required('Hafta kunlari talab etiladi'),
                during_month: yup
                    .string()
                    .max(2, 'Siz kiritgan muddat xato!')
                    .required('Davomiylik muddati talab etiladi (oy hisobida)'),
                start_date: yup.string().required('Boshlanish sanasi talab etiladi'),
                time_of_day: yup.string().required('Soatini yozish talab etiladi'),
            })
        ),
    });

    const defaultValues = {
        name: '',
        image: {
            id: '',
            url: '',
        },
        topics: [
            {
                teacher_id: {
                    name: '',
                    id: '',
                },
                price: '',
                percentage: '',
                during_month: '',
                start_date: new Date(),
                week_days: [],
                time_of_day: '',
            },
        ],
    };

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });

    const {handleSubmit, watch, setValue, reset} = methods;

    const values = watch();

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (!IMAGE_TYPES.includes(file.type)) {
                toast.error('Faqat jpg va png turidagi rasmlarni yuklay olasiz');
                return;
            }

            const formData = new FormData();

            formData.append('image', file);

            fileUpload({formData})
                .unwrap()
                .then((res) => {
                    const {url, _id} = res.data;
                    setValue(
                        `image`,
                        {
                            url,
                            id: _id,
                        },
                        {
                            shouldValidate: true,
                        }
                    );
                });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setValue, values.image]
    );

    const handleRemoveFile = (inputFile) => {
        setValue(`image`, {
            url: '',
            id: '',
        });
    };

    const onSubmit = (data) => {
        const {image} = data;

        const body = {
            ...data,
            image: image.id,
        };

        const topics = data?.topics?.map((topic) => ({
            ...topic,
            percentage: parseInt(topic.percentage, 10),
            price: parseInt(topic.percentage, 10),
            teacher_id: topic.teacher_id,
        }));

        updateGroup({
            id,
            body: {
                ...body,
                topics,
            },
        })
            .unwrap()
            .then(() => {
                toast.success("Guruh mufaqqiyatli qo'shildi");
                push(TEACHING_CENTER_DASHBOARD_PATH.GROUPS);
            });
    };

    useEffect(() => {
        if (!groupData?.data) return;

        const {image, name, topics} = groupData.data;

        const topic = topics?.map((groupTopic) => ({
            _id: groupTopic._id,
            teacher_id: {
                name: groupTopic?.teacher_id?.name,
                id: groupTopic?.teacher_id?._id,
            },
            price: groupTopic?.price,
            percentage: `${groupTopic?.percentage}`,
            during_month: groupTopic?.during_month,
            start_date: new Date(groupTopic?.start_date),
            week_days: groupTopic?.week_days,
            time_of_day: groupTopic?.time_of_day,
        }));

        reset({
            image: {
                url: image?.url,
                id: image?._id,
            },
            name,
            topics: topic,
        });
    }, [groupData]);

    return (
        <>
            <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Card
                    sx={{
                        padding: 2,
                    }}
                >
                    <Stack gap={2}>
                        <RHFTextField fullWidth name="name" label="Guruh nomi"/>
                        <TopicRow/>
                        <Upload
                            name="image"
                            onDrop={handleDrop}
                            file={values?.image.url}
                            onRemove={handleRemoveFile}
                            onUpload={() => console.log('ON UPLOAD')}
                        />
                    </Stack>
                </Card>

                <Stack marginTop={1.5} alignItems="flex-end">
                    <LoadingButton
                        type="submit"
                        color="inherit"
                        size="large"
                        variant="contained"
                        loading={createGroupRes?.isLoading}
                    >
                        Saqlash
                    </LoadingButton>
                </Stack>
            </RHFFormProvider>

            {loading && <SpinnerLoader/>}
        </>
    );
}
