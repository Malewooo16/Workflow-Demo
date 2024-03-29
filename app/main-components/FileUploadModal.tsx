

"use client"

import { ReactNode } from "react";

// Modal.js

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
  }
const FileUploadModal : React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none ">
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            {/* Modal content */}
            <div className="relative flex flex-col w-full border-0 rounded-lg shadow-lg outline-none focus:outline-none card bg-base-200">
              {/* Header */}
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                <h3 className="text-2xl font-semibold">
                 Upload Files
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0  opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={onClose}
                >
                  <p className="h-6 w-6 text-2xl block outline-none focus:outline">x</p>
                </button>
              </div>
              {/* Body */}
              <div className="relative p-6 flex-auto">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={isOpen ? "fixed inset-0 bg-gray-600 opacity-25" : ""} onClick={onClose}></div>
    </>
  );
};

export default FileUploadModal;

