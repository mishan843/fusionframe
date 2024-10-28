import React from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useState } from 'react';
import { getNAS } from 'services/NASService';
import SelectFiels from 'views/commoncomponent/SelectFiels';
import FormTextField from 'views/commoncomponent/FormTextField';
import { getPackageS } from 'services/PackageService';
import { addInvoice, UpdateInvoice } from 'services/BillingService';
import { getSubscriber } from 'services/SubscribersService';
import { getDiscounts } from 'services/discountService';

const validationSchema = Yup.object().shape({
  natureOfTrans: Yup.string().required('Nature of Transactions is required'),
  custType: Yup.string().required('Customer Type is required'),
  natureOfSupply: Yup.string().required('Nature Of Supply No is required'),
  purOrderNo: Yup.string().required('Purchase Order No is required'),
  purOrderDate: Yup.string().required('Purchase Order Date is required'),
  partyName: Yup.string().required('Party name is required'),
  partyAddress: Yup.string().required('Party address is required'),
  companyPan: Yup.string().required('pan No is required'),
  pincode: Yup.string().required('pincode is required'),
});

const editValidationSchema = Yup.object().shape({
  natureOfTrans: Yup.string().required('Nature of Transactions is required'),
  custType: Yup.string().required('Customer Type is required'),
  natureOfSupply: Yup.string().required('Nature Of Supply No is required'),
  purOrderNo: Yup.string().required('Purchase Order No is required'),
  purOrderDate: Yup.string().required('Purchase Order Date is required'),
  partyName: Yup.string().required('Party name is required'),
  partyAddress: Yup.string().required('Party address is required'),
  companyPan: Yup.string().required('pan No is required'),
  pincode: Yup.string().required('pincode is required'),

});

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep",
  "Puducherry"
]

