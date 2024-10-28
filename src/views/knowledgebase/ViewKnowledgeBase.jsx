import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { deleteKnowledgeBase, getKnowledgeBaseDetail } from 'services/KnowledgeBaseService';
import { Card, CardContent, Typography, IconButton, Divider } from '@mui/material';
import DOMPurify from 'dompurify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddKnowledgeBase from './AddKnowledgeBase';
import DeleteModal from 'views/modal/DeleteModal';
import CircleLoader from 'ui-component/cards/CircleLoader';

const ViewKnowledgeBase = () => {
  const [knowledgeData, setKnowledgeData] = useState({});
  const params = useParams();
  const navigate = useNavigate(); // Initialize the navigate function
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const getKnowledgeData = async () => {
    try {
      const data = {
        id: params?.articleId
      };
      const response = await getKnowledgeBaseDetail(data);
      setKnowledgeData(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getKnowledgeData();
  }, []);

  const handleEdit = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleOnDelete = async () => {
    try {
      setLoading(true);
      const id = {
         id: params?.articleId // Ensure you use knowledgeData.id or the correct variable here
      };
      await deleteKnowledgeBase(id);
      navigate('/support/knowledge-base'); // Navigate to the specified route after deletion
      setOpenDelete(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false); // Make sure to stop loading in case of an error
    }
  };

  return (
    <div>
      {loading && <CircleLoader />}
      {knowledgeData && (
        <Card sx={{ maxWidth: "100%" }}>
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography gutterBottom variant="h1" component="div" sx={{ mb: 0 }}>
                {knowledgeData?.title}
              </Typography>
              <div>
                <IconButton onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>

            <Divider sx={{ margin: '16px 0' }} />
            <Typography gutterBottom variant="h4" component="div" sx={{ mb: 5 }}>
              {knowledgeData?.subTitle}
            </Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(knowledgeData?.description?.replace(/<img /g, '<img class="fixed-image" ')),
              }}
            />
          </CardContent>
        </Card>
      )}
      <AddKnowledgeBase
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        knowledgeData={knowledgeData}
        getKnowledgeData={getKnowledgeData}
      />
      <DeleteModal
        open={openDelete}
        handleClose={handleDeleteClose}
        handleOnDelete={handleOnDelete}
        message="article"
      />
    </div>
  );
};

export default ViewKnowledgeBase;