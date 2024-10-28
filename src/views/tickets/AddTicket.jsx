import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import SelectFiels from 'views/commoncomponent/SelectFiels';
import FormTextField from 'views/commoncomponent/FormTextField';
import { useState } from 'react';
import { addTicket } from 'services/ticketService';
import { getSubscriber } from 'services/SubscribersService';
import { getTicketCategories, getTicketCategoriesS } from 'services/TicketCategoryService';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
};

const validationSchema = Yup.object().shape({
    subscriber: Yup.string().required('Subscriber is required'),
    category: Yup.string().required('Category is required'),
    assignedTo: Yup.string().required('Assigned to is required'),
    priority: Yup.string().required('Priority is required'),
    dueBy: Yup.date().required('Due by date is required'),
    subject: Yup.string().required('Subject is required'),
    // personCalled: Yup.string().required('Person called is required'),
    description: Yup.string().required('Description is required'),
});

export default function AddTicket({ open, setOpen, getTicketData, setLoading }) {
    const userdata = localStorage.getItem('userdata')
    const userId = JSON.parse(userdata)?._id
    const [categoryData, setCategoryData] = useState([])
    const [subscriberData, setSubscriberData] = useState([])


    const getTicketCategoryData = async () => {
        try {
            setLoading(true);
            const response = await getTicketCategoriesS();
            setLoading(false);

            const options = response?.categories?.map((pkg) => ({
                label: pkg?.name,
                value: pkg?._id,
            }));

            setCategoryData(options);
        } catch (error) {
            console.error(error);
        }
    };
    

    const getSubscriberData = async () => {
        try {
            const params = {
                created_by: userId
            }
            setLoading(true);
            const response = await getSubscriber(params);
            setLoading(false);

            const options = response?.subscribers?.map((sub) => ({
                label: sub?.name,
                value: sub?._id,
            }));

            setSubscriberData(options);
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        getSubscriberData()
    }, [])

    React.useEffect(() => {
        getTicketCategoryData()
    }, [])


    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setSubmitAttempted(false);
    };

    const formik = useFormik({
        initialValues: {
            subscriber: '',
            category: '',
            assignedTo: '',
            // personCalled: '',
            priority: '',
            dueBy: dayjs(),
            subject: '',
            description: '',
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                const data = {
                    ...values,
                    created_by: userId
                }

                setLoading(true)
                let response = await addTicket(data);
                handleClose()
                getTicketData()
                setLoading(false)
                setAddAlternativeMobile(false)
                setAddAlternativePhone(false)
            } catch (error) {
                console.error(error);
            }
        },
    });

    const [submitAttempted, setSubmitAttempted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitAttempted(true);
        await formik.submitForm();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" fontSize={'1.5rem'}>
                    Create New Ticket
                </Typography>
                <form onSubmit={handleSubmit}>
                    <SelectFiels
                        field={{ name: 'subscriber', label: 'Subscriber' }}
                        formik={formik}
                        options={subscriberData?.length ? subscriberData : []}
                        handleChange={formik.handleChange}
                    />
                    <SelectFiels
                        field={{ name: 'category', label: 'Category' }}
                        formik={formik}
                        options={categoryData?.length ? categoryData : []}
                        value={formik.values.category.categoryId ? formik.values.category.categoryId : ''}
                        handleChange={formik.handleChange}
                    />
                    <SelectFiels
                        field={{ name: 'assignedTo', label: 'Assign To' }}
                        formik={formik}
                        options={[
                            { label: 'piyush tiwari(admin)', value: 'piyush tiwari(admin)' },
                            { label: 'Ram(piyushpandit123@gmail.com)', value: 'Ram(piyushpandit123@gmail.com)' },
                        ]}
                        handleChange={formik.handleChange}
                    />
                    {/* <FormTextField
                        id="personCalled"
                        label="Person called"
                        name="personCalled"
                        value={formik.values.personCalled || ''}
                        onChange={formik.handleChange}
                        showError={submitAttempted && formik.touched.personCalled && Boolean(formik.errors.personCalled)}
                        error={Boolean(formik.errors.personCalled)}
                        helperText={formik.errors.personCalled}
                    /> */}
                    <SelectFiels
                        field={{ name: 'priority', label: 'Priority' }}
                        formik={formik}
                        options={[
                            { label: 'Low', value: 'Low' },
                            { label: 'Medium', value: 'Medium' },
                            { label: 'High', value: 'High' },
                            { label: 'Urgent', value: 'Urgent' },
                        ]}
                        handleChange={formik.handleChange}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']} >
                            <DatePicker
                                label="Due By"
                                size="small"
                                sx={{
                                    fontSize: '0.875rem',
                                    width: '100%',
                                    height: 'small',
                                }}
                                value={formik.values.dueBy}
                                onChange={(newValue) => formik.setFieldValue('dueBy', newValue)}
                                renderInput={(params) => (
                                    <FormTextField
                                        {...params}
                                        showError={submitAttempted && formik.touched.dueBy && Boolean(formik.errors.dueBy)}
                                        error={Boolean(formik.errors.dueBy)}
                                        helperText={formik.errors.dueBy}
                                    />
                                )}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <FormTextField
                        id="subject"
                        label="Subject"
                        name="subject"
                        value={formik.values.subject || ''}
                        onChange={formik.handleChange}
                        showError={submitAttempted && formik.touched.subject && Boolean(formik.errors.subject)}
                        error={Boolean(formik.errors.subject)}
                        helperText={formik.errors.subject}
                    />
                    <FormTextField
                        id="description"
                        label="Description"
                        name="description"
                        multiline
                        rows={3}
                        value={formik.values.description || ''}
                        onChange={formik.handleChange}
                        showError={submitAttempted && formik.touched.description && Boolean(formik.errors.description)}
                        error={Boolean(formik.errors.description)}
                        helperText={formik.errors.description}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            mt: 2,
                        }}
                    >
                        <Button variant="contained" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="contained" sx={{ ml: 2 }} type="submit">
                            Create
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}