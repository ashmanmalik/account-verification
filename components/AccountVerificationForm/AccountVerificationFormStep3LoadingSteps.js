import { useEffect, useState } from 'react';
import { useTernaryState } from '../../utils/useTernaryState';
import { Button } from '../Button';
import { CircularProgressBar } from '../CircularProgressBar';
import { useAccountVerificationForm } from './AccountVerificationFormProvider';
import { AccountVerificationFormResumeInBackgroundModal } from './AccountVerificationFormResumeInBackgroundModal';

export function AccountVerificationFormStep3LoadingSteps() {
  // State for managing hiding/showing of the resume in background modal
  const [isResumeModalOpen, openResumeModal, closeResumeModal] = useTernaryState(false);
  
  const { basiqConnection, goForward } = useAccountVerificationForm();
  const { error, completed, stepNameInProgress, reset, setJobId } = basiqConnection;

  // State for managing loading progress
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const jobIdsParam = new URLSearchParams(window.location.search).get("jobIds");
    const jobIdParam = new URLSearchParams(window.location.search).get("jobId");
    
    const oldjobId = jobIdParam;
    const newJobId = jobIdsParam; // Use jobIds since it's intended to contain UUIDs

    if (oldjobId) {
      const uuidRegex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g;
      const uuids = oldjobId.match(uuidRegex);

      if (uuids && uuids.length > 0) {
        const firstUUID = uuids[0];
        setProgress(100);
        setJobId(firstUUID);
      } else {
        setProgress(100);
        setJobId(oldjobId);
      }
    } else {
      console.log("The oldjobId variable is null or undefined.");
    }

    if (newJobId) {
      const uuidRegex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g;
      const uuids = newJobId.match(uuidRegex);

      if (uuids && uuids.length > 0) {
        const firstUUID = uuids[0];
        setProgress(100);
        setJobId(firstUUID);
      } else {
        setProgress(100);
        setJobId(newJobId);
      }
    } else {
      console.log("The newJobId variable is null or undefined.");
    }
  }, [setJobId, setProgress]);

  return (
    <div className="flex flex-col space-y-10 sm:space-y-12">
      <div className="flex flex-col items-center text-center space-y-8">
        <CircularProgressBar value={progress} error={error} />

        {error ? (
          <div className="w-full space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{error?.response?.data.data[0].detail}</h2>
              <p className="text-sm sm:text-base text-neutral-muted-darker">{error?.message}</p>
            </div>
            <Button block onClick={reset}>
              Try again
            </Button>
          </div>
        ) : completed ? (
          <div className="w-full space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">Connected 🎉</h3>
              <p className="text-sm sm:text-base text-neutral-muted-darker">One last step to go...</p>
            </div>
            <Button block onClick={goForward}>
              Continue
            </Button>
          </div>
        ) : (
          <div className="w-full space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{STEP_NAME_MAP[stepNameInProgress]}</h2>
            </div>
            <Button block variant="subtle" onClick={openResumeModal}>
              Resume in background
            </Button>
          </div>
        )}
      </div>
      <AccountVerificationFormResumeInBackgroundModal isOpen={isResumeModalOpen} onClose={closeResumeModal} />
    </div>
  );
}

const STEP_NAME_MAP = {
  'verify-credentials': 'Verifying credentials...',
  'retrieve-accounts': 'Retrieving accounts...',
};