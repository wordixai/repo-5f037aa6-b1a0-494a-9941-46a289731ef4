import { useState } from 'react';
import { AppBuilder } from '../components/AppBuilder';
import { LandingPage } from '../components/LandingPage';

const Index = () => {
  const [showBuilder, setShowBuilder] = useState(false);

  if (showBuilder) {
    return <AppBuilder onBack={() => setShowBuilder(false)} />;
  }

  return <LandingPage onGetStarted={() => setShowBuilder(true)} />;
};

export default Index;