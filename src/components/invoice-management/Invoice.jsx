// import React from "react";

// const Invoice = ({ id }) => {
//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-8">
//         {/* Header Section */}
//         <header className="flex justify-between items-start mb-6">
//           <div>
//             <h1 className="text-xl font-semibold">Invoice #{id}</h1>
//           </div>
//           <div className="text-right">
//             <button className="text-gray-500 hover:underline">Download</button>
//           </div>
//         </header>

//         {/* Company and Billing Information */}
//         <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <div>
//             <h2 className="text-lg font-semibold">Billed From</h2>
//             <p className="font-semibold">Truevital Wellness Private Limited</p>
//             <p>
//               <span className="font-semibold">Registered Address : </span> H-21,
//               First Floor, Sector 63, Noida, UP 201301, India,
//             </p>
//             <p>
//               <span className="font-semibold">Shipped From : </span>
//               H-21, First Floor, Sector 63, Noida, UP 201301, India
//             </p>
//             <p>
//               <span className="font-semibold">Contact : </span>9657367437
//             </p>
//             <p>
//               <span className="font-semibold">Support Email : </span>
//               omniaurvy@gmail.com
//             </p>
//             <p>
//               {" "}
//               <span className="font-semibold">CIN : </span>U12003UP2031CIB8410
//             </p>
//             <p>
//               <span className="font-semibold">PAN : </span>AACC872FSH
//             </p>
//             <p>
//               <span className="font-semibold">GST : </span> 09AAIC8725F1ZC
//             </p>
//             <p>
//               <span className="font-semibold">FSSAI : </span> 1272105501176
//             </p>
//           </div>
//           <div className="text-right ">
//             <img
//               src="https://creworder.com/omni/public/uploads/company/1723105888_de7e2939fc901ce173e8.png"
//               alt="Company Logo"
//               className="mb-8"
//             />
//             <div className="col-span-2 text-center border border-slate-300 p-2">
//               <h2 className="text-lg font-semibold">
//                 Payment Status: <span className="text-red-600">UnPaid</span>
//               </h2>
//             </div>
//           </div>
//         </section>
//         <section className="overflow-x-auto mb-8">
//           <div className="w-full text-center border border-slate-300 bg-slate-200 p-2 font-semibold">
//             <strong>Tax Invoice/Bill of Supply/Cash Memo</strong>
//           </div>
//         </section>
//         {/* Invoice Information */}
//         <section className="flex justify-between items-start mb-8">
//           <div>
//             <h2 className="text-lg font-semibold">Billed & Shipped To</h2>
//             <p>Bittu Balla</p>
//             <p>Danapur Patna, Patna</p>
//             <p>Place of Supply: Bihar, 801503</p>
//             <p>Contact: 9508628288</p>
//           </div>
//           <div className="text-right">
//             <h2 className="text-lg font-semibold">Invoice Information</h2>
//             <p>
//               Invoice Number: <strong>#{id}</strong>
//             </p>
//             <p>
//               Issue Date: <strong>03 Sep, 2024</strong>
//             </p>
//           </div>
//         </section>

//         {/* Product Table */}
//         <section className="overflow-x-auto mb-8">
//           <table className="min-w-full table-auto border-collapse border border-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 border-b">#</th>
//                 <th className="px-4 py-2 border-b">PRODUCT NAME</th>
//                 <th className="px-4 py-2 border-b">HSN</th>
//                 <th className="px-4 py-2 border-b">QTY.</th>
//                 <th className="px-4 py-2 border-b">MRP</th>
//                 <th className="px-4 py-2 border-b">DISC AMT.</th>
//                 <th className="px-4 py-2 border-b">TAXABLE AMT.</th>
//                 <th className="px-4 py-2 border-b">GST RATE</th>
//                 <th className="px-4 py-2 border-b">GST AMT.</th>
//                 <th className="px-4 py-2 border-b">TOTAL AMT.</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="px-4 py-2 border-b text-center">1</td>
//                 <td className="px-4 py-2 border-b">HeartDetox Kit (HCK)</td>
//                 <td className="px-4 py-2 border-b text-center">---</td>
//                 <td className="px-4 py-2 border-b text-center">1</td>
//                 <td className="px-4 py-2 border-b text-center">4500</td>
//                 <td className="px-4 py-2 border-b text-center">3000</td>
//                 <td className="px-4 py-2 border-b text-center">1500</td>
//                 <td className="px-4 py-2 border-b text-center">0%</td>
//                 <td className="px-4 py-2 border-b text-center">0</td>
//                 <td className="px-4 py-2 border-b text-center">1500</td>
//               </tr>
//             </tbody>
//           </table>
//         </section>

