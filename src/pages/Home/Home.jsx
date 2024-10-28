import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  styled,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import {
  Upload,
  Image as ImageIcon,
  Wand2,
  Sparkles,
  Menu as MenuIcon,
  Home,
  History,
  Settings,
  User,
  LogOut,
  Image,
  PaintBucket,
  ChevronLeft,
  Download,
  RefreshCw,
} from 'lucide-react';

// First, add these Google Fonts to your index.html
// <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

// Create custom theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8B5CF6',
    },
    background: {
      default: '#111827',
      paper: '#1F2937',
    },
    text: {
      primary: '#ffffff',
      secondary: '#9CA3AF',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    h1: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      background: 'linear-gradient(45deg, #fff 30%, #E2E8F0 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      [`@media (max-width:600px)`]: {
        fontSize: '2.5rem',
      },
      [`@media (min-width:601px) and (max-width:960px)`]: {
        fontSize: '3rem',
      },
      [`@media (min-width:961px)`]: {
        fontSize: '3.5rem',
      },
    },
    h6: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    subtitle1: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 500,
    },
    button: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(31, 41, 55, 0.9)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(31, 41, 55, 0.95)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
});

// Styled components
const UploadArea = styled(Box)(({ theme }) => ({
  border: '2px dashed rgba(139, 92, 246, 0.5)',
  borderRadius: '12px',
  padding: theme.spacing(4),
  minHeight: '300px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  '&:hover': {
    borderColor: '#8B5CF6',
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '250px',
    padding: theme.spacing(2),
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  backgroundColor: 'rgba(31, 41, 55, 0.6)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(31, 41, 55, 0.7)',
  },
}));

// Add this new styled component
const SidebarHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  background: 'rgba(139, 92, 246, 0.03)',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  margin: '2px 8px',
  borderRadius: '12px',
  padding: '8px 12px',
  '&:hover': {
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    transform: 'translateX(4px)',
  },
  '& .MuiListItemIcon-root': {
    minWidth: '35px',
    color: theme.palette.text.secondary,
  },
  '& .MuiListItemText-primary': {
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  transition: 'all 0.2s ease',
}));

// Add these new styled components at the top
const MainWrapper = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
  minHeight: '100vh',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.05), transparent 50%)',
    pointerEvents: 'none',
  }
}));

const ContentWrapper = styled(Box)(({ theme, isOpen }) => ({
  flexGrow: 1,
  padding: theme.spacing(4),
  paddingTop: theme.spacing(10),
  transition: 'all 0.3s ease',
  marginLeft: isOpen ? '240px' : 0,
  background: 'transparent',
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
    padding: theme.spacing(3),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(8),
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
}));

const GlassCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(30, 41, 59, 0.4)',
  backdropFilter: 'blur(12px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: theme.spacing(3),
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  },
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Space Grotesk", sans-serif',
  fontSize: '3.5rem',
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(45deg, #fff 30%, #E2E8F0 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  letterSpacing: '-0.02em',
  lineHeight: 1.1,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '4px',
    background: 'linear-gradient(90deg, #8B5CF6, #6D28D9)',
    borderRadius: '2px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}));

const StyledSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Plus Jakarta Sans", sans-serif',
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '1.25rem',
  fontWeight: 500,
  textAlign: 'center',
  maxWidth: '600px',
  margin: '0 auto',
  marginTop: theme.spacing(3),
  lineHeight: 1.5,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
    padding: '0 16px',
  },
}));

const StyledImageUploadCard = styled(Paper)(({ theme, hasImage }) => ({
  border: '2px dashed rgba(139, 92, 246, 0.5)',
  borderRadius: '12px',
  padding: theme.spacing(4),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: hasImage ? 'rgba(139, 92, 246, 0.08)' : 'rgba(31, 41, 55, 0.6)',
  backdropFilter: 'blur(8px)',
  '&:hover': {
    borderColor: '#8B5CF6',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    transform: 'translateY(-2px)',
  },
}));

const PreviewCard = styled(GlassCard)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

// Add these enhanced styled components
const MainContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.1), transparent 50%)',
    pointerEvents: 'none',
  }
}));

const StyledCard = styled(GlassCard)(({ theme }) => ({
  background: 'rgba(30, 41, 59, 0.4)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
}));

const ImagePreviewBox = styled(Box)({
  width: '100%',
  height: '600px',  // Increased from default height
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px dashed rgba(255, 255, 255, 0.2)',
  borderRadius: '8px',
  position: 'relative',
  overflow: 'hidden',
  '& img': {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain'
  }
});

