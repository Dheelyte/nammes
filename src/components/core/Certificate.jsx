import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { toast } from 'react-hot-toast'
import logo from '../../assets/logo.png'
import sign1 from '../../assets/signature-Tijani.png'
import sign2 from '../../assets/signature-Azeez.png'
import sign3 from '../../assets/signature-olamilekan.png'

const Certificate = ({ dashboard }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    // Certificate data
    const certificateData = {
        userName: dashboard?.profile.full_name || 'John Doe',
        courseName: 'Metallurgical and Materials Engineering',
        dateIssued: dashboard?.date_issued || new Date().toLocaleDateString(),
        certificateId: dashboard?.id || 'CERT-2023-0001',
        school: dashboard?.school || 'Institution'
    };


    const generatePDF = async () => {
        setIsGenerating(true);
        toast.loading("Downloading certificate", {duration: 5000})
        try {
        
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: [297, 210] // A4 landscape dimensions
            });

            // Add semi-transparent logo
            // const pageWidth = doc.internal.pageSize.getWidth();
            // const pageHeight = doc.internal.pageSize.getHeight();
            
            doc.saveGraphicsState();
            doc.setGState(new doc.GState({opacity: 0.02}));
            doc.text('DRAFT', 150, 100, {align: 'center', baseline: 'middle'})
            // doc.addImage(logo, 'PNG', 
            //     x, 
            //     y,
            //     150,
            //     100
            // );
            doc.addImage(logo, 'PNG', 45, 20, 200, 210);
            doc.restoreGraphicsState();
            

            // Add decorative border
            doc.setDrawColor(44, 62, 80); // Set border color
            doc.setLineWidth(5);
            doc.rect(15, 15, 267, 180); // Match 30px margin equivalent

            // Add logo
            // const logo = new Image();
            // logo.src = '/react.svg';
            doc.addImage(logo, 'PNG', 20, 20, 35, 38);

            // Main content
            doc.setFont('Times', 'Roman');
            
            // Organization name
            doc.setFontSize(15);
            doc.setTextColor(44, 62, 80);
            doc.text("NATIONAL ASSOCIATION OF", 148, 40, { align: 'center' });
            doc.text("METALLURGICAL AND MATERIALS ENGINEERING STUDENTS", 148, 47, { align: 'center' });
            doc.text("(NAMMES NIGERIA)", 148, 54, { align: 'center' });

            // Certificate title
            doc.setFontSize(37);
            doc.text("Certificate of Membership", 148, 70, { align: 'center' });

            // Recipient text
            doc.setFontSize(17);
            doc.text("This is to certify that", 148, 87, { align: 'center' });

            // Recipient name
            doc.setFontSize(41);
            doc.setFont(undefined, 'bold');
            doc.text(certificateData.userName, 148, 110, { align: 'center' });

            // Course text
            doc.setFontSize(17);
            doc.setFont(undefined, 'normal');
            doc.text("is a registered member of", 148, 125, { align: 'center' });

            doc.setFontSize(30);
            doc.text("NAMMES NIGERIA", 148, 135, { align: 'center' });

            // Certificate details
            doc.setFontSize(11);
            doc.text(`Certificate ID: ${certificateData.certificateId}`, 45, 150);
            doc.text(`Date Issued: ${certificateData.dateIssued}`, 215, 150);

            // Signatures
            doc.addImage(sign1, 'PNG', 45, 160, 35, 15);
            doc.addImage(sign2, 'PNG', 133, 160, 35, 15);
            doc.addImage(sign3, 'PNG', 210, 160, 35, 15);
            
            // Add under each signature image
            doc.setDrawColor(44, 62, 80); // Same color as border/text
            doc.setLineWidth(0.5);

            // First signature line
            doc.line(45, 175, 85, 175);  // 40mm line under first signature
            doc.setFontSize(10);
            doc.text("President, NAMMES", 50, 180);

            // Second signature line
            doc.line(130, 175, 170, 175); // 40mm line under second signature
            doc.text("Vice President, NAMMES", 131, 180);

            // Third signature line
            doc.line(210, 175, 250, 175); // 40mm line under third signature
            doc.text("General Secretary, NAMMES", 209, 180);


            // Signature
            // const signature = new Image();
            // signature.src = '/signature.png';
            // doc.addImage(signature, 'PNG', 200, 150, 50, 20);
            // doc.setFontSize(14);
            // doc.text("Authorized Signature", 200, 175);

            // Save PDF
            doc.save(`${certificateData.userName}-NAMMES certificate.pdf`);
        } catch {
            toast.error("An error occurred!")
        } finally {
            setIsGenerating(false)
        }
    };

    return (
        <button 
            onClick={generatePDF}
            disabled={isGenerating}
            className='apply-button'
        >
            {isGenerating ? 'Generating...' : 'Download Certificate'}
        </button>
    );
};

export default Certificate;