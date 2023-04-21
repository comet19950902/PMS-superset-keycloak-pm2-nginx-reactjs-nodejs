import { Diversity2Rounded } from '@mui/icons-material';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Spin } from "react-loading-io";

function Loader() {
  return (
    <>
      {/* <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden"> Please wait while we Load</span>
      </Button>{' '} */}
      <div style={{color:'#FFC107', right:'0',fontWeight:'900',fontSize:'20px',zIndex:1,position:'relative'}}>
        {/* <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        /> */}
           <Spin size={90} id='spin' style={{'--rl-spin-color':  '#FFC107',
    '--rl-spin-border': '20px', position:'fixed',top:'13em',left:'47%',height:'70px',width: '70px', zIndex:'10'}}/>
        Please wait while we load transactions...
      </div>
    </>
  );
}

export default Loader;