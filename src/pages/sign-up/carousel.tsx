import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'Architecture',
    paragraph:'Accusam noluisse mel et. Ius duis menandri ne, rebum exerci ad his. Quo at tollit veniam assueverit.',
    imgPath:
      '/images/carousel1.svg',
  },
  {
    label: 'Vendor',
    paragraph:'Accusam noluisse mel et. Ius duis menandri ne, rebum exerci ad his. Quo at tollit veniam assueverit.',
    imgPath:
    '/images/carousel2.svg',
  },
  {
    label: 'Construction',
    paragraph:'Accusam noluisse mel et. Ius duis menandri ne, rebum exerci ad his. Quo at tollit veniam assueverit.',
    imgPath:
    '/images/carousel3.svg',
  },

];

interface CustomMobileStepperProps {
    activeStep: number;
    maxSteps: number;
    handleNext: () => void;
    handleBack: () => void;
  }

function CustomMobileStepper({
    activeStep,
    maxSteps,

  }: CustomMobileStepperProps) {

  return (
    <div
      style={{
        padding: '16px 0', // Add padding to center the dashed line
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent', // Make the background transparent
      }}
    >
      {Array.from({ length: maxSteps }, (_, index) => (
        <div
          key={index}
          style={{
            width: '40px',
            height: '3px',
            background: index === activeStep ? '#ffffff' : 'rgb(255 255 255 / 52%)', // Change color for active step
            marginRight: '8px',
          }}
        />
      ))}
    </div>
  );
}

function CarouselSignup() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box  className="mt-5">
  
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={4000}
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 'auto',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  width: 'calc(100% -300px)',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <Typography sx={{color:'rgb(255 255 255 / 89%)', fontWeight:'700'}} className='mt-4'>{images[activeStep].label}</Typography>
      <Typography  sx={{color:'rgb(255 255 255 / 89%)'}} className='mx-5 mt-3 px-5' variant='body2'>{images[activeStep].paragraph}</Typography>
      <CustomMobileStepper
        activeStep={activeStep}
        maxSteps={maxSteps}
        handleNext={() => handleStepChange(activeStep + 1)}
        handleBack={() => handleStepChange(activeStep - 1)}
      />
    </Box>
  );
}

export default CarouselSignup;
