import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Chip,
  Stack,
} from '@mui/material';

const PostForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    brand: '',
    code: '',
    link: '',
    tags: [],
    newTag: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ''
      }));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      postDate: new Date().toISOString(),
    });
    setFormData({
      brand: '',
      code: '',
      link: '',
      tags: [],
      newTag: '',
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
      <Stack spacing={2}>
        <TextField
          required
          fullWidth
          label="Brand Name"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
        />
        
        <TextField
          required
          fullWidth
          label="Referral Code"
          name="code"
          value={formData.code}
          onChange={handleChange}
        />
        
        <TextField
          fullWidth
          label="Referral Link (optional)"
          name="link"
          value={formData.link}
          onChange={handleChange}
        />
        
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Add Tags (e.g., "shopping", "travel", "food")
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <TextField
              fullWidth
              label="New Tag"
              value={formData.newTag}
              onChange={(e) => setFormData(prev => ({ ...prev, newTag: e.target.value }))}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <Button
              variant="contained"
              onClick={handleAddTag}
              disabled={!formData.newTag.trim()}
            >
              Add
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {formData.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleRemoveTag(tag)}
              />
            ))}
          </Box>
        </Box>
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!formData.brand || !formData.code}
        >
          Submit Referral Code
        </Button>
      </Stack>
    </Box>
  );
};

export default PostForm; 