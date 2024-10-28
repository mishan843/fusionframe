import React, { useState, useCallback, useMemo, memo, useDeferredValue, useTransition, lazy, Suspense, useRef, useEffect } from 'react';
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
  Slider,
} from '@mui/material';
import {
  Upload,
  Image as ImageLucide,  // Renamed to avoid conflict
  Image as ImageIcon,    // Keep this if you're using it
  Wand2,
  Sparkles,
  Menu as MenuIcon,
  Home,
  History,
  Settings,
  User,
  LogOut,
  PaintBucket,
  ChevronLeft,
  Download,
  RefreshCw,
  Eraser,
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

// 1. Memoize styled components that don't need theme access
const UploadArea = memo(styled(Box)(({ theme }) => ({
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
})));

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

// Remove the top-level useCallback and move the optimizeImage helper function outside
const optimizeImage = (file) => {
  return new Promise((resolve) => {
    const img = new window.Image(); // Use window.Image instead of Image
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const maxWidth = 1200;
      
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth) {
        height = (maxWidth * height) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg', 0.8);
    };
    img.src = URL.createObjectURL(file);
  });
};

const CanvasWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '600px', // Adjusted height
  border: '2px dashed rgba(255, 255, 255, 0.2)',
  borderRadius: '8px',
  overflow: 'hidden',
  touchAction: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#1a1a1a',
  '& canvas': {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  }
}));

