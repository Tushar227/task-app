"use client"

import React, { useState } from 'react'
import Login from '../Login/page';
import SignUp from '../SignUp/page';

const Auth = () => {
  const [log, setLog] = useState(false);
  return <>{log ? <Login setLog={setLog} /> : <SignUp setLog={setLog} />}</>;
}

export default Auth