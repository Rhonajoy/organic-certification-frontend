import { useState } from 'react';
import Modal from '../app/Modal';

const InspectionModal = ({ isOpen, onClose }) => {
  const [answers, setAnswers] = useState([
    { id: 1, text: "Any synthetic inputs in the last 36 months?", value: null },
    { id: 2, text: " Are there Adequate buffer zones? ?", value: null },
    { id: 3, text: " Are Organic seed Used ?", value: null },
    { id: 4, text: "is soil fertility managed organically? ", value: null },
    { id: 5, text: "Is  Recordkeeping Available?", value: null }
  ]);
   const [complianceScore, setComplianceScore] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnswer = (questionId, value) => {
    setAnswers(answers.map(q => q.id === questionId ? { ...q, value } : q));
  };

  const handleSubmit = async () => {
    const isComplete = answers.every(q => q.value !== null);
    if (!isComplete) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setIsLoading(true);
    try {
      const result = await getComplianceScore(answers);
      setComplianceScore(result.score);
      setShowResults(true);
    } catch (error) {
      console.error("Failed to get compliance score:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset modal state
    setAnswers(answers.map(q => ({ ...q, value: null })));
    setComplianceScore(null);
    setShowResults(false);
    setIsLoading(false);
  };

  // src/components/InspectionModal.jsx (continued)
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-600">Calculating score...</p>
        </div>
      );
    }

    if (showResults) {
      return (
        <div className="text-center py-4">
          <h3 className="text-2xl font-bold text-green-600 mb-2">
            Inspection Complete
          </h3>
          <p className="text-lg text-gray-800">Your compliance score is:</p>
          <div className="my-4">
            <span className="text-6xl font-extrabold text-green-500">
              {complianceScore}%
            </span>
          </div>
          <p className="text-gray-600 mb-6">
            {complianceScore >= 80 
              ? "Congratulations! Your farm meets all compliance standards." 
              : "Further improvements are required to meet full compliance."}
          </p>

          {/* Certificate Download Section */}
          <div className="bg-gray-50 rounded-lg p-4 mt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Download Your Certificate
            </h4>
            <a 
              href="/path/to/dummy-certificate.pdf" // Use a real endpoint here
              download="compliance-certificate.pdf"
              className="inline-flex items-center justify-center space-x-2 py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 transition"
            >
              <FaDownload />
              <span>Download Certificate</span>
            </a>
            <p className="text-xs text-gray-500 mt-2">
              This certificate verifies your compliance score.
            </p>
          </div>
          <div className="mt-6">
            <button
              onClick={handleClose}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      );
    }

    // Default view: checklist
    return (
      <>
        <ul className="space-y-4">
          {answers.map((q) => (
            <li key={q.id} className="flex flex-col md:flex-row items-center justify-between p-2 border-b border-gray-200">
              <span className="text-gray-800 text-base font-medium mb-2 md:mb-0">{q.text}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleAnswer(q.id, 'Yes')}
                  className={`py-1 px-4 rounded-full text-sm font-medium transition ${q.value === 'Yes' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-green-100 hover:text-green-700'}`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleAnswer(q.id, 'No')}
                  className={`py-1 px-4 rounded-full text-sm font-medium transition ${q.value === 'No' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-700'}`}
                >
                  No
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={handleClose}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Inspection Checklist">
      {renderContent()}
    </Modal>
  );
};

export default InspectionModal;