import './App.css';
import CertificateTable from './components/CertificateTable';
import logo_blue from './components/img/logo_blue.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify from 'aws-amplify';
import './components/table.scss';
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';
import awsExports from './src/aws-exports';
import Form from './components/Form.js';
import Stack from 'react-bootstrap/Stack';
Amplify.configure(awsExports)
/*Adding cognito authentication with aws libraries */ 

function App({signOut, user }) {
  return (
    <div className='App'>

      <header className='App-header'>
        <>
         <nav class="navbar navbar-expand-xxl bg-light fixed-top">
          <div class="container-fluid">
           <a class="navbar-brand" href="#">
             <img src={logo_blue} alt="" width="200"/>
           </a>
           <div>
           <button  type="button" class="btn btn-outline-danger" onClick={signOut}>Sign out</button>
           </div>
         </div>
           </nav>
        </>
      </header>
      <body className='App-body' align="right">
        <div className='App-table'>
          <Stack style={{justifyContent: 'center'}} direction="horizontal" gap={2} >
          <CertificateTable />
           
          </Stack>
        </div>
        

      </body>

    </div>


  );
};

export default withAuthenticator(App);
