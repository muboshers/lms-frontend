import React from 'react';
import * as yup from "yup";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import {LoadingButton} from "@mui/lab";
import {Stack, Dialog, DialogTitle, DialogContent} from "@mui/material";

import TeacherSearch from "./teacher-search";
import {WEEK_DAYS, CLEAVE_SUM_CONFIG} from "../../contants";
import {useCreateTopicMutation} from "../../api/topic-api-req";
import FormProvider from "../../components/hook-form/RHFFormProvider";
import {RHFTextField, RHFDatePicker, RHFCleaveField, RHFAutocomplete} from "../../components/hook-form";

export function TopicAddEditForm({groupId, open, onClose}) {

    const [topicCreate, topicCreateRes] = useCreateTopicMutation()

    const schema = yup.object().shape({
        teacher_id: yup
            .string()
            .required("O'qituvchini belgilash talab etiladi"),
        price: yup
            .string()
            .required("O'qituvchini narhi talab etiladi har bir o'quvchi uchun"),
        percentage: yup
            .string()
            .required("O'qituvchining % foizi talab etiladi)"),
        week_days: yup.array().min(1).required("Hafta kunlari talab etiladi"),
        during_month: yup
            .string()
            .max(2, "Siz kiritgan muddat xato!")
            .required("Davomiylik muddati talab etiladi (oy hisobida)"),
        start_date: yup.string().required("Boshlanish sanasi talab etiladi"),
        time_of_day: yup.string().required("Soatini yozish talab etiladi"),
    })


    const defaultValues = {
        teacher_id: "",
        price: "",
        percentage: "",
        during_month: "",
        start_date: new Date(),
        week_days: [],
        time_of_day: "",
    }

    const methods = useForm({
        resolver: yupResolver(schema), defaultValues,
    })

    const {handleSubmit, reset, setValue} = methods;

    const dialogClose = () => {
        reset(defaultValues)
        onClose()
    }

    const onSubmit = (topicData) => {
        topicCreate({
            ...topicData,
            price: parseInt(topicData.price, 10),
            percentage: parseInt(topicData.percentage, 10),
            group_id: groupId
        }).unwrap().then(res => {
            toast.success("Topik mufaqqiyatli qo'shildi")
            dialogClose()
        })
    }

    return (
        <Dialog open={open} onClose={dialogClose}>
            <DialogTitle>
                Yangi topik qo&apos;shish
            </DialogTitle>
            <DialogContent>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack gap={2} sx={{
                        width: "100vw", maxWidth: "500px", padding: "1rem 0"
                    }}>
                        <RHFCleaveField
                            name="price"
                            label="Narhini yozing"
                            helperText="Har bir o'quvchi uchun (oylik)"
                            options={CLEAVE_SUM_CONFIG}
                        />
                        <RHFCleaveField
                            name="percentage"
                            label="Foizni yozing"
                            helperText="O'qituvchini fozini"

                        />
                        <TeacherSearch
                            name="teacher_id"
                            setValue={setValue}
                        />
                        <RHFTextField
                            name="during_month"
                            inputProps={{
                                maxLength: 2,
                            }}
                            helperText="O'quv muddati davomiyligi oy hisabida"
                        />
                        <RHFAutocomplete
                            multiple
                            fullWidth
                            name="week_days"
                            options={WEEK_DAYS.map((option) => option.value)}
                            label="Hafta kunlarini tanlang"
                        />
                        <RHFDatePicker
                            name="start_date"
                        />

                        <RHFTextField
                            name="time_of_day"
                            inputProps={{
                                maxLength: 5,
                            }}
                            helperText="O'quv dasturining soati va daqiqasini yozing (kunlik)"
                        />
                    </Stack>

                    <LoadingButton loading={topicCreateRes.isLoading} fullWidth type="submit" sx={{marginTop: 1}}
                                   variant="contained" color="inherit"
                                   size="large">
                        Qo&apos;shish
                    </LoadingButton>
                </FormProvider>
            </DialogContent>
        </Dialog>);
}

TopicAddEditForm.propTypes = {
    groupId: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func
}