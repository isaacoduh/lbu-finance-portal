import React from 'react';

const InvoiceCard = ({ reference, amount, onViewDetails }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl text-gray-400 font-semibold">{`Reference: ${reference}`}</h3>
      <p className="mt-2 text-gray-600">{`Amount: $${amount}`}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        onClick={onViewDetails}
      >
        View Details
      </button>
    </div>
  );
};

export default InvoiceCard;