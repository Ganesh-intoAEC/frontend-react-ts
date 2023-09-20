import Pagination from '@mui/material/Pagination';




const customStyles = {
    '& .Mui-selected': {
      backgroundColor: '#2F80ED !important', // Set the background color for selected page
      color: 'white !important', 
      borderRadius: '2px'
    },
    '& .MuiPaginationItem-root': {
      backgroundColor: 'white',
      border:'none' // Set the background color for non-selected pages
    },
    '& .MuiButtonBase-root.MuiIconButton-root.MuiPaginationItem-iconButton': {
      '&.Mui-selected': {
        backgroundColor: 'blue', // Set the background color for selected arrow
        color: 'white', // Set the text color for selected arrow
      },
    },
  };

interface CustomTablePaginationProps {
    displayUI: string;
    customClass?: string; 

  }

const CustomTablePagination:React.FC<CustomTablePaginationProps> = ({
    displayUI,
    customClass

  
  }) => {
  return (
    <div className={`my-3 d-flex  ${displayUI} ${customClass || ''}`} style={{flexDirection:'row-reverse'}}>
      <Pagination  count={10} variant="outlined" shape="rounded" color="primary" showFirstButton showLastButton  sx={customStyles}/>
    </div>
  );
}

export default CustomTablePagination;