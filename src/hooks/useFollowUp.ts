import { useState, useCallback } from 'react';

interface FollowUp {
  emailId: string;
  date: Date;
  completed: boolean;
}

export const useFollowUp = () => {
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);

  const addFollowUp = useCallback((emailId: string, date: Date) => {
    setFollowUps(prev => [...prev, { emailId, date, completed: false }]);
  }, []);

  const completeFollowUp = useCallback((emailId: string) => {
    setFollowUps(prev =>
      prev.map(followUp =>
        followUp.emailId === emailId
          ? { ...followUp, completed: true }
          : followUp
      )
    );
  }, []);

  const removeFollowUp = useCallback((emailId: string) => {
    setFollowUps(prev => prev.filter(followUp => followUp.emailId !== emailId));
  }, []);

  const getFollowUp = useCallback((emailId: string) => {
    return followUps.find(followUp => followUp.emailId === emailId);
  }, [followUps]);

  return {
    followUps,
    addFollowUp,
    completeFollowUp,
    removeFollowUp,
    getFollowUp,
  };
};

export default useFollowUp;