//         {/* Payment and Amount Information */}
//         <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//   {/* Tax Information Section */}
//   <div>
//     <h2 className="text-lg font-semibold mb-4">Tax Information</h2>
//     <div className="grid grid-cols-3 gap-2 text-center border-t border-gray-200 pt-4">
//       <div>
//         <p className="font-medium">CGST</p>
//         <p>0</p>
//       </div>
//       <div>
//         <p className="font-medium">SGST</p>
//         <p>0</p>
//       </div>
//       <div>
//         <p className="font-medium">IGST</p>
//         <p>0</p>
//       </div>
//     </div>
//   </div>

//   {/* Amount Information Section */}
//   <div className="space-y-2">
//     <div className="flex justify-between">
//       <div className="font-medium">TOTAL QUANTITY</div>
//       <div>1</div>
//     </div>
//     <div className="flex justify-between">
//       <div className="font-medium">GROSS AMOUNT</div>
//       <div>4500</div>
//     </div>
//     <div className="flex justify-between">
//       <div className="font-medium">SHIPPING CHARGES</div>
//       <div>3000</div>
//     </div>
//     <div className="flex justify-between">
//       <div className="font-medium">BILL AMOUNT</div>
//       <div>1500</div>
//     </div>
//     <div className="flex justify-between bg-gray-200 p-2 font-semibold">
//       <div className="text-gray-800">PAYABLE AMOUNT</div>
//       <div className="text-gray-800">1500</div>
//     </div>
//   </div>
// </section>

        // <section className="overflow-x-auto mb-8">
        //   <div className="w-full text-left border border-slate-300 bg-slate-200 p-2">
        //     <strong className="font-semibold">Amount in Words : </strong>INR One
        //     Thousand Five Hundred Only
        //   </div>
        // </section>
        // <section className="overflow-x-auto mb-8">
        //   <div className="flex justify-between">
        //     <div className="text-left">
        //       <h2 className="text-lg font-semibold">Payment Information</h2>
        //       <p>Bank Name: IDFC First Bank Limited</p>
        //       <p>Branch: Sector 18, Noida, UP</p>
        //       <p>Account Type: Current Account</p>
        //       <p>Account Number: 10058747643</p>
        //       <p>IFSC: IDFB0020151</p>
        //     </div>
        //     <div className="text-right">
        //       <h2 className="text-lg font-semibold ">
        //         For : Truevital Wellness Private Limited
        //       </h2>
        //       <img
        //         src="data:image/png;base64,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"
        //         alt="Company Logo"
        //         className="mb-8 w-96 p-9"
        //       />
        //     </div>
        //   </div>
        // </section>
        // {/* Footer Section */}
        // <footer className="mt-8">
        //   <p className="text-gray-500 text-xs">
        //     For: Truevital Wellness Private Limited
        //   </p>
        //   <p className="text-gray-500 text-xs">Disclaimer: - L</p>
        // </footer>
//       </div>
//     </div>
//   );
// };