const GeneralInfo = ({ invoiceDetails, setInvoiceId, setLoading }) => {
  const userdata = localStorage.getItem("userdata");
  const userId = JSON.parse(userdata)?._id;
  const navigate = useNavigate();
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [nasData, setNASData] = useState([]);
  const [packageData, setPackageData] = useState([])
  const [subscribeData, setSubscribeData] = useState([])
  const [discountData, setDiscountData] = useState([])
  const [planData, setPlanData] = useState([])
  const [discountPlan, setDiscountPlan] = useState([])

  const getPackageData = async () => {
    try {
      setLoading(true);
      const response = await getPackageS();
      setLoading(false);

      const options = response?.packages?.map((pkg) => ({
        label: pkg.name,
        value: pkg._id,
      }));

      setPackageData(options);
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

      const options = response?.subscribers?.map((pkg) => ({
        label: pkg.name,
        value: pkg._id,
      }));

      setSubscribeData(options);
    } catch (error) {
      console.error(error);
    }
  };

  const getDiscountData = async () => {
    try {
      const params = {
        created_by: userId
      }
      setLoading(true);
      const response = await getDiscounts(params);
      setLoading(false);
      const discounts = response.discounts
      setDiscountPlan(discounts)

      const options = response?.discounts?.map((pkg) => ({
        label: pkg.percentage,
        value: pkg._id,
      }));

      const planoptions = response?.discounts?.map((pkg) => ({
        label: pkg.plan.planName,
        value: pkg.plan.planId,
      }));

      setDiscountData(options);
      setPlanData(planoptions)
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(subscribeData, 'subscribeData');
  // console.log(discountData, 'discountData');
  // console.log(planData, 'planData');
  // console.log(discountPlan, 'discountPlan');


  useEffect(() => {
    getPackageData()
    getSubscriberData()
    getDiscountData()
  }, [])

  const formik = useFormik({
    initialValues: {
      natureOfTrans: "",
      custType: "",
      natureOfSupply: "",
      purOrderNo: "",
      purOrderDate: "",
      partyName: "",
      partyAddress: "",
      pincode: "",
      companyPan: "",
      gstNo: "",
      comment: "",
      natureOfInvoice: "",
      invoiceNo: "",
      billingPeriod: "",
      billingPeriodStart: "",
      billingPeriodEnd: "",
      invoiceDate: "",
      creditTerms: "",
      hsnsacCode: "",
      descOfGood: "",
      qty: "",
      rate: "",
      usagePrice: "",
      uom: "",
      deliveryCharges: "",
      discount: ""
    },
    validationSchema: invoiceDetails ? editValidationSchema : validationSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      console.log(values, 'values');
      
      try {
        const data = {
          ...values,
          billingPeriod: `${values.billingPeriodStart} to ${values.billingPeriodEnd}`,
          created_by: userId,
        };
        let response;
        setLoading(true)
        if (invoiceDetails) {
          response = await UpdateInvoice(data, invoiceDetails._id);
        } else {
          response = await addInvoice(data);
          navigate('/billing/invoice-management')

          if (!response?.error) {
            setInvoiceId(response?.reseller?._id)
          }
        }
        setLoading(false)
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (invoiceDetails) {
      const [billingPeriodStart, billingPeriodEnd] = invoiceDetails.billingPeriod
        ? invoiceDetails.billingPeriod.split(' to ')
        : ['', ''];
      formik.setValues({
        natureOfTrans: invoiceDetails.natureOfTrans,
        custType: invoiceDetails.custType,
        natureOfSupply: invoiceDetails.natureOfSupply,
        purOrderNo: invoiceDetails.purOrderNo,
        purOrderDate: invoiceDetails.purOrderDate,
        partyName: invoiceDetails.partyName,
        partyAddress: invoiceDetails.partyAddress,
        pincode: invoiceDetails.pincode,
        companyPan: invoiceDetails.companyPan,
        gstNo: invoiceDetails.gstNo,
        comment: invoiceDetails.comment,
        discount: invoiceDetails.discount,
        natureOfInvoice: invoiceDetails.natureOfInvoice,
        invoiceNo: invoiceDetails.invoiceNo,
        billingPeriod: invoiceDetails.billingPeriod,
        billingPeriodStart, // Set the start date
        billingPeriodEnd,
        invoiceDate: invoiceDetails.invoiceDate,
        creditTerms: invoiceDetails.creditTerms,
        hsnsacCode: invoiceDetails.hsnsacCode,
        descOfGood: invoiceDetails?.descOfGood?.planId || '',
        qty: invoiceDetails.qty,
        rate: invoiceDetails.rate,
        usagePrice: invoiceDetails.usagePrice,
        uom: invoiceDetails.uom,
        deliveryCharges: invoiceDetails.deliveryCharges,
      });
    }
  }, [invoiceDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);
    await formik.submitForm();
  };

  const getNASData = async () => {
    try {
      const params = {
        skip: 0,
        limit: 0
      };
      const response = await getNAS(params);
      setNASData(response?.nases);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNASData();
  }, []);

  const handleSubscriberChange = (event) => {
    const selectedSubscriberId = event.target.value;
    
    // Find the corresponding discount and plan from discountPlan array
    const matchingDiscountPlan = discountPlan.find(
      (item) => item.subscriber.subscriberId === selectedSubscriberId
    );
  
    if (matchingDiscountPlan) {
      console.log(matchingDiscountPlan, 'matchingDiscountPlan');
      
      // Update formik values with the found discount and plan
      formik.setFieldValue('discount',matchingDiscountPlan._id);
  
      formik.setFieldValue('descOfGood', matchingDiscountPlan.plan.planId);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Paper >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <SelectFiels
                field={{ name: 'natureOfTrans', label: 'Nature of Transaction' }}
                formik={formik}
                options={[
                  { label: 'Intra-State Supply', value: 'Intra-State Supply' },
                  { label: 'Intra-City Supply', value: 'Intra-City Supply' },
                ]}
                handleChange={formik.handleChange}
              />
              <SelectFiels
                field={{ name: 'custType', label: 'Customer Type' }}
                formik={formik}
                options={[
                  { label: 'Registered', value: 'Registered' },
                  { label: 'UnRegistered', value: 'UnRegistered' },
                ]}
                handleChange={formik.handleChange}
              />
              <SelectFiels
                field={{ name: 'natureOfSupply', label: 'Nature of Supply' }}
                formik={formik}
                options={[
                  { label: 'Services', value: 'Services' },
                  // { label: 'Intra-City Supply', value: 'Intra-City Supply' },
                ]}
                handleChange={formik.handleChange}
              />
              <FormTextField
                id="purOrderNo"
                label="Purchase Order No"
                name="purOrderNo"
                value={formik.values.purOrderNo || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.purOrderNo}
                error={formik.errors.purOrderNo}
                helperText={formik.errors.purOrderNo}
              />
              <FormTextField
                id="purOrderDate"
                label="Purchase Order Date"
                name="purOrderDate"
                value={moment(formik.values?.purOrderDate).format('YYYY-MM-DD') || ''}
                onChange={formik.handleChange}
                type="date"
                InputLabelProps={{ shrink: true }}
                showError={submitAttempted && formik.touched.purOrderDate}
                error={formik.errors.purOrderDate}
                helperText={formik.errors.purOrderDate}
              />
              {/* <FormTextField
                id="partyName"
                label="Party Name"
                name="partyName"
                value={formik.values.partyName || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.partyName}
                error={formik.errors.partyName}
                helperText={formik.errors.partyName}
              /> */}
              <SelectFiels
                field={{ name: 'partyName', label: 'Party Name' }}
                formik={formik}
                options={[
                  ...subscribeData
                ]}
                value={formik.values.partyName.partyNameId ? formik.values.partyName.partyNameId : ''}
                handleChange={(event) => {
                  formik.handleChange(event);
                  handleSubscriberChange(event);  // Handle subscriber change
                }}
                // error={Boolean(formik.errors.partyName)}
              />
              <FormTextField
                id="partyAddress"
                label="Party Address"
                name="partyAddress"
                value={formik.values.partyAddress || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.partyAddress}
                error={formik.errors.partyAddress}
                helperText={formik.errors.partyAddress}
              />
              <FormTextField
                id="pincode"
                label="Pin Code"
                name="pincode"
                value={formik.values.pincode || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.pincode}
                error={formik.errors.pincode}
                helperText={formik.errors.pincode}
              />

              <FormTextField
                id="companyPan"
                label="Company PAN"
                name="companyPan"
                value={formik.values.companyPan || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.companyPan}
                error={formik.errors.companyPan}
                helperText={formik.errors.companyPan}
              />

              <FormTextField
                id="gstNo"
                label="GSTIN / UID"
                name="gstNo"
                value={formik.values.gstNo || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.gstNo}
                error={formik.errors.gstNo}
                helperText={formik.errors.gstNo}
              />
              <SelectFiels
                field={{ name: 'discount', label: 'Discount' }}
                formik={formik}
                options={[
                  ...discountData
                ]}
                value={formik.values.discount.discountId ? formik.values.discount.discountId : ''}
                handleChange={formik.handleChange}
                error={Boolean(formik.errors.discount)}
              />
              <FormTextField
                id="comment"
                label="Comment"
                name="comment"
                value={formik.values.comment || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.comment}
                error={formik.errors.comment}
                helperText={formik.errors.comment}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectFiels
                field={{ name: 'natureOfInvoice', label: 'Nature of Invoice' }}
                formik={formik}
                options={[
                  { label: 'Original', value: 'Original' },
                  { label: 'Dummy', value: 'Dummy' },
                ]}
                handleChange={formik.handleChange}
              />
              <FormTextField
                id="invoiceNo"
                label="Invoice No."
                name="invoiceNo"
                value={formik.values.invoiceNo || ''}
                onChange={formik.handleChange}
              />
              <div className='d-flex gap-3'>
                {/* <FormTextField
                  id="billingPeriod"
                  label="Billing Period"
                  name="dob"
                  value={moment(formik.values?.billingPeriod).format('YYYY-MM-DD') || ''}
                  onChange={formik.handleChange}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                /> */}
                <FormTextField
                  id="billingPeriodStart"
                  label="Billing Period Start"
                  name="billingPeriodStart"
                  value={formik.values?.billingPeriodStart || ''}
                  onChange={formik.handleChange}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
                <FormTextField
                  id="billingPeriodEnd"
                  label="Billing Period End"
                  name="billingPeriodEnd"
                  value={formik.values?.billingPeriodEnd || ''}
                  onChange={formik.handleChange}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <FormTextField
                id="invoiceDate"
                label="Invoice Date"
                name="invoiceDate"
                value={moment(formik.values?.invoiceDate).format('YYYY-MM-DD') || ''}
                onChange={formik.handleChange}
                type="date"
                InputLabelProps={{ shrink: true }}
              />
              <SelectFiels
                field={{ name: 'creditTerms', label: 'Credit Terms' }}
                formik={formik}
                options={[
                  { label: 'Cash', value: 'Cash' },
                  { label: 'Online', value: 'Online' },
                ]}
                handleChange={formik.handleChange}
              />

              <FormTextField
                id="hsnsacCode"
                label="HSN / SAC Code"
                name="hsnsacCode"
                value={formik.values.hsnsacCode || ''}
                onChange={formik.handleChange}
              />
              {/* <SelectFiels
                field={{ name: 'descOfGood', label: 'Description of Good' }}
                formik={formik}
                options={[
                  { label: 'Original', value: 'Original' },
                  { label: 'Dummy', value: 'Dummy' },
                ]}
                handleChange={formik.handleChange}
              /> */}
              <SelectFiels
                field={{ name: 'descOfGood', label: 'Description of Good' }}
                formik={formik}
                options={[
                  ...packageData
                ]}
                value={formik.values.descOfGood.descOfGoodId ? formik.values.descOfGood.descOfGoodId : ''}
                // label={formik.values.descOfGood.label ? formik.values.descOfGood.label : ""}
                handleChange={formik.handleChange}
                error={Boolean(formik.errors.descOfGood)}
              />

              <FormTextField
                id="qty"
                label="Quantity"
                name="qty"
                value={formik.values.qty || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.qty}
                error={formik.errors.qty}
                helperText={formik.errors.qty}
              />
              <FormTextField
                id="uom"
                label="UoM"
                name="uom"
                value={formik.values.uom || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.uom}
                error={formik.errors.uom}
                helperText={formik.errors.uom}
              />
              <FormTextField
                id="rate"
                label="Rate (per item)"
                name="rate"
                value={formik.values.rate || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.rate}
                error={formik.errors.rate}
                helperText={formik.errors.rate}
              />
              <FormTextField
                id="usagePrice"
                label="Usage Price"
                name="usagePrice"
                value={formik.values.usagePrice || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.usagePrice}
                error={formik.errors.usagePrice}
                helperText={formik.errors.usagePrice}
              />
              <FormTextField
                id="deliveryCharges"
                label="Delivery Charges"
                name="deliveryCharges"
                value={formik.values.deliveryCharges || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.deliveryCharges}
                error={formik.errors.deliveryCharges}
                helperText={formik.errors.deliveryCharges}
              />
            </Grid>
          </Grid>
          <Box display={'flex'} gap={2}>
            <Button variant="contained" sx={{ width: '100px' }} type='submit'>
              Save
            </Button>
            <Button variant="contained" sx={{ width: '100px' }} onClick={() => navigate('/billing/invoice-management')} >
              Cancel
            </Button>
          </Box>
        </Paper>
      </form>
    </Box>
  );
};

export default GeneralInfo;