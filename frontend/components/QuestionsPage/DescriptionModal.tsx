// src: https://mui.com/material-ui/react-modal/
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Question from '@/types/Question';

interface DescriptionModalProps {
    question: Question | null;
    closeModal: () => void;
    editQuestion: (updatedQuestion: Question, originalTitle: string) => Promise<number>;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxHeight: '80vh', // set a maximum height relative to the viewport height
    overflowY: 'auto', // enable vertical scrolling
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const inputStyle = {
    width: '100%', // make it take the full width of its container
    padding: '10px',
    margin: '10px 0',
    boxSizing: 'border-box' as 'border-box',
    border: '1px solid #ccc',
    borderRadius: '4px'
};

type ResizeOption = "none" | "both" | "horizontal" | "vertical" | "block" | "inline";

const textareaStyle: React.CSSProperties = {
    ...inputStyle, // spread the input styles
    height: '100px', // set a default height
    resize: 'vertical' as ResizeOption // specify the type
};

function formatText(text: string) {
    return text.split('\n').map((str, index, array) => 
        index === array.length - 1 ? str : <>
            {str}
            <br />
        </>
    );
}

function DescriptionModal({ question, closeModal, editQuestion } : DescriptionModalProps) {
    const [editMode, setEditMode] = React.useState(false);
    const [updatedTitle, setUpdatedTitle] = React.useState(question?.title || "");
    const [updatedDescription, setUpdatedDescription] = React.useState(question?.description || "");
    const [updatedDifficulty, setUpdatedDifficulty] = React.useState(question?.difficulty || "");
    const [updatedCategory, setUpdatedCategory] = React.useState(question?.category || "");
    
    const handleConfirmEdit = () => {
        const updatedQuestion: Question = {
            title: updatedTitle,
            description: updatedDescription,
            difficulty: updatedDifficulty,
            category: updatedCategory
        };
        if (updatedQuestion.title == "" || updatedQuestion.description == "" 
            || updatedQuestion.difficulty == "" || updatedQuestion.category == "") {
            alert("Please fill in all fields.");
            return;
        }
        editQuestion(updatedQuestion, question?.title || "");
        setEditMode(false);
    };

    if (!question) {
        return null;
    }

    return (
        <div>
            <Modal
                open={true}
                onClose={() => {
                    closeModal();
                    setEditMode(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <button 
                        id="editButton"
                        type="button"
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        onClick={() => setEditMode(!editMode)}
                    >Edit</button>
                    {editMode ? (
                        <>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Title: {question.title}
                            </Typography>
                            <Typography id="modal-modal-title-new" sx={{ mt: 2 }}>
                                New Question Title:
                            </Typography>
                            <input 
                                type="text"
                                value={updatedTitle}
                                onChange={(e) => setUpdatedTitle(e.target.value)}
                                placeholder="Title"
                                style={inputStyle}
                            />
                            <Typography id="modal-modal-category" sx={{ mt: 2 }}>
                                New Question Category:
                            </Typography>
                            <input 
                                type="text"
                                value={updatedCategory}
                                onChange={(e) => setUpdatedCategory(e.target.value)}
                                placeholder="Category"
                                style={inputStyle}
                            />
                            <Typography id="modal-modal-difficulty" sx={{ mt: 2 }}>
                                New Question Difficulty:
                            </Typography>
                            <input 
                                type="text"
                                value={updatedDifficulty}
                                onChange={(e) => setUpdatedDifficulty(e.target.value)}
                                placeholder="Difficulty"
                                style={inputStyle}
                            />
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                New Question Description:
                            </Typography>
                            <textarea 
                                value={updatedDescription}
                                onChange={(e) => setUpdatedDescription(e.target.value)}
                                placeholder="Description"
                                style={textareaStyle}
                            />
                            <button 
                                onClick={handleConfirmEdit}
                                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                            >Confirm</button>
                        </>
                    ) : (
                        <>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {question.title}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Question Description: {formatText(question.description)}
                            </Typography>
                            <Typography id="modal-modal-difficulty" sx={{ mt: 2 }}>
                                Question Difficulty: {question.difficulty}
                            </Typography>
                            <Typography id="modal-modal-category" sx={{ mt: 2 }}>
                                Question Category: {question.category}
                            </Typography>
                        </>
                    )}
                </Box>
            </Modal>
        </div>
      );
}

export default DescriptionModal;
