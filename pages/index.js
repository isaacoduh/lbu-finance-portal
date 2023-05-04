import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import InvoiceCard from '@/components/InvoiceCard';

const Home = () => {
  const [invoices, setInvoices] = useState([]);
  const router = useRouter();

  const handleSearch = async (query) => {
    // Make API call to fetch search results based on query
    // Replace this with your actual API call logic
    try {
      // console.log(studentId)
      await axios.get(`http://127.0.0.1:4200/api/v1/accounts/student/${query}`)
      .then((response) => {
        console.log(response.data.data.invoices)
        setInvoices(response.data.data.invoices);
      }).catch(error => {
        console.log(error);
      });
      
      // const response = await fetch(`https://api.example.com/search?q=${query}`);
      // const data = await response.json();
      // setSearchResults(data.results);
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    }
  };

  const handleViewDetails = (reference) => {
    // Replace this with your logic to handle view details for the given invoice reference
    console.log(`View details clicked for invoice reference: ${reference}`);
    router.push(`/invoice/${reference}`);
  };
  return (
    <div className="bg-white min-h-screen flex flex-col items-start justify-start">
      {/* Add background color, min-height, flexbox layout */}
      
      <h1 className=" mt-4 text-slate-500 px-4">Retrieve all Invoices for A Student</h1>
      <form
        className="mt-8 flex items-center px-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(e.target.query.value);
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          name="query"
          className="p-2 border border-gray-400 focus:border-gray-800 focus:outline-none"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          Search
        </button>
      </form>
      <div className="mt-8">
        {/* Display search results */}
        {/* {invoiceData.map((invoice, index) => (
          <InvoiceCard
            key={index}
            reference={invoice.reference}
            amount={invoice.amount}
            onViewDetails={() => handleViewDetails(invoice.reference)}
          />
        ))} */}
        {invoices.length > 0 ? (
          
          <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {invoices.map((invoice,index) => (
              <InvoiceCard
              key={index}
              reference={invoice.reference}
              amount={invoice.amount}
              onViewDetails={() => handleViewDetails(invoice.reference)}
            />
            ))}
          </div>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default Home;