// Add BrushControls component
const BrushControls = memo(({ brushSize, setBrushSize, isErasing, setIsErasing }) => (
  <Box sx={{ 
    display: 'flex', 
    gap: { xs: 1, sm: 2 }, 
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
    <Button
      variant={isErasing ? 'outlined' : 'contained'}
      onClick={() => setIsErasing(false)}
      startIcon={<PaintBucket size={20} />}
      sx={{
        backgroundColor: isErasing ? 'transparent' : 'rgba(239, 68, 68, 0.9)',
        borderColor: 'rgba(239, 68, 68, 0.5)',
        color: isErasing ? 'rgba(239, 68, 68, 0.9)' : '#fff',
        '&:hover': {
          backgroundColor: isErasing ? 'rgba(239, 68, 68, 0.08)' : 'rgba(239, 68, 68, 0.8)',
          borderColor: 'rgba(239, 68, 68, 0.8)',
        },
      }}
    >
      Brush
    </Button>
    <Button
      variant={isErasing ? 'contained' : 'outlined'}
      onClick={() => setIsErasing(true)}
      startIcon={<Eraser size={20} />}
      sx={{
        backgroundColor: isErasing ? 'rgba(99, 102, 241, 0.9)' : 'transparent',
        borderColor: 'rgba(99, 102, 241, 0.5)',
        color: isErasing ? '#fff' : 'rgba(99, 102, 241, 0.9)',
        '&:hover': {
          backgroundColor: isErasing ? 'rgba(99, 102, 241, 0.8)' : 'rgba(99, 102, 241, 0.08)',
          borderColor: 'rgba(99, 102, 241, 0.8)',
        },
      }}
    >
      Eraser
    </Button>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>Size:</Typography>
      <Slider
        value={brushSize}
        onChange={(_, value) => setBrushSize(value)}
        min={1}
        max={50}
        sx={{ 
          width: { xs: '100%', sm: 100 },
          '& .MuiSlider-thumb, & .MuiSlider-track': {
            borderRadius: '4px',
          },
        }}
      />
    </Box>
  </Box>
));

const PreviewSection = memo(({ previewUrl, isLoading, onMaskChange }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(10);
  const [isErasing, setIsErasing] = useState(false);
  const imageRef = useRef(null);
  const brushLayerRef = useRef(null); // Separate canvas for brush strokes

  useEffect(() => {
    if (!previewUrl || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Set dimensions
      canvas.width = img.width;
      canvas.height = img.height;
      imageRef.current = img;

      // Create brush layer canvas
      const brushLayer = document.createElement('canvas');
      brushLayer.width = img.width;
      brushLayer.height = img.height;
      brushLayerRef.current = brushLayer;
      
      // Setup brush context
      const brushContext = brushLayer.getContext('2d');
      brushContext.lineCap = 'round';
      brushContext.lineJoin = 'round';
      brushContext.strokeStyle = 'rgba(99, 102, 241, 0.3)';
      brushContext.lineWidth = brushSize;
      contextRef.current = brushContext;

      // Draw initial image
      context.drawImage(img, 0, 0);
      updateCanvas();
    };

    img.src = previewUrl;
  }, [previewUrl, brushSize]);

  const updateCanvas = useCallback(() => {
    if (!canvasRef.current || !imageRef.current || !brushLayerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Clear main canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw original image
    context.drawImage(imageRef.current, 0, 0);
    
    // Draw brush strokes on top
    context.drawImage(brushLayerRef.current, 0, 0);
  }, []);

  const startDrawing = useCallback(({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (!contextRef.current) return;

    setIsDrawing(true);
    const context = contextRef.current;
    
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  }, []);

  const draw = useCallback(({ nativeEvent }) => {
    if (!isDrawing || !contextRef.current) return;

    const { offsetX, offsetY } = nativeEvent;
    const context = contextRef.current;

    if (isErasing) {
      // Erase brush strokes only
      context.globalCompositeOperation = 'destination-out';
    } else {
      // Draw brush strokes
      context.globalCompositeOperation = 'source-over';
      context.strokeStyle = 'rgba(99, 102, 241, 0.3)';
    }

    context.lineTo(offsetX, offsetY);
    context.stroke();
    context.beginPath();
    context.moveTo(offsetX, offsetY);

    updateCanvas();
  }, [isDrawing, isErasing, updateCanvas]);

  const stopDrawing = useCallback(() => {
    if (!contextRef.current) return;
    
    setIsDrawing(false);
    contextRef.current.beginPath();
    
    if (brushLayerRef.current) {
      const maskData = brushLayerRef.current.toDataURL('image/png');
      onMaskChange?.(maskData);
    }
  }, [onMaskChange]);

  const clearCanvas = useCallback(() => {
    if (!brushLayerRef.current || !contextRef.current) return;
    
    // Clear only the brush layer
    const context = contextRef.current;
    context.clearRect(0, 0, brushLayerRef.current.width, brushLayerRef.current.height);
    
    // Reset context properties
    context.globalCompositeOperation = 'source-over';
    context.strokeStyle = 'rgba(99, 102, 241, 0.3)';
    
    updateCanvas();
    onMaskChange?.(null);
  }, [updateCanvas, onMaskChange]);

  return (
    <>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2 
      }}>
        <BrushControls 
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          isErasing={isErasing}
          setIsErasing={setIsErasing}
        />
        <Button
          variant="outlined"
          onClick={clearCanvas}
          startIcon={<RefreshCw size={20} />}
          sx={{
            borderColor: 'rgba(255, 255, 255, 0.2)',
            color: 'text.secondary',
            '&:hover': {
              borderColor: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
            },
          }}
        >
          Clear All
        </Button>
      </Box>
      <CanvasWrapper>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{
            cursor: isErasing ? 'cell' : 'crosshair',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </CanvasWrapper>
    </>
  );
});

const StyleTransferApp = () => {
  // Add these state declarations at the top of your main component
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [maskData, setMaskData] = useState(null);
  const [modelType, setModelType] = useState('standard');
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [styledResult, setStyledResult] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Update toggleSidebar function
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
    if (isMobile) {
      setMobileMenuOpen(prev => !prev);
    }
  }, [isMobile]);

  // Add handleCloseSidebar function
  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  // Add handleDrop function
  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload({ target: { files: [file] } });
    }
  }, []);

  // Move handleImageUpload inside the component
  const handleImageUpload = useCallback(async (event) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(file);
        setPreviewUrl(reader.result);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsLoading(false);
    }
  }, []);

  // 4. Memoize static content
  const menuItems = useMemo(() => [
    { text: 'Home', icon: <Home size={20} /> },
    { text: 'Gallery', icon: <ImageLucide size={20} /> },
    { text: 'My Styles', icon: <PaintBucket size={20} /> },
    { text: 'History', icon: <History size={20} /> },
    { text: 'Settings', icon: <Settings size={20} /> },
  ], []);

  const styles = useMemo(() => [
    { id: 1, name: 'Noir', thumbnail: 'https://pikaso.cdnpk.net/public/media/modifiers/photo.png?v=2' },
    { id: 2, name: 'Anime', thumbnail: 'https://pikaso.cdnpk.net/public/media/modifiers/photo.png?v=2' },
    { id: 3, name: 'Watercolor', thumbnail: 'https://pikaso.cdnpk.net/public/media/modifiers/photo.png?v=2' },
    { id: 4, name: 'Cyberpunk', thumbnail: 'https://pikaso.cdnpk.net/public/media/modifiers/photo.png?v=2' },
    { id: 5, name: 'Portrait', thumbnail: 'https://pikaso.cdnpk.net/public/media/modifiers/photo.png?v=2' },
  ], []);

  // 5. Split navigation drawer into separate component
  const NavigationDrawer = memo(({ isOpen, onClose, menuItems }) => (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={isOpen}
      onClose={onClose}
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
            onClick={onClose}  // This will now close the sidebar
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
    </Drawer>
  ));

  // 7. Add loading optimization
  const deferredIsLoading = useDeferredValue(isLoading);

  // 8. Add transition optimization
  const [isTransitioning, startTransition] = useTransition();

  const handleGenerate = useCallback(async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    startTransition(() => {
      setStyledResult(null);
    });

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
  }, [selectedImage]);

  // Add this function to handle mask changes
  const handleMaskChange = useCallback((newMaskData) => {
    setMaskData(newMaskData);
  }, []);

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

        <NavigationDrawer 
          isOpen={isMobile ? mobileMenuOpen : isSidebarOpen}
          onClose={handleCloseSidebar}  // Pass the close handler
          menuItems={menuItems}  // Pass menuItems as prop
          isMobile={isMobile}  // Pass isMobile as prop
        />

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
                <StyledCard sx={{ height: '100%' }}> 
                  <Box p={3}>
                    <Typography variant="h6" mb={2}>
                      Preview
                    </Typography>
                    <PreviewSection 
                      previewUrl={previewUrl}
                      isLoading={isLoading}
                      onMaskChange={handleMaskChange}
                    />
                  </Box>
                  {previewUrl && (
                    <Box sx={{ 
                      mt: 3, 
                      display: 'flex', 
                      justifyContent: 'center',
                      gap: 2
                    }}>
                      <Button
                        variant="outlined"
                        startIcon={<Download />}
                        onClick={() => window.open(previewUrl, '_blank')}
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
                        onClick={() => setPreviewUrl(null)}
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

// 9. Export memoized component
export default memo(StyleTransferApp);
