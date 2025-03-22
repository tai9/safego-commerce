
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  faqs: FAQ[];
}

const ProductFAQ: React.FC<ProductFAQProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-xl font-bold mb-6 dark:text-white">Frequently Asked Questions</h3>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <button 
              className="flex justify-between items-center w-full text-left font-medium dark:text-white"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
            >
              <span>{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp size={18} className="flex-shrink-0" />
              ) : (
                <ChevronDown size={18} className="flex-shrink-0" />
              )}
            </button>
            
            {openIndex === index && (
              <div className="mt-2 text-gray-600 dark:text-gray-300 pr-4">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFAQ;
