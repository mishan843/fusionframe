import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './Invoice.css'; // Create a CSS file to style the invoice
import { toWords } from 'number-to-words';

const Invoice = React.forwardRef(({ invoiceDetails }, ref) => {
  
  const numberToWords = (num) => {
    let integerPart = Math.floor(num); // For rupees
    let decimalPart = Math.round((num - integerPart) * 100); // For paise
  
    let rupeesInWords = toWords(integerPart); // Convert rupees to words
    let paiseInWords = decimalPart > 0 ? toWords(decimalPart) + ' Paise' : ''; // Convert paise if applicable
  
    if (integerPart && !decimalPart) {
      return rupeesInWords.charAt(0).toUpperCase() + rupeesInWords.slice(1) + ' Rupees Only';
    } else if (integerPart && decimalPart) {
      return (
        rupeesInWords.charAt(0).toUpperCase() +
        rupeesInWords.slice(1) +
        ' Rupees and ' +
        paiseInWords +
        ' Only'
      );
    } else {
      return 'Zero Rupees';
    }
  };
  return (
    <div ref={ref} className="invoice-container">
      <div className="header">
        <h2>IPNET BROADBAND NETWORK PRIVATE LIMITED</h2>
        <p>Address: NEERAJ VILLA PO MANPUR WEST, NEAR NEW ITIRAMPUR ROAD, MITRA VIHAR DAHRYA, Nainital, Uttarakhand, 263139</p>
        <p>GSTIN: 05AAFCT7344M1Z9 | Contact: +91 9810407430</p>
      </div>

      <div className="transaction-details">
        <div>
          <p>Nature of Transaction: {invoiceDetails?.natureOfTrans}</p>
          <p>Customer Type: {invoiceDetails?.custType}</p>
          <p>Nature of Supply: {invoiceDetails?.custType}</p>
          <p>Purchase Order Number: {invoiceDetails?.purOrderNo}</p>
          <p>Purchase Order Date: {invoiceDetails?.purOrderDate}</p>
          <p>Party Name: {invoiceDetails?.partyName}</p>
          <p>Address: {invoiceDetails?.partyAddress}</p>
          <p>Pin Code: {invoiceDetails?.pincode}</p>
        </div>

        <div>
          <p>Nature of Invoice: {invoiceDetails?.natureOfInvoice}</p>
          <p>Invoice Number: {invoiceDetails?.invoiceNo}</p>
          <p>Billing Period: {invoiceDetails?.billingPeriod}</p>
          <p>Invoice Date: {invoiceDetails?.invoiceDate}</p>
          <p>Credit Terms: {invoiceDetails?.creditTerms}</p>
        </div>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Description of Goods</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Net Taxable Value</th>
            <th>CGST</th>
            <th>SGST</th>
            <th>IGST</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{invoiceDetails?.descOfGood?.planName}</td>
            <td>{invoiceDetails?.qty}</td>
            <td>{invoiceDetails?.rate}</td>
            <td>{invoiceDetails?.netTaxableValue}</td>
            <td>{invoiceDetails?.cgst}</td>
            <td>{invoiceDetails?.sgst}</td>
            <td>{invoiceDetails?.igst}</td>
            <td>{invoiceDetails?.total}</td>
          </tr>
        </tbody>
      </table>

      <div className="footer">
        <p>Total Amount: {invoiceDetails?.total}</p>
        <p>{invoiceDetails?.total ? numberToWords(invoiceDetails.total) : ''}</p>
      </div>

      <div className="signature">
        <p>Signature</p>
        <p>Name of Authorised Signatory</p>
      </div>
    </div>
  );
});

const InvoicePage = ({ invoiceDetails }) => {
  const componentRef = useRef();
  return (
    <div>
      <Invoice ref={componentRef} invoiceDetails={invoiceDetails} />
    </div>
  );
};

export default InvoicePage;
