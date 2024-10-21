import React from 'react';

const Unauthorized = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-4">Unauthorized</h1>
                <p className="text-lg text-gray-700 mb-6">
                    You do not have permission to view this page.
                </p>
                <button 
                    onClick={() => window.history.back()} 
                    className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-300"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default Unauthorized;