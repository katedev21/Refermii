import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { format } from 'date-fns';

const ReferralList = ({ referrals }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedBrand, setExpandedBrand] = useState(null);

  // Group referrals by brand
  const groupedReferrals = referrals.reduce((acc, referral) => {
    if (!acc[referral.brand]) {
      acc[referral.brand] = [];
    }
    acc[referral.brand].push(referral);
    return acc;
  }, {});

  // Sort referrals by date within each brand
  Object.keys(groupedReferrals).forEach(brand => {
    groupedReferrals[brand].sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
  });

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredBrands = Object.keys(groupedReferrals).filter(brand =>
    brand.toLowerCase().includes(searchTerm) ||
    groupedReferrals[brand].some(referral =>
      referral.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  );

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', p: 2 }}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Find Referral Codes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            label="Search by brand, service type, product, or category"
            variant="outlined"
            onChange={handleSearch}
            sx={{ mb: 2 }}
          />
          {filteredBrands.map((brand) => (
            <Accordion
              key={brand}
              expanded={expandedBrand === brand}
              onChange={() => setExpandedBrand(expandedBrand === brand ? null : brand)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{brand}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {groupedReferrals[brand].map((referral) => (
                  <Box key={referral.id} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle2">
                        Posted on {format(new Date(referral.postDate), 'MMM d, yyyy')}
                      </Typography>
                      <Tooltip title="Copy code">
                        <IconButton onClick={() => handleCopyCode(referral.code)}>
                          <ContentCopyIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Code: {referral.code}
                    </Typography>
                    {referral.link && (
                      <Button
                        variant="contained"
                        href={referral.link}
                        target="_blank"
                        sx={{ mb: 1 }}
                      >
                        Use Referral Link
                      </Button>
                    )}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {referral.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" />
                      ))}
                    </Box>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Post a Referral Code</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Post form will be implemented here */}
          <Typography>Post form coming soon...</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ReferralList; 