// export default Invoice;
import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = ({ id }) => {
  const downloadPDF = () => {
    const input = document.getElementById('invoice');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`invoice_${id}.pdf`);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div id="invoice" className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-8">
        {/* Header Section */}
        <header className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-xl font-semibold">Invoice #{id}</h1>
          </div>
          <div className="text-right">
            <button
              onClick={downloadPDF}
              className="text-gray-500 hover:underline"
            >
              Download
            </button>
          </div>
        </header>

        {/* Company and Billing Information */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-lg font-semibold">Billed From</h2>
            <p className="font-semibold">Truevital Wellness Private Limited</p>
            <p>
              <span className="font-semibold">Registered Address : </span> H-21,
              First Floor, Sector 63, Noida, UP 201301, India,
            </p>
            <p>
              <span className="font-semibold">Shipped From : </span>
              H-21, First Floor, Sector 63, Noida, UP 201301, India
            </p>
            <p>
              <span className="font-semibold">Contact : </span>9657367437
            </p>
            <p>
              <span className="font-semibold">Support Email : </span>
              omniaurvy@gmail.com
            </p>
            <p>
              {" "}
              <span className="font-semibold">CIN : </span>U12003UP2031CIB8410
            </p>
            <p>
              <span className="font-semibold">PAN : </span>AACC872FSH
            </p>
            <p>
              <span className="font-semibold">GST : </span> 09AAIC8725F1ZC
            </p>
            <p>
              <span className="font-semibold">FSSAI : </span> 1272105501176
            </p>
          </div>
          <div className="text-right ">
            <img
              src="https://creworder.com/omni/public/uploads/company/1723105888_de7e2939fc901ce173e8.png"
              alt="Company Logo"
              className="mb-8"
            />
            <div className="col-span-2 text-center border border-slate-300 p-2">
              <h2 className="text-lg font-semibold">
                Payment Status: <span className="text-red-600">UnPaid</span>
              </h2>
            </div>
          </div>
        </section>
        <section className="overflow-x-auto mb-8">
          <div className="w-full text-center border border-slate-300 bg-slate-200 p-2 font-semibold">
            <strong>Tax Invoice/Bill of Supply/Cash Memo</strong>
          </div>
        </section>
        {/* Invoice Information */}
        <section className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-lg font-semibold">Billed & Shipped To</h2>
            <p>Bittu Balla</p>
            <p>Danapur Patna, Patna</p>
            <p>Place of Supply: Bihar, 801503</p>
            <p>Contact: 9508628288</p>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold">Invoice Information</h2>
            <p>
              Invoice Number: <strong>#{id}</strong>
            </p>
            <p>
              Issue Date: <strong>03 Sep, 2024</strong>
            </p>
          </div>
        </section>

        {/* Product Table */}
        <section className="overflow-x-auto mb-8">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">#</th>
                <th className="px-4 py-2 border-b">PRODUCT NAME</th>
                <th className="px-4 py-2 border-b">HSN</th>
                <th className="px-4 py-2 border-b">QTY.</th>
                <th className="px-4 py-2 border-b">MRP</th>
                <th className="px-4 py-2 border-b">DISC AMT.</th>
                <th className="px-4 py-2 border-b">TAXABLE AMT.</th>
                <th className="px-4 py-2 border-b">GST RATE</th>
                <th className="px-4 py-2 border-b">GST AMT.</th>
                <th className="px-4 py-2 border-b">TOTAL AMT.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b text-center">1</td>
                <td className="px-4 py-2 border-b">HeartDetox Kit (HCK)</td>
                <td className="px-4 py-2 border-b text-center">---</td>
                <td className="px-4 py-2 border-b text-center">1</td>
                <td className="px-4 py-2 border-b text-center">4500</td>
                <td className="px-4 py-2 border-b text-center">3000</td>
                <td className="px-4 py-2 border-b text-center">1500</td>
                <td className="px-4 py-2 border-b text-center">0%</td>
                <td className="px-4 py-2 border-b text-center">0</td>
                <td className="px-4 py-2 border-b text-center">1500</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Payment and Amount Information */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Tax Information Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Tax Information</h2>
            <div className="grid grid-cols-3 gap-2 text-center border-t border-gray-200 pt-4">
              <div>
                <p className="font-medium">CGST</p>
                <p>0</p>
              </div>
              <div>
                <p className="font-medium">SGST</p>
                <p>0</p>
              </div>
              <div>
                <p className="font-medium">IGST</p>
                <p>0</p>
              </div>
            </div>
          </div>

          {/* Amount Information Section */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="font-medium">TOTAL QUANTITY</div>
              <div>1</div>
            </div>
            <div className="flex justify-between">
              <div className="font-medium">GROSS AMOUNT</div>
              <div>4500</div>
            </div>
            <div className="flex justify-between">
              <div className="font-medium">SHIPPING CHARGES</div>
              <div>3000</div>
            </div>
            <div className="flex justify-between">
              <div className="font-medium">BILL AMOUNT</div>
              <div>1500</div>
            </div>
            <div className="flex justify-between bg-gray-200 p-2 font-semibold">
              <div className="text-gray-800">PAYABLE AMOUNT</div>
              <div className="text-gray-800">1500</div>
            </div>
          </div>
        </section>

        <section className="overflow-x-auto mb-8">
          <div className="w-full text-left border border-slate-300 bg-slate-200 p-2">
            <strong className="font-semibold">Amount in Words : </strong>INR One
            Thousand Five Hundred Only
          </div>
        </section>
        <section className="overflow-x-auto mb-8">
          <div className="flex justify-between">
            <div className="text-left">
              <h2 className="text-lg font-semibold">Payment Information</h2>
              <p>Bank Name: IDFC First Bank Limited</p>
              <p>Branch: Sector 18, Noida, UP</p>
              <p>Account Type: Current Account</p>
              <p>Account Number: 10058747643</p>
              <p>IFSC: IDFB0020151</p>
            </div>
            <div className="text-right">
              <h2 className="text-lg font-semibold ">
                For : Truevital Wellness Private Limited
              </h2>
              <img
                src="data:image/png;base64,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"
                alt="Company Logo"
                className="mb-8 w-96 p-9"
              />
            </div>
          </div>
        </section>
        {/* Footer Section */}
        <footer className="mt-8">
          <p className="text-gray-500 text-xs">
            For: Truevital Wellness Private Limited
          </p>
          <p className="text-gray-500 text-xs">Disclaimer: - L</p>
        </footer>
        
      </div>
    </div>
  );
};

export default Invoice;
