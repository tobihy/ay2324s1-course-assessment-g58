import React, { useState } from "react";
import { Box,
    Button,
    Modal,
    Typography,
    TextField,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextareaAutosize 
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Question, {
    questionTemplate,
    defaultQuestionTemplates,
} from "@/types/Question";

interface AddQuestionModalProps {
  handleClose: () => void;
  addQuestion: (newQuestion: Question) => Promise<number>;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AddQuestionModal({ handleClose, addQuestion }: AddQuestionModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [templates, setTemplates] = useState<questionTemplate[]>(defaultQuestionTemplates);

  const handleTemplateChange = (index: number, setStarterCode: boolean, newValue: string) => {
    setTemplates(prevTemplates => {
      const updatedTemplates = [...prevTemplates];
      if (setStarterCode) {
        updatedTemplates[index].starterCode = newValue;
      } else {
        updatedTemplates[index].driverCode = newValue == "" ? null : newValue;
      }
      return updatedTemplates;
    });
  };

  const handleAddQuestion = async () => {
    if (!title || !description || !difficulty || !category) {
      alert("Fill out all of title, description, difficulty, and category");
      return;
    }

    const newQuestion: Question = {
      _id: "", // This will be generated by MongoDB
      title,
      description,
      difficulty,
      category,
      templates
    };
    console.log(templates);
    await addQuestion(newQuestion);
    handleClose();
  };
  
  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="add-question-modal-title"
      aria-describedby="add-question-modal-description"
    >
      <Box sx={style}>
        <Typography id="add-question-modal-title" variant="h6" component="h2">
          Add New Question
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          margin="normal"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          label="Difficulty"
          variant="outlined"
          fullWidth
          margin="normal"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          InputProps={{
            inputComponent: TextareaAutosize,
            inputProps: {
              style: { resize: 'both' }, // Allows resizing both horizontally and vertically
            },
          }}
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Templates</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {templates.map((template, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Language: {template.language}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Starter Code"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                InputProps={{
                  inputComponent: TextareaAutosize,
                  inputProps: {
                    style: { resize: 'both' }, // Allows resizing both horizontally and vertically
                  },
                }}
                value={template.starterCode}
                onChange={(e) => handleTemplateChange(index, true, e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Driver Code"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                InputProps={{
                  inputComponent: TextareaAutosize,
                  inputProps: {
                    style: { resize: 'both' }, // Allows resizing both horizontally and vertically
                  },
                }}
                value={template.driverCode || ''}
                onChange={(e) => handleTemplateChange(index, false, e.target.value)}
              />
            </Grid>
        </Grid>
        ))}
        </AccordionDetails>
        </Accordion>
        <Button variant="contained" onClick={handleAddQuestion} sx={{ mt: 2 }}>
          Add Question
        </Button>
      </Box>
    </Modal>
  );
}

export default AddQuestionModal;