const StyleTransferApp = () => {
  // Make sure these state declarations are at the very top of your component
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modelType, setModelType] = useState('standard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);  // Changed to false
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [styledResult, setStyledResult] = useState(null);

  // Update the toggle function
  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setSidebarOpen(!isSidebarOpen);
    }
  }, [isMobile, mobileMenuOpen, isSidebarOpen]);

  const menuItems = [
    { text: 'Home', icon: <Home size={20} /> },
    { text: 'Gallery', icon: <Image size={20} /> },
    { text: 'My Styles', icon: <PaintBucket size={20} /> },
    { text: 'History', icon: <History size={20} /> },
    { text: 'Settings', icon: <Settings size={20} /> },
  ];

  const styles = [
    { id: 1, name: 'Noir', thumbnail: 'https://pikaso.cdnpk.net/public/media/modifiers/photo.png?v=2' },
    { id: 2, name: 'Anime', thumbnail: 'https://pikaso.cdnpk.net/public/media/modifiers/photo.png?v=2' },
    { id: 3, name: 'Watercolor', thumbnail: 'https://pikaso.cdnpk.net/public/media/modifiers/photo.png?v=2' },
    { id: 4, name: 'Cyberpunk', thumbnail: 'https://pikaso.cdnpk.net/public/media/modifiers/photo.png?v=2' },
    { id: 5, name: 'Portrait', thumbnail: 'https://pikaso.cdnpk.net/public/media/modifiers/photo.png?v=2' },
  ];

  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleGenerate = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setStyledResult(null); // Clear previous result

    try {
      // Create form data
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('style', selectedStyle);
      formData.append('quality', modelType);

      // Make API call
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        setStyledResult(data.imageUrl); // Set the styled image URL from API response
      } else {
        throw new Error(data.message || 'Failed to process image');
      }
    } catch (error) {
      console.error('Error generating styled image:', error);
      // You might want to show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const navigationDrawer = (
    <Box sx={{ width: 240, height: '100%', position: 'relative' }}>
      <SidebarHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Sparkles size={20} style={{ color: '#8B5CF6' }} />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              background: 'linear-gradient(45deg, #8B5CF6, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.1rem',
            }}
          >
            FusionFrame
          </Typography>
        </Box>
        <IconButton 
          onClick={toggleSidebar} 
          sx={{ 
            color: 'text.secondary',
            padding: 0.5,
            '&:hover': {
              color: '#8B5CF6',
              backgroundColor: 'rgba(139, 92, 246, 0.08)',
            },
          }}
        >
          <ChevronLeft />
        </IconButton>
      </SidebarHeader>
      
      <List sx={{ px: 1, py: 1 }}>
        {menuItems.map((item, index) => (
          <StyledListItem
            button
            key={item.text}
            selected={index === 0}
            sx={{
              mb: 0.25,
              ...(index === 0 && {
                background: 'rgba(139, 92, 246, 0.1)',
                backdropFilter: 'blur(8px)',
                '& .MuiListItemIcon-root': {
                  color: '#8B5CF6',
                },
                '& .MuiListItemText-primary': {
                  color: '#8B5CF6',
                  fontWeight: 600,
                },
              }),
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText 
              primary={item.text}
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '0.9rem',
                },
              }} 
            />
          </StyledListItem>
        ))}
      </List>
      
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 1.5,
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(31, 41, 55, 0.95)',
        }}
      >
        <StyledListItem 
          button 
          sx={{ 
            color: '#ef4444',
            '&:hover': {
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
            },
          }}
        >
          <ListItemIcon>
            <LogOut size={20} color="currentColor" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledListItem>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        {/* Top Navigation */}
        <AppBar
          position='fixed'
          elevation={0}
          sx={{
            width: { sm: `calc(100% - ${isSidebarOpen ? 240 : 0}px)` },
            ml: { sm: isSidebarOpen ? '0px' : 0 },
            transition: 'width 0.3s, margin-left 0.3s',
          }}
        >
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={toggleSidebar}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' sx={{ flexGrow: 1 }}>
              FusionFrame
            </Typography>
            <Button
              color='inherit'
              startIcon={<Wand2 size={20} />}
              sx={{
                mr: 2,
                display: { xs: 'none', sm: 'flex' },
                '&:hover': {
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                },
              }}
            >
              Create
            </Button>
            <IconButton
              onClick={(e) => setUserMenuAnchor(e.currentTarget)}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                },
              }}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                <User size={20} />
              </Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Left Navigation */}
        <Drawer
          variant={isMobile ? 'temporary' : 'persistent'}
          open={isMobile ? mobileMenuOpen : isSidebarOpen}
          onClose={() => setMobileMenuOpen(false)}
          sx={{
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              transition: 'width 0.3s',
              background: 'rgba(31, 41, 55, 0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
          }}
        >
          {navigationDrawer}
        </Drawer>
        {/* Main Content */}
        <ContentWrapper isOpen={isSidebarOpen}>
          <StyledContainer maxWidth="lg">
            {/* Header Section */}
            <Box sx={{ 
              textAlign: 'center',
              mb: { xs: 4, sm: 6, md: 8 },
              mt: { xs: 2, sm: 3, md: 4 }
            }}>
              <StyledTitle variant="h1">
                AI Style Transfer
              </StyledTitle>
              <StyledSubtitle>
                Transform your images with cutting-edge AI technology
              </StyledSubtitle>
            </Box>

            {/* Main Content */}
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {/* Left Column */}
              <Grid item xs={12} lg={6}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: { xs: 2, sm: 3, md: 4 }
                }}>
                  {/* Upload Section */}
                  <StyledCard>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 2,
                        fontSize: { xs: '1.1rem', sm: '1.25rem' },
                        fontWeight: 600,
                        color: '#fff'
                      }}
                    >
                      Upload Image
                    </Typography>
                    
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                      id="image-upload"
                    />
                    
                    <label htmlFor="image-upload" style={{ width: '100%' }}>
                      <UploadArea
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        {previewUrl ? (
                          // Image Preview
                          <Box sx={{ 
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2
                          }}>
                            <Box
                              component="img"
                              src={previewUrl}
                              alt="Preview"
                              sx={{
                                maxWidth: '100%',
                                maxHeight: '250px',
                                objectFit: 'contain',
                                borderRadius: '8px',
                              }}
                            />
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              gap: 1,
                              color: 'rgba(255, 255, 255, 0.7)',
                              '&:hover': {
                                color: '#8B5CF6',
                              }
                            }}>
                              <Upload size={20} />
                              <Typography sx={{ fontSize: '0.9rem' }}>
                                Click to change image
                              </Typography>
                            </Box>
                          </Box>
                        ) : (
                          // Upload Placeholder
                          <>
                            <Upload
                              style={{
                                width: 48,
                                height: 48,
                                color: '#8B5CF6',
                                marginBottom: 16,
                              }}
                            />
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                mb: 1, 
                                color: '#fff',
                                fontSize: { xs: '1rem', sm: '1.25rem' }
                              }}
                            >
                              Drop your image here
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontSize: { xs: '0.8rem', sm: '0.875rem' }
                              }}
                            >
                              or click to browse
                            </Typography>
                          </>
                        )}
                      </UploadArea>
                    </label>
                  </StyledCard>

                  {/* Controls Section */}
                  <StyledCard>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      gap: { xs: 3, sm: 4 }
                    }}>
                      {/* Quality Selection */}
                      <Box>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            mb: 2,
                            fontSize: { xs: '1.1rem', sm: '1.25rem' },
                            fontWeight: 600,
                            color: '#fff'
                          }}
                        >
                          Quality Settings
                        </Typography>
                        <Grid container spacing={2}>
                          {['Standard', 'HD', 'Ultra'].map((type) => (
                            <Grid item xs={4} key={type}>
                              <Button
                                fullWidth
                                variant={modelType === type.toLowerCase() ? 'contained' : 'outlined'}
                                sx={{
                                  py: { xs: 1.5, sm: 2 },
                                  borderRadius: '10px',
                                  background: modelType === type.toLowerCase() 
                                    ? 'linear-gradient(45deg, #8B5CF6, #6D28D9)'
                                    : 'transparent',
                                  fontSize: { xs: '0.875rem', sm: '1rem' },
                                  '&:hover': {
                                    background: modelType === type.toLowerCase()
                                      ? 'linear-gradient(45deg, #7C3AED, #5B21B6)'
                                      : 'rgba(139, 92, 246, 0.08)',
                                  },
                                }}
                                onClick={() => setModelType(type.toLowerCase())}
                              >
                                {type}
                              </Button>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>

                      {/* Style Selection */}
                      <Box>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            mb: 2,
                            fontSize: { xs: '1.1rem', sm: '1.25rem' },
                            fontWeight: 600,
                            color: '#fff'
                          }}
                        >
                          Choose Style
                        </Typography>
                        <Grid container spacing={{ xs: 1, sm: 2 }}>
                          {styles.map((style, index) => (
                            <Grid item xs={4} sm={4} key={style.id}>
                              <Box
                                sx={{
                                  position: 'relative',
                                  cursor: 'pointer',
                                  borderRadius: '12px',
                                  overflow: 'hidden',
                                  border: selectedStyle === index 
                                    ? '2px solid #8B5CF6' 
                                    : '2px solid transparent',
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                  },
                                }}
                                onClick={() => setSelectedStyle(index)}
                              >
                                <Box
                                  component="img"
                                  src={style.thumbnail}
                                  alt={style.name}
                                  sx={{
                                    width: '100%',
                                    aspectRatio: '1',
                                    objectFit: 'cover',
                                  }}
                                />
                                <Box sx={{
                                  position: 'absolute',
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  p: { xs: 0.75, sm: 1 },
                                  background: 'rgba(0,0,0,0.7)',
                                  backdropFilter: 'blur(4px)',
                                }}>
                                  <Typography 
                                    variant="caption" 
                                    sx={{ 
                                      color: '#fff',
                                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                    }}
                                  >
                                    {style.name}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Box>
                  </StyledCard>

                  {/* Generate Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={!selectedImage || isLoading}
                    onClick={handleGenerate}
                    sx={{
                      py: { xs: 2, sm: 2.5 },
                      background: 'linear-gradient(45deg, #8B5CF6, #6D28D9)',
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      borderRadius: '12px',
                      fontWeight: 600,
                      '&:hover': {
                        background: 'linear-gradient(45deg, #7C3AED, #5B21B6)',
                      },
                      '&.Mui-disabled': {
                        background: 'rgba(255, 255, 255, 0.12)',
                      },
                    }}
                  >
                    {isLoading ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={20} color="inherit" />
                        <span>Processing...</span>
                      </Box>
                    ) : (
                      'Generate'
                    )}
                  </Button>
                </Box>
              </Grid>

              {/* Right Column - Preview */}
              <Grid item xs={12} lg={6}>
                <StyledCard sx={{ height: '100%', minHeight: '650px' }}> {/* Added minHeight */}
                  <Box p={3}>
                    <Typography variant="h6" mb={2}>
                      Preview
                    </Typography>
                    <ImagePreviewBox>
                      {isLoading ? (
                        <Box sx={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: 'center',
                          gap: 2
                        }}>
                          <CircularProgress 
                            size={40} 
                            sx={{ 
                              color: '#8B5CF6'
                            }} 
                          />
                          <Typography sx={{ 
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: { xs: '0.875rem', sm: '1rem' }
                          }}>
                            Transforming your image...
                          </Typography>
                        </Box>
                      ) : styledResult ? (
                        <Box
                          component="img"
                          src={styledResult}
                          alt="Styled Result"
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            borderRadius: '8px',
                            transition: 'opacity 0.3s ease',
                          }}
                        />
                      ) : (
                        <Box sx={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: 'center',
                          gap: 2,
                          color: 'rgba(255, 255, 255, 0.5)'
                        }}>
                          <ImageIcon sx={{ 
                            fontSize: { xs: 40, sm: 48 },
                            opacity: 0.5
                          }} />
                          <Typography sx={{ 
                            fontSize: { xs: '0.875rem', sm: '1rem' },
                            textAlign: 'center'
                          }}>
                            Click "Generate" to see your styled image
                          </Typography>
                        </Box>
                      )}
                    </ImagePreviewBox>
                  </Box>
                  {styledResult && (
                    <Box sx={{ 
                      mt: 3, 
                      display: 'flex', 
                      justifyContent: 'center',
                      gap: 2
                    }}>
                      <Button
                        variant="outlined"
                        startIcon={<Download />}
                        onClick={() => window.open(styledResult, '_blank')}
                        sx={{
                          color: '#fff',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          '&:hover': {
                            borderColor: '#8B5CF6',
                            backgroundColor: 'rgba(139, 92, 246, 0.08)',
                          }
                        }}
                      >
                        Download
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<RefreshCw />}
                        onClick={() => setStyledResult(null)}
                        sx={{
                          color: '#fff',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          '&:hover': {
                            borderColor: '#8B5CF6',
                            backgroundColor: 'rgba(139, 92, 246, 0.08)',
                          }
                        }}
                      >
                        Reset
                      </Button>
                    </Box>
                  )}
                </StyledCard>
              </Grid>
            </Grid>
          </StyledContainer>
        </ContentWrapper>
      </MainContainer>
    </ThemeProvider>
  );
};

export default StyleTransferApp;
