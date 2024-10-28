import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const BreadcrumbsCommon = ({
  heading,
  breadcrumbs,
  typography
}) => {
  const theme = useTheme();

  return (
    <Grid container spacing={2} sx={{
      backgroundColor: '#FFFFFF',
      maxWidth: '100%',
      width: '100%',
      padding: theme.spacing(2),
      margin: 0,
      boxShadow: 3
    }}>
      <Grid item xs={12} sm={4} sx={{
        marginBottom: { xs: 1, sm: 0 },
        padding: '0 !important' // add this to remove default padding
      }}>
        <Typography variant="h3" color={'#009efb'} fontWeight={400}>{heading}</Typography>
      </Grid>
      <Grid item xs={12} sm={8}
        sx={{
          display: 'flex',
          justifyContent: { sm: 'flex-end' },
          paddingRight: 2,
          padding: '0 !important'// add this to remove default padding
        }}>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="small" />}
        >
          {breadcrumbs.map((breadcrumb, index) => (
            <Link
              key={index}
              to={breadcrumb.link}
              style={{ textDecoration: 'none', color: '#009efb' }}
            >
              {breadcrumb.label}
            </Link>
          ))}
          <Typography color="#99abb4">{typography}</Typography>
        </Breadcrumbs>
      </Grid>
    </Grid>
  )
};

export default BreadcrumbsCommon;