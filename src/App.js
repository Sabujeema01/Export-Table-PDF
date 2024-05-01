import React, {useRef} from 'react'
import html2canvas from 'html2canvas';

import jsPDF from 'jspdf';

const App = () => {

const pdfRef = useRef();
const downloadPDF = () =>{
  const input = pdfRef.current;
  html2canvas(input).then((canvas)=>{
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm','a4', true);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio)/ 2;
    const imgY = 30;
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight* ratio);
    pdf.save('invoice.pdf');
  })
}

  return (
    <>
    <div className='container mt-5 border p-5' ref={pdfRef}>
      <div className='row mb-4'>
        <div className='col-6'>
          <img src={require('./logo512.png')} alt='logo' height={100} width={100} />
        </div>
        <div className='col-6 text-end'>
          <h1>Invoice</h1>
        </div>
        </div>

        

  
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
    </div>
    <div className='row text-center mt-5'>
<button className='btn btn-primary btn-sm type="button' onClick={downloadPDF}>
   Download PDF</button>
    </div>
    </>
  )
}

export default App