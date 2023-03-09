import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";

function Footer() {
  return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#000000' ,fontFamily:'SUTB', fontSize:20 }}>
    <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      2020 Copyright:
      <a className='text-white' href='https://mdbootstrap.com/'>&nbsp;
        SUT_UPCYCLE.com
      </a>
    </div>
  </MDBFooter>
  );
}

export default Footer;
