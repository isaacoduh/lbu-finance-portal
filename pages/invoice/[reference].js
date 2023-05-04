// pages/invoice/[reference].js

import React, {useEffect, useState} from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { useRouter } from 'next/router';

const InvoiceDetails = ({reference}) => {
    const [invoice, setInvoice] = useState(null);
    const router = useRouter();
    // Fetch invoice data from API using the reference as a parameter
  const fetchInvoiceDetails = async () => {
    try {
      await axios.get(`http://127.0.0.1:4200/api/v1/invoices/references/${reference}`)
      .then((response) => {
        setInvoice(response.data.data);
      })
      .catch(error => {
        console.log(error);
      }); // Replace with your API endpoint
      
    } catch (error) {
      console.error('Failed to fetch invoice details:', error);
    }
  };

  // Fetch invoice data on component mount
  useEffect(() => {
    fetchInvoiceDetails();
  }, []);

  const handleGoBack = () => {
    // Go back to previous page
    router.back();
  };

  const handlePay = async () => {
    // Handle pay button click
    // Add your logic to perform payment process here
    try {
        await axios.put(`http://127.0.0.1:4200/api/v1/invoices/${reference}/pay`)
        .then((response) => {
        //   setInvoice(response.data.data);
        console.log(response);
            alert(`Payment processed for invoice reference: ${reference}`);
            window.location.reload();
            
        })
        .catch(error => {
          console.log(error);
        }); // Replace with your API endpoint
        
      } catch (error) {
        console.error('Failed to fetch invoice details:', error);
      }
   
  };
  // Render invoice details
  return (
    <div className="bg-white min-h-screen  flex flex-col items-start justify-start py-4 px-4">
      {/* Add background color, min-height, flexbox layout */}
      {/* <Navbar /> */}
      <h1 className="text-3xl mt-4 text-gray-400">Invoice Details</h1>
      {invoice ? (
        // Render invoice details if data is available
        <div className="mt-8 text-gray-800">
          <p>{`Reference: ${invoice.reference}`}</p>
          <p>{`Amount: $${invoice.amount}`}</p>
          <p>{`Status: ${invoice.status}`}</p>
          <p>{`Type: ${invoice.type}`}</p>
          {invoice.status === 'PAID' && (
            <span className="bg-green-500 text-white font-bold py-1 px-2 mt-2 rounded">
              Paid
            </span>
          )}
          {invoice.status !== 'PAID' && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded"
              onClick={handlePay}
            >
              Pay
            </button>
          )}
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 mt-4 mx-3 rounded"
            onClick={handleGoBack}
          >
            Go Back
          </button>
          {/* Render other invoice details */}
        </div>
      ) : (
        // Render loading or error message if data is not available
        <p className="mt-8">Loading invoice details...</p>
      )}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  // Fetch invoice data using the reference from the URL
  // Replace this with your actual logic to fetch invoice details from an API or database
  const { reference } = params;
  return {
    props: {
      reference,
    },
  };
}

export default InvoiceDetails;
