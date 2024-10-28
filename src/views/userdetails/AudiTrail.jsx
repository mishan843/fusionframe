import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAuditTrails } from 'services/UsersService'
import CircleLoader from 'ui-component/cards/CircleLoader'
import StepperAudit from 'views/stepper/index'

const AudiTrail = () => {

  const [auditData, setAuditData] = useState([])
  const [loading, setLoading] = useState(false)
  const { userId } = useParams()
  console.log(userId, 'idd');



  const getAuditTrailsData = async () => {
    try {
      const params = {
        id: userId
      };

      setLoading(true)
      const response = await getAuditTrails(params);
      setAuditData(response?.data);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAuditTrailsData();
  }, []);

  return (
    <>
    {loading && <CircleLoader />}
    <Box>
      <Box sx={{ padding: 1.5, textAlign: 'center', borderRadius: '0' }}>
        {/* <Typography variant="body1">User have not audit trail</Typography> */}
        <StepperAudit auditData={auditData} />
      </Box>
    </Box>
    </>
  )
}

export default AudiTrail